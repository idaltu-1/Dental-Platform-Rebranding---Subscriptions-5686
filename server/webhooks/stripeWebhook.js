import express from 'express';
import { clearPermissionCache } from '../middleware/checkAdminAccess.js';
const router = express.Router();

router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const event = req.body; // In a real app, verify signature and parse JSON

  switch (event.type) {
    case 'invoice.paid':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      console.log('Received event', event.type);
      clearPermissionCache();
      break;
    default:
      console.log('Unhandled event', event.type);
  }

  res.status(200).json({ received: true });
});

export default router;
