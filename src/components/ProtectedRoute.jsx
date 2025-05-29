import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/auth';
import { getCurrentUser } from '../services/api';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!token) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();

        if (requiredRole) {
          // Check localStorage for role (for admin login)
          const userRole = localStorage.getItem('userRole') || currentUser?.peran;
          const hasRole = userRole === requiredRole;
          setIsAuthorized(hasRole);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('Error getting current user:', error);
        // Remove invalid token
        removeToken();
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, [requiredRole, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;