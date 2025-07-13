import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheck, FiStar, FiShield, FiTrendingUp, FiArrowRight, FiZap } = FiIcons;

function PricingSection() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      icon: FiShield,
      popular: false,
      price: { monthly: 49, yearly: 499 },
      description: 'Perfect for small dental practices',
      features: [
        'Up to 100 patients',
        'Basic appointment scheduling',
        'Patient records management',
        'Email support',
        'Basic reporting',
        '1GB storage',
        '2 users included'
      ],
      gradient: 'from-blue-500 to-blue-600',
      paymentLink: 'https://buy.stripe.com/9B6eVd7OU32m9sk4sXao801'
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: FiStar,
      popular: true,
      price: { monthly: 99, yearly: 999 },
      description: 'Most popular choice for growing practices',
      features: [
        'Unlimited patients',
        'Advanced scheduling',
        'Treatment planning',
        'Insurance management',
        'Advanced reporting',
        'SMS notifications',
        'Priority support',
        '10GB storage',
        '10 users included'
      ],
      gradient: 'from-purple-600 to-indigo-600',
      paymentLink: 'https://buy.stripe.com/dRm14nd9eauOdIA3oTao803'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: FiTrendingUp,
      popular: false,
      price: { monthly: 499, yearly: 4999 },
      description: 'Complete solution for large practices',
      features: [
        'Multi-location support',
        'Custom integrations',
        'Advanced analytics',
        'Staff management',
        'API access',
        'White-label options',
        '24/7 phone support',
        'Dedicated account manager',
        '100GB storage',
        'Unlimited users'
      ],
      gradient: 'from-green-600 to-emerald-600',
      paymentLink: 'https://buy.stripe.com/9B6aEX7OU46qfQIgbFao802'
    },
    {
      id: 'celestial',
      name: 'Celestial',
      icon: FiStar,
      popular: false,
      price: { monthly: null, yearly: 999999 },
      description: 'For practices beyond this world',
      features: [
        'All Enterprise features',
        'Unlimited storage',
        'Dedicated success manager'
      ],
      gradient: 'from-yellow-600 to-yellow-700',
      paymentLink: 'https://buy.stripe.com/celestial'
    }
  ];

  const handlePlanSelect = (plan) => {
    // Open Stripe payment link in new tab
    window.open(plan.paymentLink, '_blank');
  };

  const calculateSavings = (monthlyPrice) => {
    if (!monthlyPrice) return 0;
    const yearlyPrice = monthlyPrice * 10; // 2 months free
    const monthlyCost = monthlyPrice * 12;
    return monthlyCost - yearlyPrice;
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SafeIcon icon={FiZap} className="mr-2" />
            Simple Pricing
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start with a 14-day free trial. No setup fees, no hidden costs. 
            Cancel anytime with just one click.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-xl p-1 shadow-lg border border-gray-200">
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
                Save 17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-purple-500 scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.gradient} mb-4`}>
                    <SafeIcon icon={plan.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price[billingPeriod]}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{billingPeriod === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  
                  {billingPeriod === 'yearly' && plan.price.monthly && (
                    <div className="text-green-600 text-sm font-medium">
                      Save ${calculateSavings(plan.price.monthly)} annually
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <SafeIcon icon={FiCheck} className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <span>Start Free Trial</span>
                  <SafeIcon icon={FiArrowRight} />
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  14-day free trial • No credit card required
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            All Plans Include
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FiShield, title: 'HIPAA Compliant', desc: 'Enterprise security' },
              { icon: FiZap, title: 'Fast Setup', desc: 'Ready in minutes' },
              { icon: FiStar, title: 'Expert Support', desc: '24/7 assistance' },
              { icon: FiTrendingUp, title: 'Regular Updates', desc: 'Always current' }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4">
                  <SafeIcon icon={feature.icon} className="text-blue-600 text-xl" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              {
                q: 'Can I change plans later?',
                a: 'Yes, you can upgrade or downgrade at any time. Changes take effect immediately.'
              },
              {
                q: 'Is my data secure?',
                a: 'Absolutely. We\'re HIPAA compliant with enterprise-grade security and encryption.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 14-day free trial and pro-rated refunds for annual plans.'
              },
              {
                q: 'Need help choosing?',
                a: 'Contact our team for a personalized consultation and live demo.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;