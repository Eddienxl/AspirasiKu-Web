import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import { dummyUsers } from '../data/dummy';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const token = getToken();

  useEffect(() => {
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const currentUser = dummyUsers["user1"]; // Simulasi user yang login
    if (requiredRole) {
      setIsAuthorized(currentUser?.peran === requiredRole);
    } else {
      setIsAuthorized(true);
    }
  }, [requiredRole, token]);

  if (isAuthorized === null) {
    return <div className="text-center p-4 animate-pulse">Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;