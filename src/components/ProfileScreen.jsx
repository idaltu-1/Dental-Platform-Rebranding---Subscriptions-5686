import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const { FiUser, FiMail, FiPhone, FiMapPin, FiBuilding, FiShield, FiEdit, FiSave, FiX, FiCamera, FiBell, FiLock, FiSettings } = FiIcons;

function ProfileScreen() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    practice: user?.practice || '',
    address: user?.address || '',
    speciality: user?.speciality || '',
    licenseNumber: user?.licenseNumber || '',
    npi: user?.npi || '',
    bio: user?.bio || '',
    preferences: {
      emailNotifications: user?.preferences?.emailNotifications ?? true,
      smsNotifications: user?.preferences?.smsNotifications ?? false,
      marketingEmails: user?.preferences?.marketingEmails ?? true,
      theme: user?.preferences?.theme || 'light'
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: FiUser },
    { id: 'practice', label: 'Practice Info', icon: FiBuilding },
    { id: 'preferences', label: 'Preferences', icon: FiSettings },
    { id: 'security', label: 'Security', icon: FiLock }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      practice: user?.practice || '',
      address: user?.address || '',
      speciality: user?.speciality || '',
      licenseNumber: user?.licenseNumber || '',
      npi: user?.npi || '',
      bio: user?.bio || '',
      preferences: {
        emailNotifications: user?.preferences?.emailNotifications ?? true,
        smsNotifications: user?.preferences?.smsNotifications ?? false,
        marketingEmails: user?.preferences?.marketingEmails ?? true,
        theme: user?.preferences?.theme || 'light'
      }
    });
    setIsEditing(false);
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">
              {formData.name.charAt(0) || 'U'}
            </span>
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
              <SafeIcon icon={FiCamera} className="text-sm" />
            </button>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{formData.name || 'User Name'}</h3>
          <p className="text-gray-600">{user?.role?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'User'}</p>
          <p className="text-sm text-gray-500">Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiUser} className="inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiMail} className="inline mr-2" />
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiPhone} className="inline mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiMapPin} className="inline mr-2" />
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          disabled={!isEditing}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>
  );

  const renderPracticeTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiBuilding} className="inline mr-2" />
            Practice Name
          </label>
          <input
            type="text"
            value={formData.practice}
            onChange={(e) => handleInputChange('practice', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialty
          </label>
          <select
            value={formData.speciality}
            onChange={(e) => handleInputChange('speciality', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">Select Specialty</option>
            <option value="general">General Dentistry</option>
            <option value="endodontics">Endodontics</option>
            <option value="oral_surgery">Oral Surgery</option>
            <option value="orthodontics">Orthodontics</option>
            <option value="periodontics">Periodontics</option>
            <option value="prosthodontics">Prosthodontics</option>
            <option value="pediatric">Pediatric Dentistry</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License Number
          </label>
          <input
            type="text"
            value={formData.licenseNumber}
            onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NPI Number
          </label>
          <input
            type="text"
            value={formData.npi}
            onChange={(e) => handleInputChange('npi', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          <SafeIcon icon={FiBell} className="inline mr-2" />
          Notification Preferences
        </h4>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.preferences.emailNotifications}
              onChange={(e) => handleInputChange('preferences.emailNotifications', e.target.checked)}
              disabled={!isEditing}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3">Email Notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.preferences.smsNotifications}
              onChange={(e) => handleInputChange('preferences.smsNotifications', e.target.checked)}
              disabled={!isEditing}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3">SMS Notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.preferences.marketingEmails}
              onChange={(e) => handleInputChange('preferences.marketingEmails', e.target.checked)}
              disabled={!isEditing}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3">Marketing Emails</span>
          </label>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h4>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            value={formData.preferences.theme}
            onChange={(e) => handleInputChange('preferences.theme', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <SafeIcon icon={FiShield} className="text-yellow-600 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Security Settings</h4>
            <p className="text-sm text-yellow-700 mt-1">
              For security reasons, password changes and two-factor authentication setup require additional verification.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
            </div>
            <SafeIcon icon={FiLock} className="text-gray-400" />
          </div>
        </button>

        <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <span className="text-sm text-red-600 font-medium">Not Enabled</span>
          </div>
        </button>

        <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Active Sessions</h4>
              <p className="text-sm text-gray-600">Manage your active login sessions</p>
            </div>
            <span className="text-sm text-green-600 font-medium">1 Active</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralTab();
      case 'practice': return renderPracticeTab();
      case 'preferences': return renderPreferencesTab();
      case 'security': return renderSecurityTab();
      default: return renderGeneralTab();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiX} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <SafeIcon icon={FiSave} />
                )}
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiEdit} />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
}

export default ProfileScreen;