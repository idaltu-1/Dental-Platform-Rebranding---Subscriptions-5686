class StripeService {
  constructor() {
    this.stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
    this.plans = [
      {
        name: 'starter',
        amount: 49,
        priceId: 'price_1RemJgEWGT02FQpC9UZ3PNXp',
        paymentLink: 'https://buy.stripe.com/9B6eVd7OU32m9sk4sXao801',
        currency: 'usd',
        interval: 'month'
      },
      {
        name: 'professional',
        amount: 99,
        priceId: 'price_1RemJgEWGT02FQpCn8yAw9DE',
        paymentLink: 'https://buy.stripe.com/dRm14nd9eauOdIA3oTao803',
        currency: 'usd',
        interval: 'month'
      },
      {
        name: 'enterprise',
        amount: 499,
        priceId: 'price_1RemJgEWGT02FQpCJZSuLumG',
        paymentLink: 'https://buy.stripe.com/9B6aEX7OU46qfQIgbFao802',
        currency: 'usd',
        interval: 'month'
      },
      {
        name: 'celestial',
        amount: 999999,
        priceId: 'price_celestial_year',
        paymentLink: 'https://buy.stripe.com/celestial',
        currency: 'usd',
        interval: 'year'
      }
    ];
  }

  // Redirect to Stripe payment link
  async redirectToCheckout(planName) {
    try {
      const plan = this.plans.find(p => p.name === planName);
      
      if (!plan) {
        throw new Error('Plan not found');
      }

      // Log the payment attempt
      await this.logPaymentAttempt(plan);

      // Open payment link in new tab
      window.open(plan.paymentLink, '_blank');

      return {
        success: true,
        plan: plan.name,
        amount: plan.amount,
        paymentLink: plan.paymentLink
      };
    } catch (error) {
      console.error('Stripe checkout error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get plan details
  getPlan(planName) {
    return this.plans.find(p => p.name === planName);
  }

  // Get all plans
  getAllPlans() {
    return this.plans;
  }

  // Validate payment success (called from success page)
  async validatePaymentSuccess(sessionId) {
    try {
      // In a real app, you would verify the session with your backend
      console.log('Payment session validated:', sessionId);
      
      return {
        success: true,
        sessionId
      };
    } catch (error) {
      console.error('Payment validation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Log payment attempt for analytics
  async logPaymentAttempt(plan) {
    try {
      const logData = {
        timestamp: new Date().toISOString(),
        planName: plan.name,
        amount: plan.amount,
        currency: plan.currency,
        priceId: plan.priceId,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      };

      console.log('Payment attempt logged:', logData);
      
      // In a real app, send this to your analytics service
      return logData;
    } catch (error) {
      console.error('Failed to log payment attempt:', error);
    }
  }

  // Format currency for display
  formatCurrency(amount, currency = 'usd') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount);
  }

  // Calculate annual savings
  calculateAnnualSavings(monthlyAmount, discountPercent = 20) {
    const annualAmount = monthlyAmount * 12;
    const discountAmount = annualAmount * (discountPercent / 100);
    return {
      monthly: monthlyAmount,
      annual: annualAmount - discountAmount,
      savings: discountAmount,
      discountPercent
    };
  }
}

export const stripeService = new StripeService();