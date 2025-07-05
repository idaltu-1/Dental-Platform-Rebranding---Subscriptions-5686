import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiUsers, FiCalendar, FiFileText, FiCreditCard, FiBarChart3, FiShield,
  FiMessageSquare, FiUpload, FiSettings, FiTrendingUp, FiClock, FiCheck,
  FiSmartphone, FiBot, FiVideo, FiGlobe, FiDatabase, FiZap, FiAward,
  FiCloud, FiLock, FiActivity, FiTarget, FiHeart
} = FiIcons;

function FeaturesSection() {
  const features = [
    {
      icon: FiUsers,
      title: 'Advanced Patient Management',
      description: 'Complete patient records with AI-powered insights, automated workflows, and comprehensive health tracking.',
      benefits: ['AI-assisted diagnosis support', 'Automated patient communication', 'Advanced health analytics', 'Family account linking'],
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: FiCalendar,
      title: 'Intelligent Scheduling',
      description: 'Smart appointment scheduling with AI optimization, automated reminders, and real-time availability.',
      benefits: ['AI-powered scheduling optimization', 'Multi-channel reminders', 'Smart calendar integration', 'Automated rescheduling'],
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: FiFileText,
      title: 'Advanced Clinical Documentation',
      description: 'Digital clinical notes with AI templates, voice recognition, and collaborative treatment planning.',
      benefits: ['AI-generated note templates', 'Voice-to-text transcription', 'Collaborative care plans', 'SOAP note automation'],
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: FiBot,
      title: 'AI-Powered Diagnostics',
      description: 'Advanced AI tools for diagnostic assistance, treatment recommendations, and predictive analytics.',
      benefits: ['AI diagnostic support', 'Treatment recommendation engine', 'Predictive risk assessment', 'Image analysis tools'],
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: FiVideo,
      title: 'Telemedicine Platform',
      description: 'Built-in telemedicine capabilities with secure video consultations and remote monitoring.',
      benefits: ['HD video consultations', 'Remote patient monitoring', 'Digital prescriptions', 'Secure messaging'],
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      icon: FiCreditCard,
      title: 'Advanced Billing & Payments',
      description: 'Comprehensive financial management with automated billing, insurance processing, and payment plans.',
      benefits: ['Automated insurance claims', 'Flexible payment plans', 'Revenue cycle management', 'Real-time financial reporting'],
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: FiBarChart3,
      title: 'Advanced Analytics & Insights',
      description: 'Comprehensive business intelligence with predictive analytics, performance tracking, and growth insights.',
      benefits: ['Predictive analytics dashboard', 'Patient behavior insights', 'Performance benchmarking', 'Growth optimization tools'],
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: FiShield,
      title: 'Enterprise Security & Compliance',
      description: 'Advanced security features with HIPAA compliance, audit trails, and enterprise-grade protection.',
      benefits: ['Advanced encryption', 'Comprehensive audit trails', 'Multi-factor authentication', 'Compliance automation'],
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile-First Experience',
      description: 'Fully responsive mobile platform with native app features and offline capabilities.',
      benefits: ['Native mobile apps', 'Offline functionality', 'Push notifications', 'Mobile-optimized workflows'],
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: FiGlobe,
      title: 'Multi-Location Management',
      description: 'Centralized management for multiple practice locations with unified reporting and staff coordination.',
      benefits: ['Centralized dashboard', 'Cross-location scheduling', 'Unified reporting', 'Staff management tools'],
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: FiZap,
      title: 'Workflow Automation',
      description: 'Intelligent automation tools to streamline operations, reduce manual tasks, and improve efficiency.',
      benefits: ['Automated workflows', 'Smart task management', 'Process optimization', 'Integration automation'],
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: FiTarget,
      title: 'Performance Optimization',
      description: 'Advanced tools for practice optimization, performance tracking, and continuous improvement.',
      benefits: ['Performance metrics', 'Optimization recommendations', 'Goal tracking', 'Continuous improvement tools'],
      gradient: 'from-violet-500 to-violet-600'
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
            <SafeIcon icon={FiZap} className="mr-2" />
            Advanced Features & AI-Powered Tools
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Complete Dental Practice Management Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our cutting-edge platform combines AI-powered tools, advanced analytics, and comprehensive practice management 
            to transform how dental practices operate, deliver care, and grow their business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <SafeIcon icon={feature.icon} className="text-white text-xl" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {feature.description}
              </p>

              {/* Benefits List */}
              <ul className="space-y-1.5">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start text-xs text-gray-600">
                    <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className={`text-xs font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent hover:underline`}>
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