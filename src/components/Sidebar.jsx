import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaPlus, FaBell, FaUser, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import Avatar from './Avatar';

const Sidebar = ({ isOpen: propIsOpen, setIsOpen: propSetIsOpen, isMobile: propIsMobile }) => {
  const location = useLocation();

  // Use internal state if props not provided (for backward compatibility)
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [internalIsMobile, setInternalIsMobile] = useState(false);
  const [user, setUser] = useState(null);

  // Load user data
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
  }, []);

  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
  const setIsOpen = propSetIsOpen || setInternalIsOpen;
  const isMobile = propIsMobile !== undefined ? propIsMobile : internalIsMobile;

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/create-post', icon: FaPlus, label: 'Ajukan' },
    { path: '/notifications', icon: FaBell, label: 'Notifikasi' },
    { path: '/profile', icon: FaUser, label: 'Profil' }
  ];

  // Auto-detect mobile if not provided via props
  useEffect(() => {
    if (propIsMobile === undefined) {
      const checkScreenSize = () => {
        const mobile = window.innerWidth < 1024;
        setInternalIsMobile(mobile);
        setInternalIsOpen(!mobile); // Open on desktop, closed on mobile
      };

      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, [propIsMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button - Only show on mobile */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 z-50 p-3 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-xl shadow-lg hover:from-primary-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 lg:hidden ${
          isOpen ? 'left-72' : 'left-4'
        }`}
      >
        {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-white to-green-50 shadow-lg transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 lg:w-72`}>

        {/* Header */}
        <div className="p-6 border-b border-green-200 bg-gradient-to-r from-green-600 to-green-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">A</span>
            </div>
            <h2 className="text-xl font-bold text-white">AspirasiKu</h2>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobile && setIsOpen(false)}
                className={`flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md'
                    : 'text-gray-700 hover:bg-green-100 hover:text-green-700'
                }`}
              >
                <Icon className={`mr-3 w-5 h-5 ${isActive ? 'text-white' : 'text-green-600 group-hover:text-green-700'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        {user && (
          <div className="absolute bottom-20 left-0 right-0 p-4">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-primary-200">
              <Avatar user={user} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{user.nama}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Logout Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-primary-50 to-emerald-50 border-t border-primary-200">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="w-full flex items-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
          >
            <FaSignOutAlt className="mr-3 w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">© 2025 AspirasiKu</p>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
