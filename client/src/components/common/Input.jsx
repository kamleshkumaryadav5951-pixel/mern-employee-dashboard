import { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, icon: Icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="form-label" htmlFor={props.id}>
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Icon size={16} />
            </div>
          )}
          <input
            ref={ref}
            className={`form-input ${Icon ? 'pl-10' : ''} ${
              error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
