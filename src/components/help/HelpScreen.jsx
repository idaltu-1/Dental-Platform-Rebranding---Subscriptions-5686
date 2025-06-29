import React, {useState} from 'react';
import toast from 'react-hot-toast';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {
  FiHelpCircle, FiSearch, FiBook, FiPlay, FiMail, FiPhone, 
  FiMessageSquare, FiChevronRight, FiDownload, FiExternalLink
} = FiIcons;

function HelpScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const helpCategories = [
    {id: 'all', name: 'All Topics', count: 24},
    {id: 'getting-started', name: 'Getting Started', count: 8},
    {id: 'patient-management', name: 'Patient Management', count: 6},
    {id: 'referrals', name: 'Referrals', count: 5},
    {id: 'billing', name: 'Billing & Insurance', count: 3},
    {id: 'integrations', name: 'Integrations', count: 2}
  ];

  const helpTopics = [
    {
      id: 1,
      title: 'Getting Started with refer.dental',
      category: 'getting-started',
      description: 'Complete guide to setting up your account and first steps',
      type: 'guide',
      readTime: '5 min',
      popular: true
    },
    {
      id: 2,
      title: 'Managing Patient Records',
      category: 'patient-management',
      description: 'How to add, edit, and organize patient information',
      type: 'tutorial',
      readTime: '3 min',
      popular: true
    },
    {
      id: 3,
      title: 'Creating and Tracking Referrals',
      category: 'referrals',
      description: 'Step-by-step guide to the referral process',
      type: 'video',
      readTime: '8 min',
      popular: true
    },
    {
      id: 4,
      title: 'Insurance Verification Process',
      category: 'billing',
      description: 'How to verify patient insurance and handle claims',
      type: 'guide',
      readTime: '6 min',
      popular: false
    },
    {
      id: 5,
      title: 'Setting Up Integrations',
      category: 'integrations',
      description: 'Connect your favorite tools and automate workflows',
      type: 'tutorial',
      readTime: '10 min',
      popular: false
    },
    {
      id: 6,
      title: 'Clinical Notes Best Practices',
      category: 'patient-management',
      description: 'Tips for effective clinical documentation',
      type: 'guide',
      readTime: '4 min',
      popular: true
    }
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: FiMail,
      action: () => window.open('mailto:support@refer.dental'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Schedule Demo',
      description: 'Book a personalized walkthrough',
      icon: FiPhone,
      action: () => window.open('https://calendly.com/refer-dental'),
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: FiPlay,
      action: () => window.open('https://youtube.com/refer-dental'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: FiMessageSquare,
      action: () => window.open('https://community.refer.dental'),
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const filteredTopics = helpTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Help & Support</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find answers to your questions and learn how to get the most out of refer.dental
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.1}}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.2}}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {quickActions.map((action, index) => (
          <motion.button
            key={action.title}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.3 + index * 0.1}}
            onClick={action.action}
            className="group relative overflow-hidden rounded-xl border border-gray-200 p-6 text-left hover:border-transparent hover:shadow-lg transition-all duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <div className="relative">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} mb-4`}>
                <SafeIcon icon={action.icon} className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Categories and Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <motion.div
          initial={{opacity: 0, x: -20}}
          animate={{opacity: 1, x: 0}}
          transition={{delay: 0.4}}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {helpCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-xs text-gray-500">({category.count})</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Help Topics */}
        <motion.div
          initial={{opacity: 0, x: 20}}
          animate={{opacity: 1, x: 0}}
          transition={{delay: 0.5}}
          className="lg:col-span-3"
        >
          <div className="space-y-4">
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.6 + index * 0.1}}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => toast.success('Opening help article...')}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
                      {topic.popular && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{topic.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <SafeIcon icon={topic.type === 'video' ? FiPlay : FiBook} className="mr-1" />
                        {topic.type === 'video' ? 'Video' : topic.type === 'tutorial' ? 'Tutorial' : 'Guide'}
                      </span>
                      <span>{topic.readTime}</span>
                    </div>
                  </div>
                  <SafeIcon icon={FiChevronRight} className="text-gray-400 ml-4" />
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="text-center py-12">
              <SafeIcon icon={FiHelpCircle} className="text-gray-300 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or browse different categories</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Additional Resources */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.8}}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you succeed. Get personalized assistance and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('mailto:support@refer.dental')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiMail} />
              <span>Email Support</span>
            </button>
            <button
              onClick={() => window.open('https://refer.dental/docs')}
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiExternalLink} />
              <span>Documentation</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HelpScreen;