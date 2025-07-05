import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiUsers, FiCalendar, FiFileText, FiCreditCard, FiBarChart3, FiShield,
  FiMessageSquare, FiUpload, FiSettings, FiTrendingUp, FiClock, FiCheck
} = FiIcons;

function FeaturesSection() {
  const features = [
    {
      icon: FiUsers,
      title: 'Patient Management',
      description: 'Complete patient records, history tracking, and seamless referral management.',
      benefits: ['Digital patient files', 'Insurance tracking', 'Treatment history'],
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: FiCalendar,
      title: 'Smart Scheduling',
      description: 'Advanced appointment scheduling with automated reminders and calendar sync.',
      benefits: ['Online booking', 'SMS reminders', 'Calendar integration'],
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: FiFileText,
      title: 'Clinical Notes',
      description: 'Digital clinical documentation with templates and collaborative features.',
      benefits: ['Note templates', 'Voice-to-text', 'Secure sharing'],
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: FiCreditCard,
      title: 'Billing & Payments',
      description: 'Streamlined billing processes with insurance verification and payment tracking.',
      benefits: ['Insurance verification', 'Payment processing', 'Financial reporting'],
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: FiBarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into your practice performance and growth metrics.',
      benefits: ['Performance dashboards', 'Revenue tracking', 'Patient analytics'],
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: FiShield,
      title: 'HIPAA Compliance',
      description: 'Enterprise-grade security ensuring complete HIPAA compliance and data protection.',
      benefits: ['End-to-end encryption', 'Audit trails', 'Access controls'],
      gradient: 'from-red-500 to-red-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SafeIcon icon={FiSettings} className="mr-2" />
            Powerful Features
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your Practice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools modern dental practices need 
            to streamline operations, improve patient care, and grow their business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <SafeIcon icon={feature.icon} className="text-white text-2xl" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {feature.description}
              </p>

              {/* Benefits List */}
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                    <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className={`text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent hover:underline`}>
                  Learn more →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Practice?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of dental professionals who trust our platform to streamline their operations and grow their practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Start Free Trial
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;