import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { subscriptionService } from '../../services/SubscriptionService';
import { rewardsService } from '../../services/RewardsService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const { FiStar, FiGift, FiTrendingUp, FiCrown, FiZap, FiTarget, FiCheck } = FiIcons;

function SubscriptionRewardsIntegration() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIntegrationData();
  }, [user]);

  const loadIntegrationData = async () => {
    try {
      setLoading(true);
      const [subscriptionData, rewardsData, tiersData] = await Promise.all([
        subscriptionService.getSubscription(user.id),
        rewardsService.getUserRewards(user.id),
        rewardsService.getRewardTiers()
      ]);

      setSubscription(subscriptionData);
      setRewards(rewardsData);
      setTiers(tiersData);
    } catch (error) {
      console.error('Failed to load integration data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionAction = async (action) => {
    try {
      // Award points for subscription-related actions
      switch (action) {
        case 'payment':
          await rewardsService.addPoints(user.id, 'subscription_payment');
          toast.success('You earned 200 points for your subscription payment!');
          break;
        case 'upgrade':
          await rewardsService.addPoints(user.id, 'subscription_payment', 500);
          toast.success('You earned 500 bonus points for upgrading!');
          break;
        case 'feedback':
          await rewardsService.addPoints(user.id, 'feedback_submitted');
          toast.success('You earned 75 points for providing feedback!');
          break;
        default:
          break;
      }
      loadIntegrationData();
    } catch (error) {
      toast.error('Failed to award points');
    }
  };

  const getCurrentTier = () => {
    return tiers.find(tier => tier.id === rewards?.tier);
  };

  const getSubscriptionBenefits = () => {
    const currentTier = getCurrentTier();
    if (!currentTier) return [];

    // Map tier benefits to subscription perks
    const subscriptionPerks = [];
    
    if (currentTier.id === 'silver' || currentTier.id === 'gold' || currentTier.id === 'platinum' || currentTier.id === 'diamond') {
      subscriptionPerks.push('Priority customer support');
    }
    
    if (currentTier.id === 'gold' || currentTier.id === 'platinum' || currentTier.id === 'diamond') {
      subscriptionPerks.push('Extended trial periods for new features');
    }
    
    if (currentTier.id === 'platinum' || currentTier.id === 'diamond') {
      subscriptionPerks.push('Early access to beta features');
    }
    
    if (currentTier.id === 'diamond') {
      subscriptionPerks.push('Dedicated account manager');
      subscriptionPerks.push('Custom feature requests');
    }

    return subscriptionPerks;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const currentTier = getCurrentTier();
  const subscriptionBenefits = getSubscriptionBenefits();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg border border-purple-100 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: currentTier?.color || '#6B7280' }}
          >
            <SafeIcon icon={FiCrown} className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {currentTier?.name || 'Bronze'} Member Benefits
            </h3>
            <p className="text-sm text-gray-600">
              Exclusive perks for your subscription tier
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">
            {rewards?.totalPoints || 0}
          </div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>
      </div>

      {/* Tier Benefits for Subscription */}
      {subscriptionBenefits.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Your Subscription Benefits</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subscriptionBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Points Earning Opportunities */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Earn More Points</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => handleSubscriptionAction('payment')}
            className="p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors text-left"
          >
            <SafeIcon icon={FiStar} className="text-purple-600 mb-2" />
            <div className="font-medium text-gray-900">Monthly Payment</div>
            <div className="text-sm text-gray-600">+200 points</div>
          </button>

          <button
            onClick={() => handleSubscriptionAction('feedback')}
            className="p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors text-left"
          >
            <SafeIcon icon={FiGift} className="text-purple-600 mb-2" />
            <div className="font-medium text-gray-900">Share Feedback</div>
            <div className="text-sm text-gray-600">+75 points</div>
          </button>

          <button
            onClick={() => handleSubscriptionAction('upgrade')}
            className="p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors text-left"
          >
            <SafeIcon icon={FiTrendingUp} className="text-purple-600 mb-2" />
            <div className="font-medium text-gray-900">Upgrade Plan</div>
            <div className="text-sm text-gray-600">+500 points</div>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-200">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            {subscription ? Math.floor((new Date() - new Date(subscription.createdAt)) / (1000 * 60 * 60 * 24)) : 0}
          </div>
          <div className="text-xs text-gray-600">Days Subscribed</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            {rewards?.achievements?.length || 0}
          </div>
          <div className="text-xs text-gray-600">Achievements</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            {rewards?.rewardsRedeemed?.length || 0}
          </div>
          <div className="text-xs text-gray-600">Rewards Used</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-4 p-3 bg-purple-100 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-purple-900">
              💡 Tip: Complete your profile for bonus points!
            </p>
            <p className="text-sm text-purple-700">
              Earn 100 points by filling out your complete profile information.
            </p>
          </div>
          <button
            onClick={() => handleSubscriptionAction('profile')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Complete Profile
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SubscriptionRewardsIntegration;