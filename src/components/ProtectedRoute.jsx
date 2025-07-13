import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { subscriptionService } from '../services/SubscriptionService';

function ProtectedRoute({ children, requiredRole = null, requiredPermission = null, requiredPlan = null }) {
  const { user, isAuthenticated, loading } = useAuth();
  const [planId, setPlanId] = useState(null);
  const [planLoading, setPlanLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function fetchPlan() {
      if (requiredPlan && user) {
        setPlanLoading(true);
        try {
          const sub = await subscriptionService.getSubscription(user.id);
          setPlanId(sub?.planId || null);
        } finally {
          setPlanLoading(false);
        }
      }
    }
    fetchPlan();
  }, [requiredPlan, user]);

  // Show loading spinner while checking authentication
  if (loading || planLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole) {
    if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
      }
    } else if (user.role !== requiredRole && user.role !== 'super_admin') {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check permission-based access
  if (requiredPermission) {
    const hasPermission = user.permissions?.includes('all') ||
                         user.permissions?.includes(requiredPermission);

    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check subscription plan level
  if (requiredPlan) {
    const userLevel = subscriptionService.getPlanLevel(planId);
    const requiredLevel = subscriptionService.getPlanLevel(requiredPlan);
    if (userLevel < requiredLevel) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
