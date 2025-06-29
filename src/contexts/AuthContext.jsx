import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Check for Super Admin credentials
      if (email === 'wgray@stloralsurgery.com' && password === 'Password12345!') {
        const superAdminUser = {
          id: 'super-admin-001',
          email: 'wgray@stloralsurgery.com',
          name: 'William Gray',
          role: 'super_admin',
          permissions: ['all'],
          practice: 'St. Louis Oral Surgery',
          avatar: null,
          lastLogin: new Date().toISOString(),
          preferences: {
            theme: 'light',
            notifications: true
          }
        };

        const token = authService.generateToken(superAdminUser);
        
        // Store auth data
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(superAdminUser));
        
        setUser(superAdminUser);
        setIsAuthenticated(true);
        
        return { success: true, user: superAdminUser, token };
      }

      // Regular authentication flow
      const result = await authService.login(email, password);
      
      if (result.success) {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('userData', JSON.stringify(result.user));
        
        setUser(result.user);
        setIsAuthenticated(true);
      }
      
      return result;
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API call result
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      return await authService.forgotPassword(email);
    } catch (error) {
      console.error('Forgot password failed:', error);
      return { 
        success: false, 
        error: error.message || 'Password reset failed. Please try again.' 
      };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      return await authService.resetPassword(token, newPassword);
    } catch (error) {
      console.error('Password reset failed:', error);
      return { 
        success: false, 
        error: error.message || 'Password reset failed. Please try again.' 
      };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const result = await authService.updateProfile(profileData);
      if (result.success) {
        const updatedUser = { ...user, ...result.user };
        setUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
      }
      return result;
    } catch (error) {
      console.error('Profile update failed:', error);
      return { 
        success: false, 
        error: error.message || 'Profile update failed. Please try again.' 
      };
    }
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes('all') || user.permissions.includes(permission);
  };

  const hasRole = (role) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    hasPermission,
    hasRole,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;