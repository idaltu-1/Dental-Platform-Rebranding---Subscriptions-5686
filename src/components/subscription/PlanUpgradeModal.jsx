import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { subscriptionService } from '../../services/SubscriptionService';
import toast from 'react-hot-toast';

const { FiX, FiCheck, FiArrowRight, FiCreditCard, FiAlertCircle } = FiIcons;

function PlanUpgradeModal({ currentPlan, selectedPlan, subscription, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);
  const [confirmUpgrade, setConfirmUpgrade] = useState(false);

  const isUpgrade = subscriptionService.isPlanUpgrade(currentPlan?.id, selectedPlan?.id);
  const isDowngrade = subscriptionService.isPlanDowngrade(currentPlan?.id, selectedPlan?.id);

  const handleUpgrade = async () => {
    if (!confirmUpgrade) {
      setConfirmUpgrade(true);
      return;
    }

    setLoading(true);
    try {
      await subscriptionService.updateSubscription(subscription.id, selectedPlan.id);
      toast.success(`Successfully ${isUpgrade ? 'upgraded' : 'changed'} to ${selectedPlan.displayName} plan`);
      onConfirm();
      onClose();
    } catch (error) {
      toast.error('Failed to update subscription');
      console.error('Upgrade error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateProration = () => {
    if (!currentPlan || !selectedPlan || !subscription) return null;

    const now = new Date();
    const periodEnd = new Date(subscription.currentPeriodEnd);
    const daysRemaining = Math.ceil((periodEnd - now) / (1000 * 60 * 60 * 24));
    
    return subscriptionService.calculateProration(currentPlan, selectedPlan, daysRemaining);
  };

  const proration = calculateProration();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            {isUpgrade ? 'Upgrade' : isDowngrade ? 'Downgrade' : 'Change'} Plan
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiX} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Plan Comparison */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Current Plan</p>
                <p className="text-lg font-semibold text-gray-900">{currentPlan?.displayName}</p>
                <p className="text-sm text-gray-600">${currentPlan?.amount}/{currentPlan?.interval}</p>
              </div>
              
              <SafeIcon icon={FiArrowRight} className="text-gray-400 mx-4" />
              
              <div className="text-center">
                <p className="text-sm text-gray-600">New Plan</p>
                <p className="text-lg font-semibold text-blue-600">{selectedPlan?.displayName}</p>
                <p className="text-sm text-gray-600">${selectedPlan?.amount}/{selectedPlan?.interval}</p>
              </div>
            </div>
          </div>

          {/* Proration Details */}
          {proration && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Billing Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Prorated credit:</span>
                  <span className="text-green-600">-${proration.credit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>New plan charge:</span>
                  <span>${proration.charge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>
                    {proration.difference > 0 ? 'Amount due today:' : 'Credit applied:'}
                  </span>
                  <span className={proration.difference > 0 ? 'text-red-600' : 'text-green-600'}>
                    {proration.difference > 0 ? '+' : ''}${Math.abs(proration.difference).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Feature Comparison */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">{"What you'll get:"}</h4>
            <div className="space-y-2">
              {selectedPlan?.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
              {selectedPlan?.features.length > 4 && (
                <p className="text-sm text-gray-600 ml-6">
                  +{selectedPlan.features.length - 4} more features
                </p>
              )}
            </div>
          </div>

          {/* Warning for downgrades */}
          {isDowngrade && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start">
                <SafeIcon icon={FiAlertCircle} className="text-orange-600 mr-2 mt-0.5" />
                <div className="text-sm">
                  <p className="text-orange-800 font-medium">Downgrade Notice</p>
                  <p className="text-orange-700">
                    Some features may be limited or unavailable after downgrading.
                    Your data will be preserved but access may be restricted.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation */}
          {!confirmUpgrade ? (
            <div className="space-y-3">
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isUpgrade
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg'
                }`}
              >
                <SafeIcon icon={FiCreditCard} />
                <span>
                  {isUpgrade ? 'Upgrade' : isDowngrade ? 'Downgrade' : 'Change'} to {selectedPlan?.displayName}
                </span>
              </button>
              
              <button
                onClick={onClose}
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm font-medium">
                  Are you sure you want to {isUpgrade ? 'upgrade' : isDowngrade ? 'downgrade' : 'change'} your plan?
                </p>
                <p className="text-red-700 text-sm mt-1">
                  This action will take effect immediately.
                </p>
              </div>
              
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-3 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Confirm Change'
                )}
              </button>
              
              <button
                onClick={() => setConfirmUpgrade(false)}
                disabled={loading}
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PlanUpgradeModal;