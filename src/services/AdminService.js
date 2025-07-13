import { subscriptionService } from './SubscriptionService';
import { roleService } from './RoleService';

const accessLevels = {
  trial: 0,
  starter: 0,
  professional: 1,
  enterprise: 2,
  celestial: 3
};

class AdminService {
  getAccessLevel(planId) {
    return accessLevels[planId] ?? 0;
  }

  async getUserPlan(userId) {
    const sub = await subscriptionService.getSubscription(userId);
    return sub?.planId || 'starter';
  }

  hasAccess(planId, level) {
    return this.getAccessLevel(planId) >= level;
  }

  hasPermission(roleId, permission) {
    return roleService.hasPermission(roleId, permission);
  }

  getLevelLabel(level) {
    if (level >= 3) return 'Supreme Admin';
    if (level === 2) return 'Advanced Admin';
    if (level === 1) return 'Basic Admin';
    return 'No Admin Access';
  }
}

export const adminService = new AdminService();
