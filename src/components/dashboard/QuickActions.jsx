import React from 'react';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import {useAuth} from '../../contexts/AuthContext';
import {roleService} from '../../services/RoleService';
import toast from 'react-hot-toast';

const {
  FiPlus, FiCalendar, FiUsers, FiFileText, FiCreditCard, FiUpload,
  FiMessageSquare, FiBarChart3, FiSettings, FiShield
} = FiIcons;

function QuickActions() {
  const navigate = useNavigate();
  const {user} = useAuth();

  const allActions = [
    {
      id: 'create_referral',
      title: 'Create Referral',
      description: 'Start a new patient referral',
      icon: FiPlus,
      color: 'from-blue-500 to-blue-600',
      path: '/referrals',
      permission: 'referral_creation'
    },
    {
      id: 'schedule_appointment',
      title: 'Schedule Appointment',
      description: 'Book a new appointment',
      icon: FiCalendar,
      color: 'from-green-500 to-green-600',
      path: '/schedule',
      permission: 'schedule_management'
    },
    {
      id: 'add_patient',
      title: 'Add Patient',
      description: 'Register a new patient',
      icon: FiUsers,
      color: 'from-purple-500 to-purple-600',
      path: '/patients',
      permission: 'patient_management'
    },
    {
      id: 'clinical_note',
      title: 'Clinical Note',
      description: 'Create clinical documentation',
      icon: FiFileText,
      color: 'from-indigo-500 to-indigo-600',
      path: '/clinical-notes',
      permission: 'clinical_notes'
    },
    {
      id: 'verify_insurance',
      title: 'Verify Insurance',
      description: 'Check insurance coverage',
      icon: FiCreditCard,
      color: 'from-yellow-500 to-yellow-600',
      path: '/insurance',
      permission: 'insurance_verification'
    },
    {
      id: 'upload_documents',
      title: 'Upload Documents',
      description: 'Add patient documents',
      icon: FiUpload,
      color: 'from-orange-500 to-orange-600',
      path: '/documents',
      permission: 'document_management'
    },
    {
      id: 'send_message',
      title: 'Send Message',
      description: 'Chat with team members',
      icon: FiMessageSquare,
      color: 'from-pink-500 to-pink-600',
      path: '/chat',
      permission: 'chat_system'
    },
    {
      id: 'view_analytics',
      title: 'View Analytics',
      description: 'Check practice metrics',
      icon: FiBarChart3,
      color: 'from-teal-500 to-teal-600',
      path: '/analytics',
      permission: 'analytics'
    },
    {
      id: 'manage_users',
      title: 'Manage Users',
      description: 'User administration',
      icon: FiShield,
      color: 'from-red-500 to-red-600',
      path: '/admin/users',
      permission: 'user_management'
    },
    {
      id: 'system_settings',
      title: 'System Settings',
      description: 'Configure platform',
      icon: FiSettings,
      color: 'from-gray-500 to-gray-600',
      path: '/settings',
      permission: 'system_settings'
    }
  ];

  const getAvailableActions = () => {
    if (!user) return [];
    return allActions.filter(action => {
      if (user.role === 'super_admin') return true;
      return roleService.hasPermission(user.role, action.permission);
    }).slice(0, 6); // Show max 6 actions
  };

  const handleActionClick = (action) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading(`Opening ${action.title}...`);
      
      // Simulate brief loading
      setTimeout(() => {
        toast.dismiss(loadingToast);
        
        // Check if path exists in routing
        if (action.path.includes('/admin/') && !user.role.includes('admin') && user.role !== 'super_admin') {
          toast.error('Access denied: Administrator privileges required');
          return;
        }
        
        // Navigate to the action path
        navigate(action.path);
        toast.success(`${action.title} opened successfully`);
      }, 500);
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('Navigation failed. Please try again.');
    }
  };

  const availableActions = getAvailableActions();

  if (availableActions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="text-center py-8">
          <SafeIcon icon={FiSettings} className="text-gray-300 text-3xl mx-auto mb-3" />
          <p className="text-gray-500">No actions available for your role</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <span className="text-sm text-gray-500">
          {availableActions.length} available
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableActions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.1}}
            onClick={() => handleActionClick(action)}
            className="group relative overflow-hidden rounded-lg border border-gray-200 p-4 text-left hover:border-transparent hover:shadow-lg transition-all duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <div className="relative">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} mb-3`}>
                <SafeIcon icon={action.icon} className="text-white text-lg" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-800">
                {action.title}
              </h4>
              <p className="text-sm text-gray-600 group-hover:text-gray-700">
                {action.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* View All Actions Link */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/dashboard/actions')}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          View all actions →
        </button>
      </div>
    </div>
  );
}

export default QuickActions;