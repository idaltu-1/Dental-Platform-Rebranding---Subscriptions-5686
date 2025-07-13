import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { rewardsService } from '../../services/RewardsService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const { 
  FiTrendingUp, FiAward, FiUsers, FiGift, FiTarget, FiCrown, FiShare2, 
  FiCalendar, FiActivity, FiShoppingBag, FiStar, FiTrophy, FiZap,
  FiCheck, FiLock, FiArrowRight, FiCopy, FiMail, FiExternalLink
} = FiIcons;

function RewardsDashboard() {
  const { user } = useAuth();
  const [rewards, setRewards] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [rewardItems, setRewardItems] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [referralEmail, setReferralEmail] = useState('');

  useEffect(() => {
    loadRewardsData();
  }, [user]);

  const loadRewardsData = async () => {
    try {
      setLoading(true);
      const [rewardsData, achievementsData, itemsData, tiersData] = await Promise.all([
        rewardsService.getUserRewards(user.id),
        rewardsService.getAchievements(),
        rewardsService.getRewardItems(),
        rewardsService.getRewardTiers()
      ]);

      setRewards(rewardsData);
      setAchievements(achievementsData);
      setRewardItems(itemsData);
      setTiers(tiersData);
    } catch (error) {
      console.error('Failed to load rewards data:', error);
      toast.error('Failed to load rewards information');
    } finally {
      setLoading(false);
    }
  };

  const handleRedeemReward = async (rewardId) => {
    try {
      const result = await rewardsService.redeemReward(user.id, rewardId);
      if (result.success) {
        toast.success(`Successfully redeemed ${result.reward.name}!`);
        loadRewardsData();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to redeem reward');
    }
  };

  const handleSendReferral = async (e) => {
    e.preventDefault();
    if (!referralEmail.trim()) return;

    try {
      await rewardsService.createReferral(user.id, referralEmail);
      toast.success('Referral sent successfully!');
      setReferralEmail('');
      loadRewardsData();
    } catch (error) {
      toast.error('Failed to send referral');
    }
  };

  const getCurrentTier = () => {
    return tiers.find(tier => tier.id === rewards?.tier);
  };

  const getNextTier = () => {
    const currentTierIndex = tiers.findIndex(tier => tier.id === rewards?.tier);
    return currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  };

  const getProgressToNextTier = () => {
    const nextTier = getNextTier();
    if (!nextTier || !rewards) return 100;
    
    const currentTier = getCurrentTier();
    const progress = ((rewards.totalPoints - currentTier.minPoints) / 
                     (nextTier.minPoints - currentTier.minPoints)) * 100;
    return Math.min(progress, 100);
  };

  const getUnlockedAchievements = () => {
    return achievements.filter(achievement => 
      rewards?.achievements.some(userAchievement => userAchievement.id === achievement.id)
    );
  };

  const getLockedAchievements = () => {
    return achievements.filter(achievement => 
      !rewards?.achievements.some(userAchievement => userAchievement.id === achievement.id)
    );
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/signup?ref=${user.id}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied!');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards & Achievements</h1>
          <p className="text-gray-600">Earn points, unlock achievements, and redeem rewards</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{rewards?.availablePoints || 0}</div>
            <div className="text-sm text-gray-600">Available Points</div>
          </div>
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: currentTier?.color }}
          >
            <SafeIcon icon={FiCrown} />
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">{rewards?.totalPoints || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Current Tier</p>
              <p className="text-2xl font-bold" style={{ color: currentTier?.color }}>
                {currentTier?.name}
              </p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: currentTier?.color }}
            >
              <SafeIcon icon={FiCrown} className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">{rewards?.achievements?.length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiAward} className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Referrals</p>
              <p className="text-2xl font-bold text-gray-900">{rewards?.referrals?.length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tier Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Tier Progress</h2>
          {nextTier ? (
            <div className="text-right">
              <div className="text-sm text-gray-600">Next: {nextTier.name}</div>
              <div className="text-sm font-medium text-gray-900">
                {nextTier.minPoints - rewards.totalPoints} points to go
              </div>
            </div>
          ) : (
            <div className="text-right">
              <div className="text-sm text-gray-600">Maximum tier reached!</div>
              <div className="text-sm font-medium text-gray-900">🎉 Congratulations!</div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium" style={{ color: currentTier?.color }}>
              {currentTier?.name}
            </span>
            {nextTier && (
              <span className="text-sm font-medium" style={{ color: nextTier.color }}>
                {nextTier.name}
              </span>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${getProgressToNextTier()}%`,
                backgroundColor: currentTier?.color 
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Current Benefits</h3>
            <ul className="space-y-1">
              {currentTier?.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiCheck} className="text-green-500 mr-2" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          {nextTier && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Next Tier Benefits</h3>
              <ul className="space-y-1">
                {nextTier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <SafeIcon icon={FiLock} className="text-gray-400 mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: FiTrendingUp },
          { id: 'achievements', label: 'Achievements', icon: FiAward },
          { id: 'rewards', label: 'Rewards Store', icon: FiShoppingBag },
          { id: 'referrals', label: 'Referrals', icon: FiShare2 }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-all flex items-center justify-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <SafeIcon icon={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {rewards?.pointsHistory?.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.points > 0 ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <SafeIcon 
                          icon={activity.points > 0 ? FiTrendingUp : FiShoppingBag} 
                          className={`text-sm ${activity.points > 0 ? 'text-green-600' : 'text-red-600'}`} 
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={`font-bold ${
                      activity.points > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {activity.points > 0 ? '+' : ''}{activity.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 text-left bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <SafeIcon icon={FiUsers} className="text-blue-600 text-xl mb-2" />
                  <div className="font-medium text-gray-900">Add Patient</div>
                  <div className="text-sm text-gray-600">Earn 50 points</div>
                </button>
                <button className="p-4 text-left bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <SafeIcon icon={FiShare2} className="text-green-600 text-xl mb-2" />
                  <div className="font-medium text-gray-900">Make Referral</div>
                  <div className="text-sm text-gray-600">Earn 100 points</div>
                </button>
                <button className="p-4 text-left bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <SafeIcon icon={FiActivity} className="text-purple-600 text-xl mb-2" />
                  <div className="font-medium text-gray-900">Use Feature</div>
                  <div className="text-sm text-gray-600">Earn 10 points</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Unlocked Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getUnlockedAchievements().map((achievement) => (
                  <div key={achievement.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <span className="text-green-600 font-bold">+{achievement.points}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement.name}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Locked Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getLockedAchievements().map((achievement) => (
                  <div key={achievement.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl filter grayscale">{achievement.icon}</span>
                      <span className="text-gray-400 font-bold">+{achievement.points}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement.name}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Rewards Store</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewardItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <span className="text-blue-600 font-bold">{item.cost} pts</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <button
                    onClick={() => handleRedeemReward(item.id)}
                    disabled={!rewards || rewards.availablePoints < item.cost}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      rewards && rewards.availablePoints >= item.cost
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {rewards && rewards.availablePoints >= item.cost ? 'Redeem' : 'Insufficient Points'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Invite Friends</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-blue-800 font-medium mb-2">Earn 2,000 points for each successful referral!</p>
                <p className="text-blue-700 text-sm">Your friends get a special bonus too when they sign up.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share your referral link:
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={`${window.location.origin}/signup?ref=${user.id}`}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <button
                      onClick={copyReferralLink}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiCopy} />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or send invitation by email:
                  </label>
                  <form onSubmit={handleSendReferral} className="flex space-x-2">
                    <input
                      type="email"
                      value={referralEmail}
                      onChange={(e) => setReferralEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiMail} />
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Referrals</h3>
              <div className="space-y-3">
                {rewards?.referrals?.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        referral.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        <SafeIcon 
                          icon={referral.status === 'completed' ? FiCheck : FiCalendar} 
                          className={`text-sm ${
                            referral.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                          }`} 
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{referral.email}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(referral.signupDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={`font-bold ${
                      referral.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {referral.status === 'completed' ? '+2,000' : 'Pending'}
                    </div>
                  </div>
                ))}
                {(!rewards?.referrals || rewards.referrals.length === 0) && (
                  <p className="text-center text-gray-500 py-8">No referrals yet. Start inviting friends to earn points!</p>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default RewardsDashboard;