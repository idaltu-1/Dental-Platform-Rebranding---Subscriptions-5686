import axios from 'axios';
import { encryptionService } from './EncryptionService';

class AuthService {
  constructor() {
    this.apiUrl = import.meta.env.VITE_REACT_APP_API_URL || 'https://api.refer.dental';
    this.mockUsers = this.initializeMockUsers();
  }

  initializeMockUsers() {
    return [
      {
        id: 'super-admin-001',
        email: 'wgray@stloralsurgery.com',
        password: 'Password12345!',
        name: 'William Gray',
        role: 'super_admin',
        permissions: ['all'],
        practice: 'St. Louis Oral Surgery',
        verified: true,
        active: true,
        lastLogin: new Date('2024-01-20T10:30:00'),
        createdAt: new Date('2023-01-01T00:00:00'),
        preferences: {
          theme: 'light',
          notifications: true,
          emailUpdates: true
        }
      },
      {
        id: 'admin-001',
        email: 'admin@refer.dental',
        password: 'Admin123!',
        name: 'Sarah Johnson',
        role: 'admin',
        permissions: ['user_management', 'practice_management', 'billing', 'analytics'],
        practice: 'Dental Excellence Group',
        verified: true,
        active: true,
        lastLogin: new Date('2024-01-19T14:20:00'),
        createdAt: new Date('2023-02-15T00:00:00'),
        preferences: {
          theme: 'light',
          notifications: true,
          emailUpdates: false
        }
      },
      {
        id: 'doctor-001',
        email: 'dr.smith@dentalcare.com',
        password: 'Doctor123!',
        name: 'Dr. Michael Smith',
        role: 'doctor',
        permissions: ['patient_management', 'clinical_notes', 'referrals'],
        practice: 'Smith Dental Care',
        specialty: 'General Dentistry',
        licenseNumber: 'DDS-12345',
        verified: true,
        active: true,
        lastLogin: new Date('2024-01-21T09:15:00'),
        createdAt: new Date('2023-03-10T00:00:00'),
        preferences: {
          theme: 'dark',
          notifications: true,
          emailUpdates: true
        }
      },
      {
        id: 'specialist-001',
        email: 'dr.wilson@endospecialist.com',
        password: 'Specialist123!',
        name: 'Dr. Emily Wilson',
        role: 'specialist',
        permissions: ['patient_management', 'clinical_notes', 'referrals', 'treatment_planning'],
        practice: 'Advanced Endodontics',
        specialty: 'Endodontics',
        licenseNumber: 'ENDO-67890',
        verified: true,
        active: true,
        lastLogin: new Date('2024-01-20T16:45:00'),
        createdAt: new Date('2023-04-05T00:00:00'),
        preferences: {
          theme: 'light',
          notifications: false,
          emailUpdates: true
        }
      }
    ];
  }

  async login(email, password) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user in mock data
      const user = this.mockUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      if (!user.active) {
        throw new Error('Account has been deactivated. Please contact support.');
      }

      if (!user.verified) {
        throw new Error('Please verify your email address before logging in.');
      }

      // Generate JWT token
      const token = this.generateToken(user);

      // Update last login
      user.lastLogin = new Date();

      // Return sanitized user data (no password)
      const { password: _, ...sanitizedUser } = user;

      // Log audit event
      await this.logAuditEvent('user_login', user.id, {
        ipAddress: '192.168.1.1', // In real app, get from request
        userAgent: navigator.userAgent,
        success: true
      });

