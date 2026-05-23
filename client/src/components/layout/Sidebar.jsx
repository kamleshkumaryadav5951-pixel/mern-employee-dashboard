import { NavLink, useLocation } from 'react-router-dom';
import {
  RiDashboardLine,
  RiTeamLine,
  RiTaskLine,
  RiLogoutBoxLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiBarChartBoxLine,
} from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: RiDashboardLine },
  { path: '/employees', label: 'Employees', icon: RiTeamLine },
  { path: '/tasks', label: 'Tasks', icon: RiTaskLine },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <aside
      className={`flex flex-col h-full bg-sidebar text-white transition-all duration-300 ease-in-out
                  ${collapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Logo & Toggle */}
      <div className={`flex items-center h-16 border-b border-sidebar-border px-4
                       ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2.5 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center flex-shrink-0">
              <RiBarChartBoxLine size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">EmpDash</p>
              <p className="text-sidebar-text text-xs">Management Suite</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-sidebar-text hover:text-white hover:bg-sidebar-light transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <RiMenuUnfoldLine size={20} /> : <RiMenuFoldLine size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-sidebar-text text-xs font-semibold uppercase tracking-wider px-3 mb-3">
            Main Menu
          </p>
        )}
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname.startsWith(path);
          return (
            <NavLink
              key={path}
              to={path}
              className={`sidebar-link ${collapsed ? 'collapsed' : ''} ${isActive ? 'active' : ''}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-sidebar-light transition-colors">
            <Avatar name={user?.name || 'Admin'} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-sidebar-text text-xs truncate">{user?.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={`sidebar-link w-full text-red-400 hover:text-white hover:bg-red-500/20
                      ${collapsed ? 'collapsed justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <RiLogoutBoxLine size={20} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
