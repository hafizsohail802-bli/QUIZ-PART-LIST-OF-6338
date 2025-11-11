
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinner from './ui/Spinner';

const AdminRoute: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
