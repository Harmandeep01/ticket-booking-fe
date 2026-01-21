import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect them to the login page if not logged in
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;