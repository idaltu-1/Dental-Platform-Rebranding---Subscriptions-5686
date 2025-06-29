import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiArrowRight, FiStar, FiShield, FiTrendingUp } = FiIcons;

function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const navigate = useNavigate();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      icon: FiShield,
      price: { monthly: 29, yearly: 290 },
      description: 'Perfect for small dental practices',
      features: [
        'Up to 100 patients',
        'Basic appointment scheduling',
        'Patient records management',
        'Email support',
        'Basic reporting'
      ],
      color: 'from-gray-500 to-gray-600',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: FiStar,
      price: { monthly: 79, yearly: 790 },
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
      color: 'from-blue-600 to-indigo-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: FiTrendingUp,
      price: { monthly: 149, yearly: 1490 },
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
      color: 'from-purple-600 to-pink-600',
      popular: false
    }
  ];

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
        transition={{ delay: 0.1 }}
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
            transition={{ delay: 0.2 + index * 0.1 }}
            className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl cursor-pointer ${
              selectedPlan === plan.id
                ? 'border-blue-500 ring-4 ring-blue-100'
                : 'border-gray-200 hover:border-gray-300'
            } ${plan.popular ? 'scale-105' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${plan.color} mr-4`}>
                  <SafeIcon icon={plan.icon} className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price[billingPeriod]}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {billingPeriod === 'yearly' && (
                  <p className="text-green-600 text-sm mt-1">
                    Save ${(plan.price.monthly * 12) - plan.price.yearly} annually
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <SafeIcon icon={FiCheck} className="text-green-500 text-lg mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all ${
                  selectedPlan === plan.id
                    ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center"
      >
        <button
          onClick={handleContinue}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 hover:scale-105"
        >
          <span>Continue with {plans.find(p => p.id === selectedPlan)?.name} Plan</span>
          <SafeIcon icon={FiArrowRight} className="text-xl" />
        </button>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12 text-gray-600"
      >
        <p className="mb-2">✨ 14-day free trial • No setup fees • Cancel anytime</p>
        <p className="text-sm">All plans include SSL security, data backups, and HIPAA compliance</p>
      </motion.div>
    </div>
  );
}

export default SubscriptionPlans;