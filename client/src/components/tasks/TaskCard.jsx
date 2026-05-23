import { RiEditLine, RiDeleteBinLine, RiCalendarLine, RiUser3Line } from 'react-icons/ri';
import { getPriorityColor, getPriorityDot, formatDate, isOverdue } from '../../utils/helpers';
import Avatar from '../common/Avatar';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const overdue = isOverdue(task.dueDate) && task.status !== 'Done';

  return (
    <div className="kanban-card group animate-fade-in">
      {/* Priority + Actions */}
      <div className="flex items-start justify-between mb-3">
        <span className={`badge text-xs ${getPriorityColor(task.priority)}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${getPriorityDot(task.priority)}`} />
          {task.priority}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1 rounded text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
            title="Edit task"
          >
            <RiEditLine size={14} />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Delete task"
          >
            <RiDeleteBinLine size={14} />
          </button>
        </div>
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2">
        {task.title}
      </p>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        {task.assignedTo ? (
          <div className="flex items-center gap-1.5">
            <Avatar name={task.assignedTo.name} size="xs" />
            <span className="text-xs text-gray-500 truncate max-w-[100px]">
              {task.assignedTo.name.split(' ')[0]}
            </span>
          </div>
        ) : (
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <RiUser3Line size={12} />
            Unassigned
          </span>
        )}

        {task.dueDate && (
          <span className={`flex items-center gap-1 text-xs font-medium
            ${overdue ? 'text-red-500' : 'text-gray-400'}`}>
            <RiCalendarLine size={12} />
            {formatDate(task.dueDate, { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>

      {/* Quick status change */}
      <div className="mt-2 pt-2 border-t border-gray-50">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="w-full text-xs bg-gray-50 border-0 rounded-lg px-2 py-1 text-gray-600
                     focus:outline-none focus:ring-1 focus:ring-primary-300 cursor-pointer"
          title="Change status"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
