import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {useAuth} from '../contexts/AuthContext';
import {roleService} from '../services/RoleService';
import {subscriptionService} from '../services/SubscriptionService';
import toast from 'react-hot-toast';

const {
  FiHome, FiUsers, FiSettings, FiCalendar, FiBarChart3, FiHelpCircle, FiPlay, 
  FiFileText, FiMenu, FiShare2, FiCreditCard, FiUpload, FiMessageSquare, FiBell, 
  FiChevronLeft, FiChevronRight, FiDollarSign, FiUser, FiLogOut, FiEdit, FiX, FiPlus,
  FiGift, FiAward, FiTag, FiTrendingUp
} = FiIcons;

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const {user, logout} = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [planId, setPlanId] = useState(null);

  useEffect(() => {
    async function fetchPlan() {
      if (user) {
        const sub = await subscriptionService.getSubscription(user.id);
        setPlanId(sub?.planId || null);
      }
    }
    fetchPlan();
  }, [user]);

  const allMenuItems = [
    {path: '/dashboard', label: 'Dashboard', icon: FiHome, permission: null, minPlan: 'starter'},
    {path: '/patients', label: 'Patients', icon: FiUsers, permission: 'patient_management', minPlan: 'professional'},
    {path: '/referrals', label: 'Referral Tracking', icon: FiShare2, permission: 'referral_management', minPlan: 'professional'},
    {path: '/schedule', label: 'Schedule', icon: FiCalendar, permission: 'schedule_management', minPlan: 'professional'},
    {path: '/clinical-notes', label: 'Clinical Notes', icon: FiFileText, permission: 'clinical_notes', minPlan: 'professional'},
    {path: '/insurance', label: 'Insurance', icon: FiCreditCard, permission: 'insurance_verification', minPlan: 'professional'},
    {path: '/documents', label: 'Documents', icon: FiUpload, permission: 'document_management', minPlan: 'professional'},
    {path: '/chat', label: 'Chat', icon: FiMessageSquare, permission: 'chat_system', minPlan: 'professional'},
    {path: '/notifications', label: 'Notifications', icon: FiBell, permission: null, minPlan: 'starter'},
    {path: '/analytics', label: 'Analytics', icon: FiBarChart3, permission: 'analytics', minPlan: 'enterprise'},
    {path: '/rewards', label: 'Rewards', icon: FiAward, permission: null, minPlan: 'starter'},
    {path: '/subscription', label: 'Subscription', icon: FiDollarSign, permission: null, minPlan: 'starter'},
    {path: '/integrations', label: 'Integrations', icon: FiSettings, permission: null, minPlan: 'enterprise'},
    {path: '/get-started', label: 'Get Started', icon: FiPlay, permission: null, minPlan: 'starter'},
    {path: '/help', label: 'Help', icon: FiHelpCircle, permission: null, minPlan: 'starter'}
  ];

  const getVisibleMenuItems = () => {
    if (!user) return [];

    return allMenuItems.filter(item => {
      const hasPerm = !item.permission || user.role === 'super_admin' || roleService.hasPermission(user.role, item.permission);
      if (!hasPerm) return false;
      if (!item.minPlan) return true;
      const userLevel = subscriptionService.getPlanLevel(planId);
      const requiredLevel = subscriptionService.getPlanLevel(item.minPlan);
      return userLevel >= requiredLevel;
    });
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowProfileMenu(false);
    setIsMobileMenuOpen(false);
  };

  const handleQuickReferral = () => {
    navigate('referrals', { state: { createNew: true } });
    setIsMobileMenuOpen(false);
    toast.success('Opening new referral form...');
  };

  const handleProfileClick = () => {
    if (isCollapsed) {
      setShowProfileMenu(!showProfileMenu);
    } else {
      navigate('profile');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout error:', error);
    }
  };

  const visibleMenuItems = getVisibleMenuItems();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <SafeIcon icon={FiMenu} className="text-gray-600 text-xl" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0, width: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3 }}
        className={`
          bg-white shadow-lg border-r border-gray-200 h-full flex flex-col relative z-50
          ${isMobileMenuOpen ? 'fixed' : 'hidden lg:flex'}
          lg:relative lg:flex
        `}
        style={{
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          '@media (min-width: 1024px)': { transform: 'translateX(0)' }
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RD</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">refer.dental</h2>
                  <p className="text-xs text-gray-500">Professional Platform</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              {/* Mobile close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <SafeIcon icon={FiX} className="text-gray-600" />
              </button>
              
              {/* Desktop collapse button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <SafeIcon icon={isCollapsed ? FiChevronRight : FiChevronLeft} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="p-4 border-b border-gray-200">
          <div className={`${isCollapsed ? 'space-y-2' : 'flex flex-col space-y-2'}`}>
            {/* Home Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation('/dashboard')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'} 
                px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg 
                hover:shadow-lg transition-all duration-200 group`}
              title={isCollapsed ? 'Home' : ''}
            >
              <SafeIcon icon={FiHome} className="text-lg" />
              {!isCollapsed && <span className="font-medium">Home</span>}
            </motion.button>

            {/* Quick Referral Button */}
            {roleService.hasPermission(user?.role, 'referral_creation') && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleQuickReferral}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'} 
                  px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg 
                  hover:shadow-lg transition-all duration-200 group`}
                title={isCollapsed ? 'New Referral' : ''}
              >
                <SafeIcon icon={FiPlus} className="text-lg" />
                {!isCollapsed && <span className="font-medium">New Referral</span>}
              </motion.button>
            )}
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-200 relative">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">
                  {user.name?.charAt(0) || 'U'}
                </span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.role?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'User'}
                  </p>
                </div>
              )}
              {!isCollapsed && (
                <SafeIcon icon={FiEdit} className="text-gray-400 text-sm" />
              )}
            </button>

            {/* Profile Dropdown for Collapsed State */}
            {isCollapsed && showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-48 z-50"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-medium text-gray-900">{user.name || 'User'}</p>
                  <p className="text-xs text-gray-500">
                    {user.role?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'User'}
                  </p>
                </div>
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <SafeIcon icon={FiUser} className="text-gray-500" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-red-600"
                >
                  <SafeIcon icon={FiLogOut} className="text-red-500" />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {visibleMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <SafeIcon
                      icon={item.icon}
                      className={`text-lg flex-shrink-0 ${
                        isActive
                          ? 'text-blue-600'
                          : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="font-medium truncate">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button - Always Visible on Desktop */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <SafeIcon icon={FiLogOut} className="text-lg" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <p>© 2024 refer.dental</p>
              <p>Version 2.0.1</p>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default Sidebar;