      return {
        success: true,
        user: sanitizedUser,
        token
      };
    } catch (error) {
      // Log failed login attempt
      await this.logAuditEvent('login_failed', null, {
        email,
        error: error.message,
        ipAddress: '192.168.1.1',
        userAgent: navigator.userAgent
      });

      throw error;
    }
  }

  async logout() {
    try {
      // In real app, invalidate token on server
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        await this.logAuditEvent('user_logout', user.id);
      }

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  }

  async forgotPassword(email) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if user exists
      const user = this.mockUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        // Don't reveal if user exists for security
        // But still return success to prevent email enumeration
        console.log('Password reset requested for non-existent email:', email);
      } else {
        // Log password reset request
        await this.logAuditEvent('password_reset_requested', user.id, {
          email,
          ipAddress: '192.168.1.1',
          userAgent: navigator.userAgent
        });
      }

      // Always return success for security
      return {
        success: true,
        message: 'If an account with that email exists, we\'ve sent a password reset link.'
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new Error('Password reset failed. Please try again.');
    }
  }

  async resetPassword(token, newPassword) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In real app, validate token and update password
      // For demo, just return success
      return {
        success: true,
        message: 'Password has been reset successfully.'
      };
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Password reset failed. Please try again.');
    }
  }

  async updateProfile(profileData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const userData = localStorage.getItem('userData');
      if (!userData) {
        throw new Error('User not authenticated');
      }

      const user = JSON.parse(userData);
      const updatedUser = { ...user, ...profileData, updatedAt: new Date() };

      // Update in mock data
      const userIndex = this.mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        this.mockUsers[userIndex] = updatedUser;
      }

      // Log profile update
      await this.logAuditEvent('profile_updated', user.id, {
        updatedFields: Object.keys(profileData)
      });

      return {
        success: true,
        user: updatedUser,
        message: 'Profile updated successfully.'
      };
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }

  async register(userData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Check if user already exists
      const existingUser = this.mockUsers.find(u => 
        u.email.toLowerCase() === userData.email.toLowerCase()
      );

      if (existingUser) {
        throw new Error('An account with this email already exists');
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        ...userData,
        verified: false,
        active: true,
        createdAt: new Date(),
        lastLogin: null,
        permissions: this.getDefaultPermissions(userData.role),
        preferences: {
          theme: 'light',
          notifications: true,
          emailUpdates: true
        }
      };

      this.mockUsers.push(newUser);

      // Generate verification token
      const verificationToken = this.generateToken(newUser, '24h');

      // Log registration
      await this.logAuditEvent('user_registered', newUser.id, {
        email: userData.email,
        role: userData.role
      });

      return {
        success: true,
        user: newUser,
        verificationToken,
        message: 'Account created successfully. Please check your email to verify your account.'
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async verifyEmail(token) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In real app, decode and validate token
      // For demo, just return success
      return {
        success: true,
        message: 'Email verified successfully.'
      };
    } catch (error) {
      console.error('Email verification error:', error);
      throw new Error('Email verification failed.');
    }
  }

  generateToken(user, expiresIn = '24h') {
    // In real app, use proper JWT library
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000)
    };

    // For demo, just return base64 encoded payload
    return btoa(JSON.stringify(payload));
  }

  getDefaultPermissions(role) {
    const permissionSets = {
      super_admin: ['all'],
      admin: ['user_management', 'practice_management', 'billing', 'analytics'],
      doctor: ['patient_management', 'clinical_notes', 'referrals'],
      specialist: ['patient_management', 'clinical_notes', 'referrals', 'treatment_planning'],
      staff: ['patient_management', 'appointments'],
      patient: ['view_own_records']
    };

    return permissionSets[role] || ['basic'];
  }

  async logAuditEvent(action, userId, metadata = {}) {
    try {
      const auditLog = {
        timestamp: new Date().toISOString(),
        action,
        userId,
        metadata,
        sessionId: this.getSessionId()
      };

      console.log('Audit Log:', auditLog);
      // In real app, send to audit service

      return auditLog;
    } catch (error) {
      console.error('Failed to log audit event:', error);
    }
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  // Utility methods
  isTokenValid(token) {
    try {
      const payload = JSON.parse(atob(token));
      const now = Math.floor(Date.now() / 1000);
      
      // Check if token is expired (24 hours)
      return (now - payload.iat) < (24 * 60 * 60);
    } catch {
      return false;
    }
  }

  async refreshToken() {
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        throw new Error('No user data found');
      }

      const user = JSON.parse(userData);
      const newToken = this.generateToken(user);

      localStorage.setItem('authToken', newToken);
      
      return {
        success: true,
        token: newToken
      };
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();