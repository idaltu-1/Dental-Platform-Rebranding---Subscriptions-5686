import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import toast from 'react-hot-toast';

const { FiCheck, FiStar, FiTrendingUp, FiExternalLink, FiCreditCard, FiLogIn, FiUser } = FiIcons;

function PricingPlans() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'starter',
      displayName: 'Starter',
      icon: FiCreditCard,
      amount: 29,
      priceId: 'price_1RemJgEWGT02FQpC9UZ3PNXp',
      paymentLink: 'https://buy.stripe.com/9B6eVd7OU32m9sk4sXao801',
      currency: 'usd',
      interval: 'month',
      description: 'Perfect for small dental practices',
      features: [
        'Up to 100 patients',
        'Basic appointment scheduling',
        'Patient records management',
        'Email support',
        'Basic reporting'
      ],
      color: 'from-blue-500 to-blue-600',
      popular: false
    },
    {
      id: 'professional',
      name: 'professional',
      displayName: 'Professional',
      icon: FiStar,
      amount: 79,
      priceId: 'price_1RemJgEWGT02FQpCn8yAw9DE',
      paymentLink: 'https://buy.stripe.com/dRm14nd9eauOdIA3oTao803',
      currency: 'usd',
      interval: 'month',
      description: 'Most popular choice for growing practices',
      features: [
        'Unlimited patients',
        'Advanced scheduling',
        'Treatment planning',
        'Insurance management',
        'Advanced reporting',
        'SMS notifications',
        'Priority support'
      ],
      color: 'from-purple-600 to-indigo-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'enterprise',
      displayName: 'Enterprise',
      icon: FiTrendingUp,
      amount: 499,
      priceId: 'price_1RemJgEWGT02FQpCJZSuLumG',
      paymentLink: 'https://buy.stripe.com/9B6aEX7OU46qfQIgbFao802',
      currency: 'usd',
      interval: 'month',
      description: 'Complete solution for large practices',
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
      color: 'from-green-600 to-emerald-600',
      popular: false
    }
  ];

  const handlePlanSelect = (plan) => {
    try {
      // Track the plan selection
      console.log('Plan selected:', plan.name, plan.amount);
      
      // Show loading toast
      toast.loading('Redirecting to Stripe checkout...', { id: 'stripe-redirect' });
      
      // Open Stripe payment link in new tab
      window.open(plan.paymentLink, '_blank');
      
      // Dismiss loading toast after a short delay
      setTimeout(() => {
        toast.dismiss('stripe-redirect');
        toast.success(`Redirected to ${plan.displayName} plan checkout`);
      }, 1000);
    } catch (error) {
      console.error('Payment redirect error:', error);
      toast.error('Failed to redirect to payment. Please try again.');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header with Login Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <SafeIcon icon={FiUser} className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                refer.dental
              </h1>
              <p className="text-sm text-gray-500">Professional Dental Management</p>
            </div>
          </div>
          
          {/* Login Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleLoginClick}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <SafeIcon icon={FiLogIn} />
            <span>Login</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your dental practice with our comprehensive management platform
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-xl p-1 shadow-lg border">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all relative ${
                billingPeriod === 'yearly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl cursor-pointer border-gray-200 hover:border-gray-300 ${
                plan.popular ? 'scale-105 ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${plan.color} mr-4`}>
                    <SafeIcon icon={plan.icon} className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 capitalize">
                      {plan.displayName}
                    </h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.amount}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{plan.interval}
                    </span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <p className="text-green-600 text-sm mt-1">
                      Save ${(plan.amount * 12 * 0.2).toFixed(0)} annually
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <SafeIcon icon={FiCheck} className="text-green-500 text-lg mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  <span>Choose {plan.displayName}</span>
                  <SafeIcon icon={FiExternalLink} className="text-lg" />
                </button>

                {/* Security Badge */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    🔒 Secure payment powered by Stripe
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-600"
        >
          <p className="mb-2">✨ 14-day free trial • No setup fees • Cancel anytime</p>
          <p className="text-sm">
            All plans include SSL security, data backups, and HIPAA compliance
          </p>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-gray-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Can I change plans later?
              </h4>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Is my data secure?
              </h4>
              <p className="text-gray-600 text-sm">
                Absolutely. We're HIPAA compliant and use enterprise-grade security measures.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-gray-600 text-sm">
                We offer a 14-day free trial and pro-rated refunds for annual plans.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Need help choosing?
              </h4>
              <p className="text-gray-600 text-sm">
                Contact our team for a personalized consultation and demo.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Already have an account CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Already have an account?
          </p>
          <button
            onClick={handleLoginClick}
            className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <SafeIcon icon={FiLogIn} />
            <span>Sign In to Your Account</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default PricingPlans;