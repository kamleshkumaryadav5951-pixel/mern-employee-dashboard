/**
 * Format a date string into a readable format
 */
export const formatDate = (date, options = {}) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
};

/**
 * Get color classes for employee status badge
 */
export const getStatusColor = (status) => {
  const colors = {
    Active: 'bg-emerald-100 text-emerald-700',
    Inactive: 'bg-gray-100 text-gray-600',
    'On Leave': 'bg-amber-100 text-amber-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-600';
};

/**
 * Get color classes for task status badge
 */
export const getTaskStatusColor = (status) => {
  const colors = {
    Todo: 'bg-slate-100 text-slate-600',
    'In Progress': 'bg-amber-100 text-amber-700',
    Done: 'bg-emerald-100 text-emerald-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-600';
};

/**
 * Get color classes for task priority badge
 */
export const getPriorityColor = (priority) => {
  const colors = {
    Low: 'bg-blue-100 text-blue-600',
    Medium: 'bg-yellow-100 text-yellow-700',
    High: 'bg-red-100 text-red-600',
  };
  return colors[priority] || 'bg-gray-100 text-gray-600';
};

/**
 * Get dot color for priority indicator
 */
export const getPriorityDot = (priority) => {
  const colors = {
    Low: 'bg-blue-400',
    Medium: 'bg-yellow-400',
    High: 'bg-red-400',
  };
  return colors[priority] || 'bg-gray-400';
};

/**
 * Get initials from a full name
 */
export const getInitials = (name = '') => {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || '')
    .join('');
};

/**
 * Generate a consistent avatar background color from a name
 */
export const getAvatarColor = (name = '') => {
  const colors = [
    'bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-orange-500',
    'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-rose-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

/**
 * Truncate long text with ellipsis
 */
export const truncate = (str = '', max = 60) => {
  return str.length > max ? str.slice(0, max) + '...' : str;
};

/**
 * Check if a due date is overdue
 */
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

/**
 * Format currency (INR)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
