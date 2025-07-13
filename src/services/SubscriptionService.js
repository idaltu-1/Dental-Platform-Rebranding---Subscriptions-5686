class SubscriptionService {
  constructor() {
    this.subscriptions = this.initializeMockData();
    this.planHierarchy = { trial: 0, starter: 1, professional: 2, enterprise: 3, celestial: 4 };
    this.initializeCoupons();
    this.plans = [
      {
        id: 'trial',
        name: 'trial',
        displayName: 'Trial Plan',
        amount: 1,
        currency: 'usd',
        interval: 'month',
        features: [
          'Limited access',
          'Community support'
        ],
        limits: {
          patients: 10,
          referrals: 5,
          storage: '500MB',
          users: 1
        },
        stripeProductId: 'prod_trial',
        stripePriceId: 'price_trial_month'
      },
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

  getPlanLevel(planId) {
    return this.planHierarchy[planId] || 0;
  }

  // Helper methods for plan comparisons
  isPlanUpgrade(currentPlanId, newPlanId) {
    return this.getPlanLevel(newPlanId) > this.getPlanLevel(currentPlanId);
  }

  isPlanDowngrade(currentPlanId, newPlanId) {
    return this.getPlanLevel(newPlanId) < this.getPlanLevel(currentPlanId);
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

  // New discount and coupon system
  async createCoupon(code, discountType, discountValue, expiryDate, usageLimit = null) {
    await this.simulateDelay(500);
    
    const coupon = {
      id: `coupon_${Date.now()}`,
      code: code.toUpperCase(),
      discountType, // 'percentage' or 'fixed'
      discountValue,
      expiryDate,
      usageLimit,
      currentUsage: 0,
      active: true,
      createdAt: new Date()
    };
    
    if (!this.coupons) {
      this.coupons = [];
    }
    this.coupons.push(coupon);
    
    return coupon;
  }

  async validateCoupon(couponCode) {
    await this.simulateDelay(300);
    
    if (!this.coupons) {
      this.coupons = [];
    }
    
    const coupon = this.coupons.find(c => c.code === couponCode.toUpperCase());
    
    if (!coupon) {
      throw new Error('Invalid coupon code');
    }
    
    if (!coupon.active) {
      throw new Error('Coupon is no longer active');
    }
    
    if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
      throw new Error('Coupon has expired');
    }
    
    if (coupon.usageLimit && coupon.currentUsage >= coupon.usageLimit) {
      throw new Error('Coupon usage limit reached');
    }
    
    return coupon;
  }

  async applyCoupon(subscriptionId, couponCode) {
    await this.simulateDelay(800);
    
    const coupon = await this.validateCoupon(couponCode);
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    
    const plan = await this.getPlan(subscription.planId);
    let discountAmount = 0;
    
    if (coupon.discountType === 'percentage') {
      discountAmount = (plan.amount * coupon.discountValue) / 100;
    } else if (coupon.discountType === 'fixed') {
      discountAmount = Math.min(coupon.discountValue, plan.amount);
    }
    
    subscription.appliedCoupon = {
      id: coupon.id,
      code: coupon.code,
      discountAmount,
      appliedAt: new Date()
    };
    
    coupon.currentUsage++;
    
    return {
      originalAmount: plan.amount,
      discountAmount,
      finalAmount: plan.amount - discountAmount,
      coupon: coupon
    };
  }

  // Subscription pause/resume functionality
  async pauseSubscription(subscriptionId, reason = null) {
    await this.simulateDelay(1000);
    
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    
    if (subscription.status === 'paused') {
      throw new Error('Subscription is already paused');
    }
    
    subscription.status = 'paused';
    subscription.pausedAt = new Date();
    subscription.pauseReason = reason;
    subscription.updatedAt = new Date();
    
    await this.logSubscriptionEvent('subscription_paused', subscription.id, { reason });
    
    return subscription;
  }

  async resumeSubscription(subscriptionId) {
    await this.simulateDelay(1000);
    
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    
    if (subscription.status !== 'paused') {
      throw new Error('Subscription is not paused');
    }
    
    const pausedDuration = new Date() - new Date(subscription.pausedAt);
    const pausedDays = Math.floor(pausedDuration / (1000 * 60 * 60 * 24));
    
    // Extend the current period by the paused duration
    subscription.currentPeriodEnd = new Date(subscription.currentPeriodEnd.getTime() + pausedDuration);
    
    subscription.status = 'active';
    subscription.resumedAt = new Date();
    subscription.totalPausedDays = (subscription.totalPausedDays || 0) + pausedDays;
    subscription.updatedAt = new Date();
    
    delete subscription.pausedAt;
    delete subscription.pauseReason;
    
    await this.logSubscriptionEvent('subscription_resumed', subscription.id, { pausedDays });
    
    return subscription;
  }

  // Enhanced analytics
  async getSubscriptionInsights(subscriptionId) {
    await this.simulateDelay(800);
    
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    
    const plan = await this.getPlan(subscription.planId);
    const subscriptionAge = Math.floor((new Date() - new Date(subscription.createdAt)) / (1000 * 60 * 60 * 24));
    
    // Calculate usage trends
    const usageTrends = {
      patients: this.calculateUsageTrend(subscription, 'patients'),
      referrals: this.calculateUsageTrend(subscription, 'referrals'),
      storage: this.calculateUsageTrend(subscription, 'storage'),
      users: this.calculateUsageTrend(subscription, 'users')
    };
    
    // Calculate cost efficiency
    const totalSpent = subscription.billingHistory.reduce((total, invoice) => 
      invoice.status === 'paid' ? total + invoice.amount : total, 0
    );
    
    const valueMetrics = {
      totalSpent,
      costPerPatient: subscription.usage.patients > 0 ? totalSpent / subscription.usage.patients : 0,
      costPerReferral: subscription.usage.referrals > 0 ? totalSpent / subscription.usage.referrals : 0,
      subscriptionAge,
      averageMonthlySpend: subscriptionAge > 0 ? totalSpent / (subscriptionAge / 30) : 0
    };
    
    // Feature usage analytics
    const featureUsage = {
      mostUsedFeatures: this.getMostUsedFeatures(subscription),
      underutilizedFeatures: this.getUnderutilizedFeatures(subscription, plan),
      recommendedActions: this.getRecommendedActions(subscription, plan, usageTrends)
    };
    
    return {
      subscription,
      plan,
      usageTrends,
      valueMetrics,
      featureUsage,
      recommendations: this.generateRecommendations(subscription, plan, usageTrends, valueMetrics)
    };
  }

  calculateUsageTrend(subscription, metric) {
    // Mock implementation - in real app, this would analyze historical data
    const currentUsage = subscription.usage[metric];
    const mockHistoricalData = [
      currentUsage * 0.7,
      currentUsage * 0.8,
      currentUsage * 0.9,
      currentUsage
    ];
    
    const growth = mockHistoricalData.length > 1 ? 
      ((mockHistoricalData[mockHistoricalData.length - 1] - mockHistoricalData[0]) / mockHistoricalData[0]) * 100 : 0;
    
    return {
      current: currentUsage,
      historical: mockHistoricalData,
      growth: growth,
      trend: growth > 10 ? 'increasing' : growth < -10 ? 'decreasing' : 'stable'
    };
  }

  getMostUsedFeatures(subscription) {
    // Mock implementation
    return [
      { feature: 'Patient Management', usage: 85 },
      { feature: 'Appointment Scheduling', usage: 72 },
      { feature: 'Billing & Payments', usage: 65 },
      { feature: 'Clinical Notes', usage: 58 },
      { feature: 'Reporting', usage: 45 }
    ];
  }

  getUnderutilizedFeatures(subscription, plan) {
    // Mock implementation
    const allFeatures = plan.features;
    return [
      { feature: 'Advanced Analytics', usage: 15 },
      { feature: 'Custom Integrations', usage: 8 },
      { feature: 'API Access', usage: 5 }
    ];
  }

  getRecommendedActions(subscription, plan, usageTrends) {
    const recommendations = [];
    
    // Check for upgrade opportunities
    if (usageTrends.patients.trend === 'increasing' && 
        subscription.usage.patients > plan.limits.patients * 0.8) {
      recommendations.push({
        type: 'upgrade',
        priority: 'high',
        message: 'Consider upgrading your plan to handle growing patient base'
      });
    }
    
    // Check for optimization opportunities
    if (usageTrends.storage.trend === 'increasing' && 
        subscription.usage.storage > plan.limits.storage * 0.9) {
      recommendations.push({
        type: 'optimization',
        priority: 'medium',
        message: 'Storage usage is high, consider archiving old data'
      });
    }
    
    return recommendations;
  }

  generateRecommendations(subscription, plan, usageTrends, valueMetrics) {
    const recommendations = [];
    
    // Plan recommendations
    if (valueMetrics.costPerPatient > 50) {
      recommendations.push({
        category: 'cost_optimization',
        title: 'Cost Optimization Opportunity',
        description: 'Your cost per patient is above average. Consider optimizing your workflow or upgrading to a more cost-effective plan.',
        priority: 'medium',
        action: 'review_plan'
      });
    }
    
    // Usage recommendations
    if (usageTrends.patients.growth > 20) {
      recommendations.push({
        category: 'growth',
        title: 'Growing Practice Detected',
        description: 'Your patient base is growing rapidly. Consider upgrading to handle increased capacity.',
        priority: 'high',
        action: 'upgrade_plan'
      });
    }
    
    // Feature recommendations
    recommendations.push({
      category: 'features',
      title: 'Underutilized Features',
      description: 'You have access to advanced features that could help optimize your practice.',
      priority: 'low',
      action: 'explore_features'
    });
    
    return recommendations;
  }

  // Usage-based billing alerts
  async checkUsageLimits(subscriptionId) {
    await this.simulateDelay(500);
    
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    
    const plan = await this.getPlan(subscription.planId);
    const alerts = [];
    
    // Check each usage metric
    for (const [metric, limit] of Object.entries(plan.limits)) {
      if (limit > 0) { // -1 means unlimited
        const usage = subscription.usage[metric];
        const usagePercent = (usage / limit) * 100;
        
        if (usagePercent >= 90) {
          alerts.push({
            type: 'critical',
            metric,
            usage,
            limit,
            percentage: usagePercent,
            message: `${metric} usage is at ${usagePercent.toFixed(1)}% of limit`
          });
        } else if (usagePercent >= 80) {
          alerts.push({
            type: 'warning',
            metric,
            usage,
            limit,
            percentage: usagePercent,
            message: `${metric} usage is at ${usagePercent.toFixed(1)}% of limit`
          });
        }
      }
    }
    
    return alerts;
  }

  // Subscription comparison
  async compareSubscriptions(subscriptionIds) {
    await this.simulateDelay(1000);
    
    const subscriptions = this.subscriptions.filter(sub => 
      subscriptionIds.includes(sub.id)
    );
    
    const comparison = {
      subscriptions: [],
      metrics: {
        totalSpent: 0,
        totalPatients: 0,
        totalReferrals: 0,
        averageMonthlySpend: 0
      }
    };
    
    for (const subscription of subscriptions) {
      const plan = await this.getPlan(subscription.planId);
      const totalSpent = subscription.billingHistory.reduce((total, invoice) => 
        invoice.status === 'paid' ? total + invoice.amount : total, 0
      );
      
      const subscriptionData = {
        id: subscription.id,
        planName: plan.displayName,
        status: subscription.status,
        usage: subscription.usage,
        totalSpent,
        subscriptionAge: Math.floor((new Date() - new Date(subscription.createdAt)) / (1000 * 60 * 60 * 24))
      };
      
      comparison.subscriptions.push(subscriptionData);
      comparison.metrics.totalSpent += totalSpent;
      comparison.metrics.totalPatients += subscription.usage.patients;
      comparison.metrics.totalReferrals += subscription.usage.referrals;
    }
    
    comparison.metrics.averageMonthlySpend = comparison.metrics.totalSpent / subscriptions.length;
    
    return comparison;
  }

  // Initialize coupons for demo
  initializeCoupons() {
    this.coupons = [
      {
        id: 'coupon_001',
        code: 'WELCOME20',
        discountType: 'percentage',
        discountValue: 20,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        usageLimit: 100,
        currentUsage: 15,
        active: true,
        createdAt: new Date()
      },
      {
        id: 'coupon_002',
        code: 'SAVE50',
        discountType: 'fixed',
        discountValue: 50,
        expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        usageLimit: 50,
        currentUsage: 8,
        active: true,
        createdAt: new Date()
      }
    ];
  }
}

export const subscriptionService = new SubscriptionService();
