import { readFile } from 'fs/promises';
import path from 'path';

const permissionsPath = path.join(process.cwd(), 'server', 'planPermissions.json');
let permissionsCache = null;
async function loadPermissions() {
  if (!permissionsCache) {
    const data = await readFile(permissionsPath, 'utf-8');
    permissionsCache = JSON.parse(data);
  }
  return permissionsCache;
}

export function clearPermissionCache() {
  permissionsCache = null;
}

export function checkAdminAccess(requiredLevel = 1) {
  return async function(req, res, next) {
    const perms = await loadPermissions();
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!['admin', 'super_admin'].includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const level = perms.levels[user.planId] || 0;
    if (level < requiredLevel) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}
