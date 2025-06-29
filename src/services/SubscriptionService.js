class SubscriptionService {
  constructor() {
    this.subscriptions = this.initializeMockData();
    this.plans = [
      {
        id: 'starter',
        name: 'Starter',
        displayName: 'Starter Plan',
        amount: 49,
        currency: 'usd',
        interval: 'month',
        features: [
          'Up to 100 patients',
          'Basic appointment scheduling',
          'Patient records management',
          'Email support',
          'Basic reporting'
        ],
        limits: {
          patients: 100,
          referrals: 50,
          storage: '1GB',
          users: 2
        },
        stripeProductId: 'prod_starter',
        stripePriceId: 'price_1RemJgEWGT02FQpC9UZ3PNXp'
      },
      {
        id: 'professional',
        name: 'professional',
        displayName: 'Professional Plan',
        amount: 99,
        currency: 'usd',
        interval: 'month',
        features: [
          'Unlimited patients',
          'Advanced scheduling',
          'Treatment planning',
          'Insurance management',
          'Advanced reporting',
          'SMS notifications',
          'Priority support'
        ],
        limits: {
          patients: -1, // unlimited
          referrals: -1,
          storage: '10GB',
          users: 10
        },
        stripeProductId: 'prod_professional',
        stripePriceId: 'price_1RemJgEWGT02FQpCn8yAw9DE'
      },
      {
        id: 'enterprise',
        name: 'enterprise',
        displayName: 'Enterprise Plan',
        amount: 499,
        currency: 'usd',
        interval: 'month',
        features: [
          'Multi-location support',
          'Custom integrations',
          'Advanced analytics',
          'Staff management',
          'API access',
          'White-label options',
          '24/7 phone support',
          'Dedicated account manager'
        ],
        limits: {
          patients: -1,
          referrals: -1,
          storage: '100GB',
          users: -1
        },
        stripeProductId: 'prod_enterprise',
        stripePriceId: 'price_1RemJgEWGT02FQpCJZSuLumG'
      },
      {
        id: 'celestial',
        name: 'celestial',
        displayName: 'Celestial Plan',
        amount: 999999,
        currency: 'usd',
        interval: 'year',
        features: [
          'Unlimited everything',
          'Priority 24/7 support',
          'Dedicated success manager',
          'Custom integrations'
        ],
        limits: {
          patients: -1,
          referrals: -1,
          storage: '1TB',
          users: -1
        },
        stripeProductId: 'prod_celestial',
        stripePriceId: 'price_celestial_year'
      }
    ];
  }

  initializeMockData() {
    return [
      {
        id: 'sub_001',
        userId: 'super-admin-001',
        planId: 'enterprise',
        status: 'active',
        currentPeriodStart: new Date('2024-01-01'),
        currentPeriodEnd: new Date('2024-02-01'),
        cancelAtPeriodEnd: false,
        trialEnd: null,
        amount: 499,
        currency: 'usd',
        interval: 'month',
        stripeSubscriptionId: 'sub_stripe_001',
        stripeCustomerId: 'cus_stripe_001',
        usage: {
          patients: 1247,
          referrals: 89,
          storage: '45GB',
          users: 8
        },
        billingHistory: [
          {
            id: 'inv_001',
            amount: 499,
            status: 'paid',
            date: new Date('2024-01-01'),
            invoiceUrl: 'https://invoice.stripe.com/001'
          },
          {
            id: 'inv_002',
            amount: 499,
            status: 'paid',
            date: new Date('2023-12-01'),
            invoiceUrl: 'https://invoice.stripe.com/002'
          }
        ],
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ];
  }

  async getSubscription(userId) {
    await this.simulateDelay(500);
    return this.subscriptions.find(sub => sub.userId === userId);
  }

  async getAllSubscriptions() {
    await this.simulateDelay(600);
    return this.subscriptions;
  }

  async getPlans() {
    await this.simulateDelay(300);
    return this.plans;
  }

  async getPlan(planId) {
    await this.simulateDelay(200);
    return this.plans.find(plan => plan.id === planId);
  }

  async createSubscription(userId, planId, paymentMethodId) {
    await this.simulateDelay(2000);
    
    const plan = await this.getPlan(planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    const newSubscription = {
      id: `sub_${Date.now()}`,
      userId,
      planId,
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      cancelAtPeriodEnd: false,
      trialEnd: null,
      amount: plan.amount,
      currency: plan.currency,
      interval: plan.interval,
      stripeSubscriptionId: `sub_stripe_${Date.now()}`,
      stripeCustomerId: `cus_stripe_${Date.now()}`,
      usage: {
        patients: 0,
        referrals: 0,
        storage: '0GB',
        users: 1
      },
      billingHistory: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.subscriptions.push(newSubscription);
    await this.logSubscriptionEvent('subscription_created', newSubscription.id);
    
    return newSubscription;
  }

  async updateSubscription(subscriptionId, planId) {
    await this.simulateDelay(1500);
    
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const newPlan = await this.getPlan(planId);
    if (!newPlan) {
      throw new Error('Plan not found');
    }

    subscription.planId = planId;
    subscription.amount = newPlan.amount;
    subscription.updatedAt = new Date();

    await this.logSubscriptionEvent('subscription_updated', subscriptionId);
    
    return subscription;
  }

  async cancelSubscription(subscriptionId, cancelAtPeriodEnd = true) {
    await this.simulateDelay(1000);
    
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    if (cancelAtPeriodEnd) {
      subscription.cancelAtPeriodEnd = true;
      subscription.status = 'active'; // Still active until period end
    } else {
      subscription.status = 'canceled';
      subscription.cancelAtPeriodEnd = false;
    }
    
    subscription.updatedAt = new Date();

    await this.logSubscriptionEvent('subscription_canceled', subscriptionId);
    
    return subscription;
  }

  async reactivateSubscription(subscriptionId) {
    await this.simulateDelay(1000);
    
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    subscription.status = 'active';
    subscription.cancelAtPeriodEnd = false;
    subscription.updatedAt = new Date();

    await this.logSubscriptionEvent('subscription_reactivated', subscriptionId);
    
    return subscription;
  }

  async getBillingHistory(subscriptionId) {
    await this.simulateDelay(400);
    
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    return subscription.billingHistory || [];
  }

  async getUsageMetrics(subscriptionId) {
    await this.simulateDelay(300);
    
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const plan = await this.getPlan(subscription.planId);
    
    return {
      current: subscription.usage,
      limits: plan.limits,
      percentages: {
        patients: plan.limits.patients === -1 ? 0 : (subscription.usage.patients / plan.limits.patients) * 100,
        referrals: plan.limits.referrals === -1 ? 0 : (subscription.usage.referrals / plan.limits.referrals) * 100,
        users: plan.limits.users === -1 ? 0 : (subscription.usage.users / plan.limits.users) * 100
      }
    };
  }

  async updateUsage(subscriptionId, usageType, increment = 1) {
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    if (subscription.usage[usageType] !== undefined) {
      subscription.usage[usageType] += increment;
      subscription.updatedAt = new Date();
    }

    return subscription.usage;
  }

  async checkLimits(subscriptionId, usageType, requestedAmount = 1) {
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const plan = await this.getPlan(subscription.planId);
    const limit = plan.limits[usageType];
    
    // -1 means unlimited
    if (limit === -1) {
      return { allowed: true, remaining: -1 };
    }

    const currentUsage = subscription.usage[usageType] || 0;
    const wouldExceed = (currentUsage + requestedAmount) > limit;
    
    return {
      allowed: !wouldExceed,
      remaining: Math.max(0, limit - currentUsage),
      limit,
      current: currentUsage
    };
  }

  async getSubscriptionAnalytics() {
    await this.simulateDelay(800);
    
    const totalSubscriptions = this.subscriptions.length;
    const activeSubscriptions = this.subscriptions.filter(sub => sub.status === 'active').length;
    const canceledSubscriptions = this.subscriptions.filter(sub => sub.status === 'canceled').length;
    const trialSubscriptions = this.subscriptions.filter(sub => sub.trialEnd && new Date(sub.trialEnd) > new Date()).length;
    
    const monthlyRevenue = this.subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((total, sub) => total + sub.amount, 0);

    const planDistribution = this.plans.map(plan => ({
      planId: plan.id,
      planName: plan.displayName,
      count: this.subscriptions.filter(sub => sub.planId === plan.id && sub.status === 'active').length,
      revenue: this.subscriptions
        .filter(sub => sub.planId === plan.id && sub.status === 'active')
        .reduce((total, sub) => total + sub.amount, 0)
    }));

    return {
      overview: {
        totalSubscriptions,
        activeSubscriptions,
        canceledSubscriptions,
        trialSubscriptions,
        monthlyRevenue,
        churnRate: totalSubscriptions > 0 ? (canceledSubscriptions / totalSubscriptions) * 100 : 0
      },
      planDistribution,
      recentActivity: this.getRecentSubscriptionActivity()
    };
  }

  getRecentSubscriptionActivity() {
    // Mock recent activity
    return [
      {
        type: 'subscription_created',
        subscriptionId: 'sub_001',
        userId: 'user_123',
        planName: 'Professional',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        type: 'subscription_updated',
        subscriptionId: 'sub_002',
        userId: 'user_456',
        planName: 'Enterprise',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
      }
    ];
  }

  async logSubscriptionEvent(event, subscriptionId, metadata = {}) {
    const logEntry = {
      timestamp: new Date(),
      event,
      subscriptionId,
      metadata
    };
    
    console.log('Subscription Event:', logEntry);
    return logEntry;
  }

  simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Helper methods for plan comparisons
  isPlanUpgrade(currentPlanId, newPlanId) {
    const planHierarchy = { starter: 1, professional: 2, enterprise: 3, celestial: 4 };
    return planHierarchy[newPlanId] > planHierarchy[currentPlanId];
  }

  isPlanDowngrade(currentPlanId, newPlanId) {
    const planHierarchy = { starter: 1, professional: 2, enterprise: 3, celestial: 4 };
    return planHierarchy[newPlanId] < planHierarchy[currentPlanId];
  }

  calculateProration(currentPlan, newPlan, daysRemaining) {
    const dailyCurrentCost = currentPlan.amount / 30;
    const dailyNewCost = newPlan.amount / 30;
    const currentCredit = dailyCurrentCost * daysRemaining;
    const newCharge = dailyNewCost * daysRemaining;
    
    return {
      credit: currentCredit,
      charge: newCharge,
      difference: newCharge - currentCredit
    };
  }
}

export const subscriptionService = new SubscriptionService();