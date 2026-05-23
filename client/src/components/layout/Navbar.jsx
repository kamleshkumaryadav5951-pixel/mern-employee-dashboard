import { useLocation } from 'react-router-dom';
import { RiBellLine, RiSearchLine, RiMenuLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';

const pageTitles = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back! Here\'s what\'s happening.' },
  '/employees': { title: 'Employee Management', subtitle: 'Manage your team members.' },
  '/tasks': { title: 'Task Management', subtitle: 'Track and manage all tasks.' },
};

const Navbar = ({ onMobileMenuToggle }) => {
  const { user } = useAuth();
  const location = useLocation();

  const currentPage = Object.entries(pageTitles).find(([path]) =>
    location.pathname.startsWith(path)
  );
  const { title = 'Dashboard', subtitle = '' } = currentPage?.[1] || {};

  const currentTime = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-4 flex-shrink-0">
      {/* Mobile menu button */}
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        aria-label="Open menu"
      >
        <RiMenuLine size={20} />
      </button>

      {/* Page Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>
        <p className="text-xs text-gray-400 hidden sm:block">{currentTime}</p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200
                        rounded-xl px-3 py-2 text-sm text-gray-400 w-48">
          <RiSearchLine size={15} />
          <span>Search...</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label="Notifications">
          <RiBellLine size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-100">
          <Avatar name={user?.name || 'Admin'} size="sm" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">{user?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
