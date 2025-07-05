import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { subscriptionService } from '../../services/SubscriptionService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const { 
  FiTag, FiPercent, FiDollarSign, FiCopy, FiCheck, FiX, FiPlus, FiCalendar,
  FiGift, FiUsers, FiTrendingUp, FiAlertCircle, FiSettings, FiEdit
} = FiIcons;

function DiscountManager() {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 0,
    expiryDate: '',
    usageLimit: null
  });

  useEffect(() => {
    loadDiscountData();
  }, [user]);

  const loadDiscountData = async () => {
    try {
      setLoading(true);
      const subscriptionData = await subscriptionService.getSubscription(user.id);
      setSubscription(subscriptionData);
      
      // In a real app, you'd fetch available coupons for the user
      setCoupons([
        {
          id: 'coupon_001',
          code: 'WELCOME20',
          discountType: 'percentage',
          discountValue: 20,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          usageLimit: 100,
          currentUsage: 15,
          active: true,
          createdAt: new Date()
        },
        {
          id: 'coupon_002',
          code: 'SAVE50',
          discountType: 'fixed',
          discountValue: 50,
          expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          usageLimit: 50,
          currentUsage: 8,
          active: true,
          createdAt: new Date()
        }
      ]);
    } catch (error) {
      console.error('Failed to load discount data:', error);
      toast.error('Failed to load discount information');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || !subscription) return;

    try {
      const result = await subscriptionService.applyCoupon(subscription.id, couponCode);
      setAppliedCoupon(result);
      toast.success(`Coupon applied! You saved $${result.discountAmount.toFixed(2)}`);
      setCouponCode('');
      loadDiscountData();
    } catch (error) {
      toast.error(error.message || 'Failed to apply coupon');
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    
    try {
      const coupon = await subscriptionService.createCoupon(
        newCoupon.code,
        newCoupon.discountType,
        newCoupon.discountValue,
        newCoupon.expiryDate,
        newCoupon.usageLimit
      );
      
      setCoupons([...coupons, coupon]);
      setShowCreateModal(false);
      setNewCoupon({
        code: '',
        discountType: 'percentage',
        discountValue: 0,
        expiryDate: '',
        usageLimit: null
      });
      toast.success('Coupon created successfully!');
    } catch (error) {
      toast.error('Failed to create coupon');
    }
  };

  const copyCouponCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied!');
  };

  const getDiscountDisplay = (coupon) => {
    if (coupon.discountType === 'percentage') {
      return `${coupon.discountValue}% OFF`;
    } else {
      return `$${coupon.discountValue} OFF`;
    }
  };

  const getCouponStatus = (coupon) => {
    if (!coupon.active) return 'inactive';
    if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) return 'expired';
    if (coupon.usageLimit && coupon.currentUsage >= coupon.usageLimit) return 'used_up';
    return 'active';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'used_up': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discounts & Coupons</h1>
          <p className="text-gray-600">Manage and apply discount codes to your subscription</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} />
          <span>Create Coupon</span>
        </button>
      </motion.div>

      {/* Apply Coupon Section */}
      {subscription && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Apply Coupon Code</h2>
          
          {appliedCoupon && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <SafeIcon icon={FiCheck} className="text-green-600" />
                <span className="font-medium text-green-800">Coupon Applied Successfully!</span>
              </div>
              <div className="text-sm text-green-700">
                <p>Original Amount: ${appliedCoupon.originalAmount.toFixed(2)}</p>
                <p>Discount: -${appliedCoupon.discountAmount.toFixed(2)}</p>
                <p className="font-semibold">Final Amount: ${appliedCoupon.finalAmount.toFixed(2)}</p>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Apply
            </button>
          </div>
        </motion.div>
      )}

      {/* Available Coupons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Coupons</h2>
        
        {coupons.length === 0 ? (
          <div className="text-center py-8">
            <SafeIcon icon={FiTag} className="text-gray-300 text-4xl mx-auto mb-4" />
            <p className="text-gray-500">No coupons available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon) => {
              const status = getCouponStatus(coupon);
              const isActive = status === 'active';
              
              return (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className={`border-2 border-dashed rounded-xl p-6 relative ${
                    isActive ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  {/* Coupon Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon 
                        icon={coupon.discountType === 'percentage' ? FiPercent : FiDollarSign} 
                        className={`text-xl ${isActive ? 'text-blue-600' : 'text-gray-400'}`} 
                      />
                      <span className={`text-2xl font-bold ${
                        isActive ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {getDiscountDisplay(coupon)}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status)}`}>
                      {status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <code className="font-mono font-bold text-gray-900">{coupon.code}</code>
                      <button
                        onClick={() => copyCouponCode(coupon.code)}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <SafeIcon icon={FiCopy} />
                      </button>
                    </div>
                  </div>

                  {/* Coupon Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(coupon.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {coupon.usageLimit && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Usage:</span>
                        <span className="font-medium text-gray-900">
                          {coupon.currentUsage} / {coupon.usageLimit}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900 capitalize">
                        {coupon.discountType}
                      </span>
                    </div>
                  </div>

                  {/* Usage Progress */}
                  {coupon.usageLimit && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
                        <span>Usage Progress</span>
                        <span>{Math.round((coupon.currentUsage / coupon.usageLimit) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(coupon.currentUsage / coupon.usageLimit) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Apply Button */}
                  <button
                    onClick={() => {
                      setCouponCode(coupon.code);
                      if (subscription) {
                        handleApplyCoupon();
                      }
                    }}
                    disabled={!isActive || !subscription}
                    className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive && subscription
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isActive ? 'Apply Coupon' : 'Unavailable'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Create Coupon Modal */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Create New Coupon</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} />
                </button>
              </div>

              <form onSubmit={handleCreateCoupon} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                    placeholder="e.g., SAVE20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({...newCoupon, discountType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({...newCoupon, discountValue: parseFloat(e.target.value)})}
                    placeholder={newCoupon.discountType === 'percentage' ? '20' : '50'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={newCoupon.expiryDate}
                    onChange={(e) => setNewCoupon({...newCoupon, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usage Limit (optional)
                  </label>
                  <input
                    type="number"
                    value={newCoupon.usageLimit || ''}
                    onChange={(e) => setNewCoupon({...newCoupon, usageLimit: e.target.value ? parseInt(e.target.value) : null})}
                    placeholder="Leave empty for unlimited"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Create Coupon
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default DiscountManager;