import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { subscriptionService } from '../../services/SubscriptionService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import PlanCard from './PlanCard';
import UsageMetrics from './UsageMetrics';
import BillingHistory from './BillingHistory';
import PlanUpgradeModal from './PlanUpgradeModal';

const { FiCreditCard, FiTrendingUp, FiCalendar, FiSettings, FiDownload, FiAlertCircle, FiCheck, FiX } = FiIcons;

function SubscriptionDashboard() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [usage, setUsage] = useState(null);
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    loadSubscriptionData();
  }, [user]);

  const loadSubscriptionData = async () => {
    try {
      setLoading(true);
      const [subData, plansData] = await Promise.all([
        subscriptionService.getSubscription(user.id),
        subscriptionService.getPlans()
      ]);

      setSubscription(subData);
      setPlans(plansData);

      if (subData) {
        const [usageData, billingData] = await Promise.all([
          subscriptionService.getUsageMetrics(subData.id),
          subscriptionService.getBillingHistory(subData.id)
        ]);
        setUsage(usageData);
        setBillingHistory(billingData);
      }
    } catch (error) {
      console.error('Failed to load subscription data:', error);
      toast.error('Failed to load subscription information');
    } finally {
      setLoading(false);
    }
  };

  const handlePlanUpgrade = (plan) => {
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;

    const confirmed = window.confirm(
      'Are you sure you want to cancel your subscription? It will remain active until the end of your current billing period.'
    );

    if (confirmed) {
      try {
        await subscriptionService.cancelSubscription(subscription.id, true);
        toast.success('Subscription will be canceled at the end of your billing period');
        loadSubscriptionData();
      } catch (error) {
        toast.error('Failed to cancel subscription');
      }
    }
  };

  const handleReactivateSubscription = async () => {
    if (!subscription) return;

    try {
      await subscriptionService.reactivateSubscription(subscription.id);
      toast.success('Subscription reactivated successfully');
      loadSubscriptionData();
    } catch (error) {
      toast.error('Failed to reactivate subscription');
    }
  };

  const getCurrentPlan = () => {
    if (!subscription) return null;
    return plans.find(plan => plan.id === subscription.planId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'canceled': return 'text-red-600 bg-red-100';
      case 'past_due': return 'text-orange-600 bg-orange-100';
      case 'trialing': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
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
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  const currentPlan = getCurrentPlan();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
          <p className="text-gray-600">Manage your subscription, billing, and usage</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <SafeIcon icon={FiDownload} />
            <span>Download Invoice</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <SafeIcon icon={FiSettings} />
            <span>Billing Settings</span>
          </button>
        </div>
      </motion.div>

      {/* Current Subscription Status */}
      {subscription && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Current Subscription</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{currentPlan?.displayName}</div>
              <div className="text-gray-600">Current Plan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">${subscription.amount}</div>
              <div className="text-gray-600">per {subscription.interval}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </div>
              <div className="text-gray-600">Next billing date</div>
            </div>
            <div className="text-center">
              {subscription.cancelAtPeriodEnd ? (
                <div>
                  <div className="text-2xl font-bold text-red-600">Canceling</div>
                  <div className="text-gray-600">At period end</div>
                  <button
                    onClick={handleReactivateSubscription}
                    className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Reactivate
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-green-600">Active</div>
                  <div className="text-gray-600">Auto-renewing</div>
                  <button
                    onClick={handleCancelSubscription}
                    className="mt-2 text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {subscription.cancelAtPeriodEnd && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center">
                <SafeIcon icon={FiAlertCircle} className="text-orange-600 mr-2" />
                <span className="text-orange-800">
                  {`Your subscription will be canceled on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}. You'll continue to have access until then.`}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Usage Metrics */}
      {usage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <UsageMetrics usage={usage} />
        </motion.div>
      )}

      {/* Available Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={subscription?.planId === plan.id}
              onUpgrade={() => handlePlanUpgrade(plan)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>

      {/* Billing History */}
      {billingHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <BillingHistory history={billingHistory} />
        </motion.div>
      )}

      {/* Plan Upgrade Modal */}
      {showUpgradeModal && selectedPlan && (
        <PlanUpgradeModal
          currentPlan={currentPlan}
          selectedPlan={selectedPlan}
          subscription={subscription}
          onClose={() => setShowUpgradeModal(false)}
          onConfirm={loadSubscriptionData}
        />
      )}
    </div>
  );
}

export default SubscriptionDashboard;