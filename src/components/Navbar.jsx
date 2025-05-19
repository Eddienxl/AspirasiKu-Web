import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getToken, removeToken } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = getToken();

  const handleLogout = () => {
    removeToken();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-primary to-blue-900 text-accent p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
          <img src="/logo.png" alt="UIN Logo" className="h-10 rounded-full border-2 border-accent" />
          <span className="text-2xl font-bold tracking-tight">AspirasiKu</span>
        </Link>
        <div className="flex space-x-6">
          {[
            { to: "/", label: "Home" },
            { to: "/dashboard", label: "Dashboard" },
            ...(isLoggedIn
              ? [
                  { to: "/ajukan", label: "Ajukan" },
                  { to: "/profil/me", label: "Profil" },
                  { to: "/notifikasi", label: "Notifikasi" },
                  { to: "/admin", label: "Admin" },
                ]
              : [
                  { to: "/login", label: "Login" },
                  { to: "/register", label: "Register" },
                ]),
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="text-lg font-medium hover:text-white transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-lg font-medium hover:text-white transition-colors duration-300 relative group"
            >
              Logout
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;