import { useState, useEffect } from 'react';
import { RiTaskLine } from 'react-icons/ri';
import Input from '../common/Input';
import Button from '../common/Button';

const STATUSES = ['Todo', 'In Progress', 'Done'];
const PRIORITIES = ['Low', 'Medium', 'High'];

const initialForm = {
  title: '', description: '', status: 'Todo', priority: 'Medium',
  assignedTo: '', dueDate: '',
};

const TaskForm = ({ task, employees = [], defaultStatus, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'Todo',
        priority: task.priority || 'Medium',
        assignedTo: task.assignedTo?._id || task.assignedTo || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      });
    } else {
      setForm({ ...initialForm, status: defaultStatus || 'Todo' });
    }
    setErrors({});
  }, [task, defaultStatus]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Task title is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit({
      ...form,
      assignedTo: form.assignedTo || null,
      dueDate: form.dueDate || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="task-title"
        label="Task Title *"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="e.g. Redesign landing page"
        icon={RiTaskLine}
        error={errors.title}
      />

      <div>
        <label htmlFor="task-desc" className="form-label">Description</label>
        <textarea
          id="task-desc"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Add task details..."
          className="form-input resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="task-status" className="form-label">Status</label>
          <select id="task-status" name="status" value={form.status} onChange={handleChange} className="form-input">
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="task-priority" className="form-label">Priority</label>
          <select id="task-priority" name="priority" value={form.priority} onChange={handleChange} className="form-input">
            {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="task-assignee" className="form-label">Assign To</label>
          <select id="task-assignee" name="assignedTo" value={form.assignedTo} onChange={handleChange} className="form-input">
            <option value="">— Unassigned —</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>{emp.name} ({emp.department})</option>
            ))}
          </select>
        </div>
        <div>
          <Input
            id="task-due"
            label="Due Date"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={loading} className="flex-1">
          {task ? 'Update Task' : 'Create Task'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
