import { useState, useEffect, useCallback } from 'react';
import { RiAddLine, RiRefreshLine } from 'react-icons/ri';
import { taskService } from '../services/taskService';
import { employeeService } from '../services/employeeService';
import KanbanColumn from '../components/tasks/KanbanColumn';
import TaskForm from '../components/tasks/TaskForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import { PageSpinner } from '../components/common/Spinner';
import toast from 'react-hot-toast';

const STATUSES = ['Todo', 'In Progress', 'Done'];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [modalState, setModalState] = useState({ type: null, task: null, defaultStatus: 'Todo' });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [tasksRes, empsRes] = await Promise.all([
        taskService.getAll(),
        employeeService.getAll({ limit: 100 }),
      ]);
      setTasks(tasksRes.data);
      setEmployees(empsRes.data);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getTasksByStatus = (status) => tasks.filter((t) => t.status === status);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updated = await taskService.update(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? updated.data : t))
      );
      toast.success(`Task moved to ${newStatus}`);
    } catch {
      toast.error('Failed to update task status');
    }
  };

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (modalState.type === 'edit') {
        const res = await taskService.update(modalState.task._id, formData);
        setTasks((prev) => prev.map((t) => (t._id === modalState.task._id ? res.data : t)));
        toast.success('Task updated successfully');
      } else {
        const res = await taskService.create(formData);
        setTasks((prev) => [res.data, ...prev]);
        toast.success('Task created successfully');
      }
      setModalState({ type: null, task: null, defaultStatus: 'Todo' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    setFormLoading(true);
    try {
      await taskService.delete(modalState.task._id);
      setTasks((prev) => prev.filter((t) => t._id !== modalState.task._id));
      toast.success('Task deleted');
      setModalState({ type: null, task: null, defaultStatus: 'Todo' });
    } catch {
      toast.error('Failed to delete task');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Kanban Board</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {tasks.length} total task{tasks.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" icon={RiRefreshLine} onClick={fetchData} title="Refresh" />
          <Button
            icon={RiAddLine}
            onClick={() => setModalState({ type: 'add', task: null, defaultStatus: 'Todo' })}
          >
            New Task
          </Button>
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <span key={s} className="px-3 py-1.5 bg-white rounded-xl border border-gray-100
                                    text-sm font-medium text-gray-600 shadow-sm">
            {s}: <span className="font-bold text-gray-900">{getTasksByStatus(s).length}</span>
          </span>
        ))}
      </div>

      {/* Kanban Board */}
      {loading ? (
        <PageSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={getTasksByStatus(status)}
              onEdit={(task) => setModalState({ type: 'edit', task, defaultStatus: status })}
              onDelete={(task) => setModalState({ type: 'delete', task, defaultStatus: status })}
              onStatusChange={handleStatusChange}
              onAddTask={(s) => setModalState({ type: 'add', task: null, defaultStatus: s })}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Task Modal */}
      <Modal
        isOpen={modalState.type === 'add' || modalState.type === 'edit'}
        onClose={() => setModalState({ type: null, task: null, defaultStatus: 'Todo' })}
        title={modalState.type === 'edit' ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={modalState.task}
          employees={employees}
          defaultStatus={modalState.defaultStatus}
          onSubmit={handleSubmit}
          onCancel={() => setModalState({ type: null, task: null, defaultStatus: 'Todo' })}
          loading={formLoading}
        />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={modalState.type === 'delete'}
        onClose={() => setModalState({ type: null, task: null, defaultStatus: 'Todo' })}
        title="Delete Task"
        size="sm"
      >
        <div className="text-center py-2">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🗑️</span>
          </div>
          <p className="text-gray-700 font-medium mb-1">
            Delete "<span className="font-bold">{modalState.task?.title}</span>"?
          </p>
          <p className="text-gray-500 text-sm mb-6">
            This task will be permanently removed and cannot be recovered.
          </p>
          <div className="flex gap-3">
            <Button variant="danger" loading={formLoading} onClick={handleDelete} className="flex-1">
              Yes, Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setModalState({ type: null, task: null, defaultStatus: 'Todo' })}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;
