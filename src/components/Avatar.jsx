import { FaUser } from 'react-icons/fa';

const Avatar = ({ 
  user, 
  size = 'md', 
  className = '', 
  showFallback = true 
}) => {
  // Size configurations
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8', 
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
    '3xl': 'w-24 h-24'
  };

  const iconSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg', 
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const iconSize = iconSizes[size] || iconSizes.md;

  // Check if user has profile picture
  const hasProfilePicture = user?.profile_picture;

  if (hasProfilePicture) {
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden border-2 border-primary-200 shadow-sm ${className}`}>
        <img
          src={user.profile_picture}
          alt={`${user.nama || 'User'} profile`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient avatar if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback gradient avatar (hidden by default) */}
        <div 
          className="w-full h-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center"
          style={{ display: 'none' }}
        >
          <FaUser className={`text-white ${iconSize}`} />
        </div>
      </div>
    );
  }

  // Fallback to gradient avatar
  if (showFallback) {
    return (
      <div className={`${sizeClass} rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center border-2 border-primary-200 shadow-sm ${className}`}>
        <FaUser className={`text-white ${iconSize}`} />
      </div>
    );
  }

  return null;
};

export default Avatar;
