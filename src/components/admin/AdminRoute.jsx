import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { adminService } from '../../services/AdminService';
import { roleService } from '../../services/RoleService';
import AdminLayout from './AdminLayout';

function AdminRoute({ children, requiredLevel = 1, requiredPermission = null }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [planId, setPlanId] = useState(null);
  const [planLoading, setPlanLoading] = useState(false);

  useEffect(() => {
    async function fetchPlan() {
      if (user) {
        setPlanLoading(true);
        try {
          const plan = await adminService.getUserPlan(user.id);
          setPlanId(plan);
        } finally {
          setPlanLoading(false);
        }
      }
    }
    fetchPlan();
  }, [user]);

  if (loading || planLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!['admin', 'super_admin'].includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!adminService.hasAccess(planId, requiredLevel)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredPermission && !roleService.hasPermission(user.role, requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  const level = adminService.getAccessLevel(planId);

  return (
    <AdminLayout level={level}>
      {children}
    </AdminLayout>
  );
}

export default AdminRoute;
