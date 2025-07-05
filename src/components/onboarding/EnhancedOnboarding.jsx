import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiCheckCircle, FiPlay, FiArrowRight, FiStar, FiZap, FiShield,
  FiVideo, FiBot, FiBarChart3, FiUsers, FiCalendar, FiFileText,
  FiSettings, FiHeart, FiTrendingUp, FiActivity, FiGlobe, FiTarget
} = FiIcons;

function EnhancedOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const onboardingSteps = [
    {
      id: 'welcome',
      title: 'Welcome to the Future of Dental Practice Management',
      description: 'Get started with our comprehensive platform featuring AI-powered tools, telemedicine, and advanced analytics.',
      icon: FiStar,
      color: 'from-blue-500 to-blue-600',
      features: [
        'AI-powered diagnostic assistance',
        'Integrated telemedicine platform',
        'Advanced analytics and reporting',
        'Comprehensive workflow automation'
      ]
    },
    {
      id: 'ai-setup',
      title: 'Configure AI Assistant',
      description: 'Set up your AI-powered diagnostic and administrative assistant for optimal practice efficiency.',
      icon: FiBot,
      color: 'from-purple-500 to-purple-600',
      features: [
        'Clinical decision support',
        'Automated documentation',
        'Predictive analytics',
        'Natural language processing'
      ]
    },
    {
      id: 'telemedicine',
      title: 'Enable Telemedicine',
      description: 'Configure secure video consultations and remote patient monitoring capabilities.',
      icon: FiVideo,
      color: 'from-green-500 to-green-600',
      features: [
        'HD video consultations',
        'Remote patient monitoring',
        'Digital prescriptions',
        'HIPAA-compliant platform'
      ]
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics Setup',
      description: 'Configure comprehensive analytics and reporting for data-driven practice management.',
      icon: FiBarChart3,
      color: 'from-orange-500 to-orange-600',
      features: [
        'Real-time dashboards',
        'Predictive insights',
        'Performance benchmarking',
        'Custom reporting'
      ]
    },
    {
      id: 'integrations',
      title: 'Connect Your Tools',
      description: 'Integrate with 45+ third-party services to create a seamless workflow.',
      icon: FiSettings,
      color: 'from-indigo-500 to-indigo-600',
      features: [
        '45+ available integrations',
        'Custom workflow automation',
        'API access',
        'Real-time synchronization'
      ]
    },
    {
      id: 'automation',
      title: 'Workflow Automation',
      description: 'Set up intelligent automation to streamline your practice operations.',
      icon: FiZap,
      color: 'from-yellow-500 to-yellow-600',
      features: [
        'Automated appointment reminders',
        'Insurance verification',
        'Follow-up care sequences',
        'Revenue cycle optimization'
      ]
    }
  ];

  const quickStartActions = [
    {
      title: 'Import Patient Data',
      description: 'Securely migrate your existing patient records',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      estimated_time: '15 minutes'
    },
    {
      title: 'Set Up Scheduling',
      description: 'Configure your appointment scheduling preferences',
      icon: FiCalendar,
      color: 'from-green-500 to-green-600',
      estimated_time: '10 minutes'
    },
    {
      title: 'Configure Templates',
      description: 'Set up clinical note and treatment plan templates',
      icon: FiFileText,
      color: 'from-purple-500 to-purple-600',
      estimated_time: '20 minutes'
    },
    {
      title: 'Connect Integrations',
      description: 'Link your essential tools and services',
      icon: FiGlobe,
      color: 'from-orange-500 to-orange-600',
      estimated_time: '30 minutes'
    }
  ];

  const aiCapabilities = [
    {
      title: 'Diagnostic Support',
      description: 'AI-powered analysis of symptoms, images, and patient data',
      confidence: 94,
      icon: FiTarget
    },
    {
      title: 'Treatment Planning',
      description: 'Intelligent treatment recommendations based on best practices',
      confidence: 91,
      icon: FiHeart
    },
    {
      title: 'Risk Assessment',
      description: 'Predictive analytics for patient risk stratification',
      confidence: 89,
      icon: FiShield
    },
    {
      title: 'Workflow Optimization',
      description: 'Continuous improvement suggestions for practice efficiency',
      confidence: 96,
      icon: FiTrendingUp
    }
  ];

  const handleStepComplete = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    if (stepIndex < onboardingSteps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleSkipToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const currentStepData = onboardingSteps[currentStep];
  const progressPercentage = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Advanced Dental Practice Management
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform your practice with AI-powered tools, telemedicine capabilities, and comprehensive automation.
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Setup Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Step Navigation */}
        <div className="xl:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Setup Steps</h3>
          <div className="space-y-2">
            {onboardingSteps.map((step, index) => (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSkipToStep(index)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  currentStep === index
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : completedSteps.includes(index)
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${step.color}`}>
                    <SafeIcon icon={step.icon} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{step.title}</p>
                    <div className="flex items-center mt-1">
                      {completedSteps.includes(index) && (
                        <SafeIcon icon={FiCheckCircle} className="text-green-500 text-sm mr-1" />
                      )}
                      <span className={`text-xs ${
                        completedSteps.includes(index) ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {completedSteps.includes(index) ? 'Completed' : `Step ${index + 1}`}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-3">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* Step Header */}
            <div className={`bg-gradient-to-r ${currentStepData.color} p-6 text-white`}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                  <SafeIcon icon={currentStepData.icon} className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
                  <p className="text-white text-opacity-90">{currentStepData.description}</p>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentStepData.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <SafeIcon icon={FiCheckCircle} className="text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Capabilities Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {aiCapabilities.map((capability, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={capability.icon} className="text-blue-500" />
                              <h4 className="font-medium text-gray-900">{capability.title}</h4>
                            </div>
                            <span className="text-sm font-medium text-green-600">
                              {capability.confidence}% accuracy
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{capability.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep > 0 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                    <div className="space-y-3">
                      {currentStepData.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <SafeIcon icon={FiCheckCircle} className="text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Setup Instructions</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Follow these steps to configure {currentStepData.title.toLowerCase()} for your practice:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">1</div>
                        <span className="text-sm text-gray-700">Review default settings and preferences</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">2</div>
                        <span className="text-sm text-gray-700">Configure according to your practice needs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">3</div>
                        <span className="text-sm text-gray-700">Test functionality and verify setup</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    currentStep === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>

                <div className="flex space-x-3">
                  <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    Skip
                  </button>
                  <button
                    onClick={() => handleStepComplete(currentStep)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all bg-gradient-to-r ${currentStepData.color} text-white hover:shadow-lg flex items-center space-x-2`}
                  >
                    <span>{currentStep === onboardingSteps.length - 1 ? 'Complete Setup' : 'Continue'}</span>
                    <SafeIcon icon={currentStep === onboardingSteps.length - 1 ? FiCheckCircle : FiArrowRight} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Start Actions */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickStartActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                        <SafeIcon icon={action.icon} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-500">{action.estimated_time}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                      <SafeIcon icon={FiPlay} />
                      <span>Start Now</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnhancedOnboarding;