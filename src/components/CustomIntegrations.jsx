import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiSettings, FiPlus, FiCheck, FiX, FiExternalLink, FiRefreshCw, 
  FiShield, FiZap, FiCloud, FiDatabase, FiMail, FiPhone, FiCreditCard,
  FiCalendar, FiFileText, FiBarChart3, FiUsers, FiActivity
} = FiIcons;

function CustomIntegrations() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const integrationCategories = [
    { id: 'all', name: 'All Integrations', count: 24 },
    { id: 'payment', name: 'Payment', count: 6 },
    { id: 'communication', name: 'Communication', count: 5 },
    { id: 'analytics', name: 'Analytics', count: 4 },
    { id: 'storage', name: 'Storage', count: 3 },
    { id: 'scheduling', name: 'Scheduling', count: 6 }
  ];

  const integrations = [
    {
      id: 1,
      name: 'Stripe',
      description: 'Accept payments and manage billing seamlessly',
      category: 'payment',
      icon: FiCreditCard,
      color: 'from-purple-500 to-purple-600',
      connected: true,
      popularity: 'Most Popular',
      features: ['Payment Processing', 'Subscription Management', 'Invoicing'],
      setupTime: '5 minutes'
    },
    {
      id: 2,
      name: 'Twilio',
      description: 'SMS notifications and voice calls for appointments',
      category: 'communication',
      icon: FiPhone,
      color: 'from-red-500 to-red-600',
      connected: false,
      popularity: 'Popular',
      features: ['SMS Reminders', 'Voice Calls', 'Two-way Messaging'],
      setupTime: '10 minutes'
    },
    {
      id: 3,
      name: 'Google Analytics',
      description: 'Track website performance and patient behavior',
      category: 'analytics',
      icon: FiBarChart3,
      color: 'from-blue-500 to-blue-600',
      connected: true,
      popularity: 'Essential',
      features: ['Website Analytics', 'Patient Journey', 'Conversion Tracking'],
      setupTime: '3 minutes'
    },
    {
      id: 4,
      name: 'Mailchimp',
      description: 'Email marketing and patient communication',
      category: 'communication',
      icon: FiMail,
      color: 'from-yellow-500 to-orange-500',
      connected: false,
      popularity: 'Popular',
      features: ['Email Campaigns', 'Patient Newsletters', 'Automated Sequences'],
      setupTime: '8 minutes'
    },
    {
      id: 5,
      name: 'Google Drive',
      description: 'Secure cloud storage for patient files',
      category: 'storage',
      icon: FiCloud,
      color: 'from-green-500 to-green-600',
      connected: true,
      popularity: 'Essential',
      features: ['File Storage', 'Document Sharing', 'Backup Solutions'],
      setupTime: '5 minutes'
    },
    {
      id: 6,
      name: 'Calendly',
      description: 'Advanced appointment scheduling and booking',
      category: 'scheduling',
      icon: FiCalendar,
      color: 'from-indigo-500 to-indigo-600',
      connected: false,
      popularity: 'Growing',
      features: ['Online Booking', 'Calendar Sync', 'Availability Management'],
      setupTime: '12 minutes'
    },
    {
      id: 7,
      name: 'Zapier',
      description: 'Connect and automate workflows between apps',
      category: 'automation',
      icon: FiZap,
      color: 'from-orange-500 to-orange-600',
      connected: false,
      popularity: 'Power User',
      features: ['Workflow Automation', 'App Connections', 'Custom Triggers'],
      setupTime: '15 minutes'
    },
    {
      id: 8,
      name: 'Slack',
      description: 'Team communication and notifications',
      category: 'communication',
      icon: FiUsers,
      color: 'from-purple-600 to-pink-600',
      connected: true,
      popularity: 'Team Favorite',
      features: ['Team Chat', 'Notifications', 'File Sharing'],
      setupTime: '3 minutes'
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = activeTab === 'all' || integration.category === activeTab;
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const connectedCount = integrations.filter(i => i.connected).length;

  const handleConnect = (integrationId) => {
    // Handle integration connection logic
    console.log('Connecting integration:', integrationId);
  };

  const handleDisconnect = (integrationId) => {
    // Handle integration disconnection logic
    console.log('Disconnecting integration:', integrationId);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Integrations</h1>
            <p className="text-gray-600">Connect your favorite tools and streamline your workflow</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-sm text-gray-600">Connected: </span>
              <span className="font-semibold text-green-600">{connectedCount}</span>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all">
              <SafeIcon icon={FiPlus} />
              <span>Request Integration</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Available</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <SafeIcon icon={FiSettings} className="text-white text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Connected</p>
                <p className="text-2xl font-bold text-green-600">{connectedCount}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                <SafeIcon icon={FiCheck} className="text-white text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Workflows</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                <SafeIcon icon={FiActivity} className="text-white text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Data Synced</p>
                <p className="text-2xl font-bold text-orange-600">98%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                <SafeIcon icon={FiRefreshCw} className="text-white text-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <SafeIcon icon={FiSettings} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {integrationCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${integration.color}`}>
                  <SafeIcon icon={integration.icon} className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{integration.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {integration.popularity}
                  </span>
                </div>
              </div>
              {integration.connected ? (
                <div className="flex items-center text-green-600">
                  <SafeIcon icon={FiCheck} className="mr-1" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <div className="text-gray-400">
                  <SafeIcon icon={FiX} />
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4">{integration.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
              <div className="space-y-1">
                {integration.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <SafeIcon icon={FiCheck} className="text-green-500 mr-2 text-xs" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>Setup time: {integration.setupTime}</span>
              <div className="flex items-center">
                <SafeIcon icon={FiShield} className="mr-1 text-green-500" />
                <span>Secure</span>
              </div>
            </div>

            <div className="flex space-x-2">
              {integration.connected ? (
                <>
                  <button
                    onClick={() => handleDisconnect(integration.id)}
                    className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg font-medium hover:bg-red-200 transition-colors"
                  >
                    Disconnect
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <SafeIcon icon={FiSettings} className="mr-2" />
                    Configure
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleConnect(integration.id)}
                    className={`flex-1 bg-gradient-to-r ${integration.color} text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all`}
                  >
                    Connect
                  </button>
                  <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <SafeIcon icon={FiExternalLink} className="text-gray-600" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12">
            <SafeIcon icon={FiSettings} className="text-gray-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No integrations found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View All Integrations
            </button>
          </div>
        </motion.div>
      )}

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white"
      >
        <h3 className="text-2xl font-bold mb-4">Need a Custom Integration?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Can't find the integration you need? Our team can build custom connections to any API or service.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          Contact Our Team
        </button>
      </motion.div>
    </div>
  );
}

export default CustomIntegrations;