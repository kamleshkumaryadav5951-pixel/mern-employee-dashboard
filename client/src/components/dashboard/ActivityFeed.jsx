import { RiCalendarLine } from 'react-icons/ri';
import Avatar from '../common/Avatar';
import { getTaskStatusColor, getPriorityDot, formatRelativeTime, truncate } from '../../utils/helpers';

const ActivityFeed = ({ tasks = [], employees = [] }) => {
  return (
    <div className="card p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-4">Recent Activity</h3>

      {/* Recent Tasks */}
      {tasks.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Latest Tasks
          </p>
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div key={task._id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getPriorityDot(task.priority)}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`badge text-xs ${getTaskStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    {task.assignedTo && (
                      <span className="text-xs text-gray-400 truncate">
                        → {task.assignedTo.name}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 flex items-center gap-1">
                  <RiCalendarLine size={12} />
                  {formatRelativeTime(task.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Employees */}
      {employees.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Recently Added
          </p>
          <div className="space-y-2.5">
            {employees.slice(0, 4).map((emp) => (
              <div key={emp._id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <Avatar name={emp.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{emp.name}</p>
                  <p className="text-xs text-gray-400 truncate">{emp.department} · {emp.role}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {formatRelativeTime(emp.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && employees.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm">
          No recent activity yet.
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
