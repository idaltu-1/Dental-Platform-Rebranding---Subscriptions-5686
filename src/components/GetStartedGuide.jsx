import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlay, FiCheck, FiArrowRight, FiBook, FiUsers, FiSettings } = FiIcons;

function GetStartedGuide() {
  const steps = [
    {
      id: 1,
      title: 'Complete Your Profile',
      description: 'Add your practice information and preferences',
      icon: FiUsers,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Set Up Integrations',
      description: 'Connect your existing tools and workflows',
      icon: FiSettings,
      status: 'current'
    },
    {
      id: 3,
      title: 'Create Your First Referral',
      description: 'Start using the platform with a test referral',
      icon: FiArrowRight,
      status: 'pending'
    },
    {
      id: 4,
      title: 'Explore Features',
      description: 'Discover clinical notes, analytics, and more',
      icon: FiBook,
      status: 'pending'
    }
  ];

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'current': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-400 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to refer.dental
        </h1>
          <p className="text-gray-600 text-lg">
            Let&apos;s get you started with our platform in just a few steps
          </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className={`p-3 rounded-lg ${getStepColor(step.status)}`}>
                <SafeIcon 
                  icon={step.status === 'completed' ? FiCheck : step.icon} 
                  className="text-xl"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>

              {step.status === 'current' && (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Start
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto">
            <SafeIcon icon={FiPlay} />
            <span>Continue Setup</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetStartedGuide;