const Spinner = ({ size = 'md', color = 'primary' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const colors = {
    primary: 'border-primary-600',
    white: 'border-white',
    gray: 'border-gray-400',
  };

  return (
    <div
      className={`${sizes[size]} ${colors[color]} border-t-transparent rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );
};

export const PageSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-3">
      <Spinner size="lg" />
      <p className="text-gray-500 text-sm font-medium">Loading...</p>
    </div>
  </div>
);

export default Spinner;
