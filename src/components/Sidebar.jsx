import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaPlus, FaBell, FaUser, FaBars, FaTimes, FaSignOutAlt, FaCog } from 'react-icons/fa';
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

  // Base menu items for all users
  const baseMenuItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/create-post', icon: FaPlus, label: 'Ajukan' },
    { path: '/notifications', icon: FaBell, label: 'Notifikasi' },
    { path: '/profile', icon: FaUser, label: 'Profil' }
  ];

  // Add admin panel for peninjau
  const menuItems = user?.peran === 'peninjau'
    ? [...baseMenuItems, { path: '/admin', icon: FaCog, label: 'Panel Admin' }]
    : baseMenuItems;

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
            <div className="w-16 h-16 flex items-center justify-center">
              <img
                src="/aspirasikulogo.png"
                alt="AspirasiKu Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg hidden">
                <span className="text-green-600 font-bold text-lg">A</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white">AspirasiKu</h2>
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

        {/* Bottom Section - Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-50 to-transparent">
          {/* User Profile Section */}
          {user && (
            <div className="p-4 pb-2">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex-shrink-0">
                  <Avatar user={user} size="md" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user.nama}</p>
                    {user.peran === 'peninjau' && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 shadow-sm">
                        <span className="mr-1">🛡️</span>
                        <span>Peninjau</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">
                    Bergabung {new Date(user.dibuat_pada).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Logout Section */}
          <div className="p-4 pt-2 border-t border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 group border border-red-200 hover:border-red-300 hover:shadow-md transform hover:scale-[1.02]"
            >
              <FaSignOutAlt className="mr-3 w-5 h-5 group-hover:animate-pulse" />
              <span className="font-semibold">Logout</span>
            </button>
            <p className="text-xs text-gray-500 text-center mt-3 font-medium">© 2025 AspirasiKu Platform</p>
          </div>
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
