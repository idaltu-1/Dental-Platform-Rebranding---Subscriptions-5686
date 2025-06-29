import React, {useState} from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import {useAuth} from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const {
  FiSettings, FiBell, FiShield, FiUsers, FiDatabase, FiMail, 
  FiToggleLeft, FiToggleRight, FiSave, FiRefreshCw
} = FiIcons;

function SettingsScreen() {
  const {user} = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'refer.dental',
      timezone: 'America/New_York',
      dateFormat: 'MM/dd/yyyy',
      language: 'en'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      reminderNotifications: true,
      securityAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5
    },
    integrations: {
      stripeEnabled: true,
      twilioEnabled: false,
      mailchimpEnabled: false,
      googleCalendarEnabled: true
    }
  });

  const tabs = [
    {id: 'general', label: 'General', icon: FiSettings},
    {id: 'notifications', label: 'Notifications', icon: FiBell},
    {id: 'security', label: 'Security', icon: FiShield},
    {id: 'integrations', label: 'Integrations', icon: FiDatabase}
  ];

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Name
        </label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Timezone
        </label>
        <select
          value={settings.general.timezone}
          onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="America/Chicago">Central Time (CT)</option>
          <option value="America/Denver">Mountain Time (MT)</option>
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date Format
        </label>
        <select
          value={settings.general.dateFormat}
          onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MM/dd/yyyy">MM/dd/yyyy</option>
          <option value="dd/MM/yyyy">dd/MM/yyyy</option>
          <option value="yyyy-MM-dd">yyyy-MM-dd</option>
        </select>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </h4>
            <p className="text-sm text-gray-500">
              {key === 'emailNotifications' && 'Receive notifications via email'}
              {key === 'smsNotifications' && 'Receive notifications via SMS'}
              {key === 'pushNotifications' && 'Receive push notifications'}
              {key === 'reminderNotifications' && 'Get appointment reminders'}
              {key === 'securityAlerts' && 'Receive security alerts'}
            </p>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', key, !value)}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{backgroundColor: value ? '#3B82F6' : '#D1D5DB'}}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-500">Add an extra layer of security</p>
        </div>
        <button
          onClick={() => handleSettingChange('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{backgroundColor: settings.security.twoFactorAuth ? '#3B82F6' : '#D1D5DB'}}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password Expiry (days)
        </label>
        <input
          type="number"
          value={settings.security.passwordExpiry}
          onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      {Object.entries(settings.integrations).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Enabled', '')}
            </h4>
            <p className="text-sm text-gray-500">
              {key === 'stripeEnabled' && 'Payment processing integration'}
              {key === 'twilioEnabled' && 'SMS and voice communications'}
              {key === 'mailchimpEnabled' && 'Email marketing automation'}
              {key === 'googleCalendarEnabled' && 'Calendar synchronization'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium ${value ? 'text-green-600' : 'text-gray-500'}`}>
              {value ? 'Connected' : 'Disconnected'}
            </span>
            <button
              onClick={() => handleSettingChange('integrations', key, !value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                value 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {value ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'integrations':
        return renderIntegrationsSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
          <p className="text-gray-600">Configure your platform settings and preferences</p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? (
            <SafeIcon icon={FiRefreshCw} className="animate-spin" />
          ) : (
            <SafeIcon icon={FiSave} />
          )}
          <span>Save Changes</span>
        </button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.1}}
        className="border-b border-gray-200"
      >
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon icon={tab.icon} className="inline mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.2}}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
}

export default SettingsScreen;