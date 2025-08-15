// src/components/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext'; // Use the context

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(BookingContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Wait for the user state to be determined
  }

  // If loading is done and there is no user, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a user is logged in, show the protected content
  return children;
};

export default ProtectedRoute;