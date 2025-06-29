import { encryptionService } from './EncryptionService';

class RoleService {
  constructor() {
    this.roles = [
      {
        id: 'super_admin',
        name: 'Super Administrator',
        description: 'Complete system access and management',
        permissions: ['all'],
        color: 'purple',
        icon: 'shield'
      },
      {
        id: 'admin_specialist',
        name: 'Admin Staff - Specialist',
        description: 'Administrative staff for specialist practices',
        permissions: [
          'patient_management',
          'referral_management',
          'schedule_management',
          'insurance_verification',
          'document_management',
          'chat_system',
          'notification_management'
        ],
        color: 'blue',
        icon: 'user-check'
      },
      {
        id: 'admin_dentist',
        name: 'Admin Staff - Referring Dentist',
        description: 'Administrative staff for referring dentist practices',
        permissions: [
          'patient_management',
          'referral_creation',
          'referral_tracking',
          'schedule_management',
          'insurance_verification',
          'document_management',
          'chat_system'
        ],
        color: 'green',
        icon: 'user-plus'
      },
      {
        id: 'general_dentist',
        name: 'General Dentist',
        description: 'Licensed dentist with referral creation abilities',
        permissions: [
          'patient_management',
          'referral_creation',
          'referral_tracking',
          'clinical_notes',
          'treatment_planning',
          'document_management',
          'chat_system'
        ],
        color: 'indigo',
        icon: 'activity'
      },
      {
        id: 'dental_specialist',
        name: 'Dental Specialist',
        description: 'Licensed specialist receiving and managing referrals',
        permissions: [
          'patient_management',
          'referral_management',
          'referral_acceptance',
          'clinical_notes',
          'treatment_planning',
          'schedule_management',
          'document_management',
          'chat_system',
          'analytics'
        ],
        color: 'purple',
        icon: 'star'
      },
      {
        id: 'insurance_coordinator',
        name: 'Insurance Coordinator',
        description: 'Specialized insurance verification and coordination',
        permissions: [
          'insurance_verification',
          'insurance_management',
          'patient_insurance',
          'billing_support',
          'document_management',
          'chat_system'
        ],
        color: 'yellow',
        icon: 'credit-card'
      },
      {
        id: 'practice_staff',
        name: 'Practice Staff',
        description: 'General staff with limited access',
        permissions: [
          'schedule_view',
          'patient_view',
          'basic_referral_view',
          'chat_system'
        ],
        color: 'gray',
        icon: 'users'
      }
    ];

    this.permissions = {
      'all': 'Complete system access',
      'patient_management': 'Create, view, edit, and manage patients',
      'referral_creation': 'Create new referrals',
      'referral_management': 'Manage incoming referrals',
      'referral_tracking': 'Track referral status and progress',
      'referral_acceptance': 'Accept or decline referrals',
      'clinical_notes': 'Create and manage clinical notes',
      'treatment_planning': 'Create and manage treatment plans',
      'schedule_management': 'Manage appointments and scheduling',
      'schedule_view': 'View schedules (read-only)',
      'insurance_verification': 'Verify insurance coverage',
      'insurance_management': 'Manage insurance claims and coordination',
      'patient_insurance': 'View and edit patient insurance information',
      'billing_support': 'Support billing and payment processes',
      'document_management': 'Upload, view, and manage documents',
      'chat_system': 'Send and receive messages',
      'notification_management': 'Manage system notifications',
      'analytics': 'View analytics and reports',
      'user_management': 'Manage users and permissions',
      'system_settings': 'Configure system settings'
    };
  }

  async getAllRoles() {
    await this.simulateDelay(300);
    return this.roles;
  }

  async getRoleById(roleId) {
    await this.simulateDelay(200);
    return this.roles.find(role => role.id === roleId);
  }

  async createRole(roleData) {
    await this.simulateDelay(800);
    
    const newRole = {
      id: `custom_${Date.now()}`,
      ...roleData,
      createdAt: new Date(),
      isCustom: true
    };

    this.roles.push(newRole);
    await this.logAuditEvent('role_created', newRole.id);
    
    return newRole;
  }

  async updateRole(roleId, updates) {
    await this.simulateDelay(600);
    
    const index = this.roles.findIndex(role => role.id === roleId);
    if (index !== -1) {
      this.roles[index] = { ...this.roles[index], ...updates, updatedAt: new Date() };
      await this.logAuditEvent('role_updated', roleId);
      return this.roles[index];
    }
    throw new Error('Role not found');
  }

  async deleteRole(roleId) {
    await this.simulateDelay(400);
    
    // Prevent deletion of system roles
    const systemRoles = ['super_admin', 'admin_specialist', 'admin_dentist', 'general_dentist', 'dental_specialist'];
    if (systemRoles.includes(roleId)) {
      throw new Error('Cannot delete system roles');
    }

    const index = this.roles.findIndex(role => role.id === roleId);
    if (index !== -1) {
      this.roles.splice(index, 1);
      await this.logAuditEvent('role_deleted', roleId);
      return true;
    }
    throw new Error('Role not found');
  }

  async getAllPermissions() {
    await this.simulateDelay(200);
    return this.permissions;
  }

  hasPermission(userRole, requiredPermission) {
    const role = this.roles.find(r => r.id === userRole);
    if (!role) return false;
    
    return role.permissions.includes('all') || role.permissions.includes(requiredPermission);
  }

  getRolePermissions(roleId) {
    const role = this.roles.find(r => r.id === roleId);
    return role ? role.permissions : [];
  }

  async logAuditEvent(action, roleId, metadata = {}) {
    const auditLog = {
      timestamp: new Date(),
      action,
      roleId,
      userId: 'current-user-id',
      metadata
    };
    
    console.log('Role Audit Log:', auditLog);
    return auditLog;
  }

  simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const roleService = new RoleService();