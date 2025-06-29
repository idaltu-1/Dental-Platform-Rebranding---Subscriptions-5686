# Admin Access Matrix

| Plan | Key Permissions |
| --- | --- |
| Trial | Same as Starter for 14 days |
| Starter | View/Edit users, reset passwords, view patients |
| Professional | All Starter plus delete/export patients, view subscription data |
| Enterprise | Full management plus super admin dashboard and billing controls |
| Celestial | All Enterprise features and future premium modules |

## Implementation Checklist
- Map Stripe `price_id` values to permission sets in `server/planPermissions.json`.
- `checkAdminAccess` middleware verifies role and active subscription before `/admin/*` routes.
- `AdminLayout` injects a red theme and special favicon for admin pages.
- `stripeWebhook.js` listens for subscription events to refresh permissions.
- Audit logs are written with `logAction` and retained for 24 months.
