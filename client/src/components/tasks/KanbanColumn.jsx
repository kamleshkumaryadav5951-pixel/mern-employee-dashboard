import { RiAddLine } from 'react-icons/ri';
import TaskCard from './TaskCard';

const COLUMN_CONFIG = {
  Todo: {
    label: 'Todo',
    headerClass: 'bg-slate-500',
    bgClass: 'bg-slate-50',
    dotClass: 'bg-slate-400',
    countClass: 'bg-slate-100 text-slate-600',
  },
  'In Progress': {
    label: 'In Progress',
    headerClass: 'bg-amber-500',
    bgClass: 'bg-amber-50/50',
    dotClass: 'bg-amber-400',
    countClass: 'bg-amber-100 text-amber-700',
  },
  Done: {
    label: 'Done',
    headerClass: 'bg-emerald-500',
    bgClass: 'bg-emerald-50/50',
    dotClass: 'bg-emerald-400',
    countClass: 'bg-emerald-100 text-emerald-700',
  },
};

const KanbanColumn = ({ status, tasks = [], onEdit, onDelete, onStatusChange, onAddTask }) => {
  const config = COLUMN_CONFIG[status];

  return (
    <div className={`flex flex-col rounded-2xl ${config.bgClass} border border-gray-100 overflow-hidden`}>
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${config.dotClass}`} />
          <h3 className="text-sm font-bold text-gray-800">{config.label}</h3>
          <span className={`${config.countClass} text-xs font-semibold px-2 py-0.5 rounded-full`}>
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="p-1 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          title={`Add task to ${status}`}
        >
          <RiAddLine size={18} />
        </button>
      </div>

      {/* Cards */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto min-h-[400px] max-h-[calc(100vh-280px)]">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-gray-300">
            <span className="text-3xl mb-2">
              {status === 'Todo' ? '📋' : status === 'In Progress' ? '⚡' : '✅'}
            </span>
            <p className="text-xs">No {status.toLowerCase()} tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
