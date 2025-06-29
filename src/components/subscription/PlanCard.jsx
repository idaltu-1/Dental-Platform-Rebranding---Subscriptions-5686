import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheck, FiArrowRight, FiStar, FiShield, FiTrendingUp } = FiIcons;

function PlanCard({ plan, isCurrentPlan, onUpgrade, delay = 0 }) {
  const getIcon = (planId) => {
    switch (planId) {
      case 'starter': return FiShield;
      case 'professional': return FiStar;
      case 'enterprise': return FiTrendingUp;
      case 'celestial': return FiStar;
      default: return FiShield;
    }
  };

  const getGradient = (planId) => {
    switch (planId) {
      case 'starter': return 'from-blue-500 to-blue-600';
      case 'professional': return 'from-purple-500 to-purple-600';
      case 'enterprise': return 'from-green-500 to-green-600';
      case 'celestial': return 'from-yellow-600 to-yellow-700';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative border-2 rounded-xl p-6 transition-all duration-300 ${
        isCurrentPlan 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
      }`}
    >
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Current Plan
          </span>
        </div>
      )}

      {plan.id === 'professional' && !isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${getGradient(plan.id)} mb-4`}>
          <SafeIcon icon={getIcon(plan.id)} className="text-white text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.displayName}</h3>
        <div className="text-3xl font-bold text-gray-900">
          ${plan.amount}
          <span className="text-base font-normal text-gray-600">/{plan.interval}</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <SafeIcon icon={FiCheck} className="text-green-500 mr-3 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-6 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Patients:</span>
          <span className="font-medium">
            {plan.limits.patients === -1 ? 'Unlimited' : plan.limits.patients}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Storage:</span>
          <span className="font-medium">{plan.limits.storage}</span>
        </div>
        <div className="flex justify-between">
          <span>Users:</span>
          <span className="font-medium">
            {plan.limits.users === -1 ? 'Unlimited' : plan.limits.users}
          </span>
        </div>
      </div>

      {isCurrentPlan ? (
        <button
          disabled
          className="w-full py-3 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed"
        >
          Current Plan
        </button>
      ) : (
        <button
          onClick={onUpgrade}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r ${getGradient(plan.id)} text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
        >
          <span>Upgrade to {plan.displayName}</span>
          <SafeIcon icon={FiArrowRight} />
        </button>
      )}
    </motion.div>
  );
}

export default PlanCard;