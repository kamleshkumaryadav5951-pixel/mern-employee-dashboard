import { getInitials, getAvatarColor } from '../../utils/helpers';

const Avatar = ({ name = '', src = '', size = 'md', className = '' }) => {
  const sizes = {
    xs: 'w-7 h-7 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-white ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} ${getAvatarColor(name)} rounded-full flex items-center justify-center
                  font-semibold text-white ring-2 ring-white flex-shrink-0 ${className}`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
