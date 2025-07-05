class RewardsService {
  constructor() {
    this.userRewards = this.initializeMockRewards();
    this.rewardTiers = [
      { id: 'bronze', name: 'Bronze', minPoints: 0, maxPoints: 999, benefits: ['5% discount on upgrades'], color: '#CD7F32' },
      { id: 'silver', name: 'Silver', minPoints: 1000, maxPoints: 4999, benefits: ['10% discount on upgrades', 'Priority support'], color: '#C0C0C0' },
      { id: 'gold', name: 'Gold', minPoints: 5000, maxPoints: 9999, benefits: ['15% discount on upgrades', 'Priority support', 'Extended trial periods'], color: '#FFD700' },
      { id: 'platinum', name: 'Platinum', minPoints: 10000, maxPoints: 24999, benefits: ['20% discount on upgrades', 'VIP support', 'Early access to features'], color: '#E5E4E2' },
      { id: 'diamond', name: 'Diamond', minPoints: 25000, maxPoints: Infinity, benefits: ['25% discount on upgrades', 'Dedicated account manager', 'Custom features'], color: '#B9F2FF' }
    ];
    
    this.achievements = [
      { id: 'first_patient', name: 'First Patient', description: 'Add your first patient to the system', points: 100, icon: '👥', category: 'patients' },
      { id: 'patient_milestone_50', name: 'Patient Manager', description: 'Manage 50 patients', points: 500, icon: '👨‍⚕️', category: 'patients' },
      { id: 'patient_milestone_100', name: 'Practice Builder', description: 'Reach 100 patients', points: 1000, icon: '🏥', category: 'patients' },
      { id: 'first_referral', name: 'First Referral', description: 'Make your first patient referral', points: 200, icon: '🤝', category: 'referrals' },
      { id: 'referral_milestone_25', name: 'Referral Pro', description: 'Complete 25 referrals', points: 750, icon: '⭐', category: 'referrals' },
      { id: 'subscription_loyalty_6', name: 'Loyal Customer', description: 'Maintain subscription for 6 months', points: 1500, icon: '💎', category: 'subscription' },
      { id: 'subscription_loyalty_12', name: 'Committed Partner', description: 'Maintain subscription for 12 months', points: 3000, icon: '🏆', category: 'subscription' },
      { id: 'feature_explorer', name: 'Feature Explorer', description: 'Use 10 different features', points: 500, icon: '🔍', category: 'engagement' },
      { id: 'power_user', name: 'Power User', description: 'Complete 100 actions in a month', points: 800, icon: '⚡', category: 'engagement' },
      { id: 'referrer_bronze', name: 'Referrer Bronze', description: 'Refer 1 new customer', points: 2000, icon: '🥉', category: 'referrals' },
      { id: 'referrer_silver', name: 'Referrer Silver', description: 'Refer 3 new customers', points: 5000, icon: '🥈', category: 'referrals' },
      { id: 'referrer_gold', name: 'Referrer Gold', description: 'Refer 5 new customers', points: 10000, icon: '🥇', category: 'referrals' }
    ];

    this.pointsActions = {
      'patient_added': 50,
      'appointment_scheduled': 25,
      'referral_made': 100,
      'subscription_payment': 200,
      'feature_used': 10,
      'login_streak_7': 150,
      'login_streak_30': 500,
      'profile_completed': 100,
      'feedback_submitted': 75,
      'review_given': 200
    };

    this.rewardItems = [
      { id: 'discount_10', name: '10% Subscription Discount', description: 'Get 10% off your next subscription payment', cost: 1000, type: 'discount', value: 10, category: 'subscription' },
      { id: 'discount_20', name: '20% Subscription Discount', description: 'Get 20% off your next subscription payment', cost: 2500, type: 'discount', value: 20, category: 'subscription' },
      { id: 'free_month', name: 'Free Month', description: 'Get one month free subscription', cost: 5000, type: 'subscription', value: 1, category: 'subscription' },
      { id: 'priority_support', name: 'Priority Support (30 days)', description: 'Get priority support for 30 days', cost: 1500, type: 'support', value: 30, category: 'support' },
      { id: 'custom_training', name: 'Custom Training Session', description: 'Get a personalized training session', cost: 3000, type: 'training', value: 1, category: 'training' },
      { id: 'early_access', name: 'Early Access Pass', description: 'Get early access to new features', cost: 2000, type: 'access', value: 1, category: 'features' },
      { id: 'data_export', name: 'Premium Data Export', description: 'Advanced data export capabilities', cost: 800, type: 'feature', value: 1, category: 'features' },
      { id: 'storage_upgrade', name: 'Storage Upgrade (10GB)', description: 'Get additional 10GB storage', cost: 1200, type: 'storage', value: 10, category: 'storage' }
    ];
  }

  initializeMockRewards() {
    return [
      {
        userId: 'super-admin-001',
        totalPoints: 12500,
        availablePoints: 8500,
        tier: 'gold',
        achievements: [
          { id: 'first_patient', unlockedAt: new Date('2024-01-15'), points: 100 },
          { id: 'patient_milestone_50', unlockedAt: new Date('2024-02-01'), points: 500 },
          { id: 'patient_milestone_100', unlockedAt: new Date('2024-02-15'), points: 1000 },
          { id: 'first_referral', unlockedAt: new Date('2024-01-20'), points: 200 },
          { id: 'referral_milestone_25', unlockedAt: new Date('2024-02-10'), points: 750 },
          { id: 'subscription_loyalty_6', unlockedAt: new Date('2024-06-01'), points: 1500 },
          { id: 'feature_explorer', unlockedAt: new Date('2024-01-25'), points: 500 },
          { id: 'power_user', unlockedAt: new Date('2024-02-05'), points: 800 },
          { id: 'referrer_bronze', unlockedAt: new Date('2024-02-20'), points: 2000 },
          { id: 'referrer_silver', unlockedAt: new Date('2024-03-01'), points: 5000 }
        ],
        pointsHistory: [
          { date: new Date('2024-01-15'), action: 'first_patient', points: 100, description: 'Added first patient' },
          { date: new Date('2024-01-20'), action: 'first_referral', points: 200, description: 'Made first referral' },
          { date: new Date('2024-02-01'), action: 'patient_milestone_50', points: 500, description: 'Reached 50 patients' },
          { date: new Date('2024-02-15'), action: 'patient_milestone_100', points: 1000, description: 'Reached 100 patients' }
        ],
        rewardsRedeemed: [
          { id: 'discount_10', redeemedAt: new Date('2024-01-30'), pointsSpent: 1000 },
          { id: 'priority_support', redeemedAt: new Date('2024-02-25'), pointsSpent: 1500 },
          { id: 'data_export', redeemedAt: new Date('2024-03-05'), pointsSpent: 800 },
          { id: 'storage_upgrade', redeemedAt: new Date('2024-03-10'), pointsSpent: 1200 }
        ],
        referrals: [
          { id: 'ref_001', email: 'user1@example.com', status: 'completed', signupDate: new Date('2024-02-20'), pointsEarned: 2000 },
          { id: 'ref_002', email: 'user2@example.com', status: 'completed', signupDate: new Date('2024-02-25'), pointsEarned: 2000 },
          { id: 'ref_003', email: 'user3@example.com', status: 'completed', signupDate: new Date('2024-03-01'), pointsEarned: 2000 },
          { id: 'ref_004', email: 'user4@example.com', status: 'pending', signupDate: new Date('2024-03-15'), pointsEarned: 0 }
        ],
        streaks: {
          currentLoginStreak: 15,
          longestLoginStreak: 30,
          lastLoginDate: new Date(),
          currentActivityStreak: 8,
          longestActivityStreak: 25
        }
      }
    ];
  }

  async simulateDelay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getUserRewards(userId) {
    await this.simulateDelay(800);
    return this.userRewards.find(reward => reward.userId === userId) || this.createNewUserReward(userId);
  }

  createNewUserReward(userId) {
    const newReward = {
      userId,
      totalPoints: 0,
      availablePoints: 0,
      tier: 'bronze',
      achievements: [],
      pointsHistory: [],
      rewardsRedeemed: [],
      referrals: [],
      streaks: {
        currentLoginStreak: 0,
        longestLoginStreak: 0,
        lastLoginDate: null,
        currentActivityStreak: 0,
        longestActivityStreak: 0
      }
    };
    this.userRewards.push(newReward);
    return newReward;
  }

  async addPoints(userId, action, customPoints = null) {
    await this.simulateDelay(500);
    const userReward = await this.getUserRewards(userId);
    const points = customPoints || this.pointsActions[action] || 0;
    
    userReward.totalPoints += points;
    userReward.availablePoints += points;
    
    userReward.pointsHistory.unshift({
      date: new Date(),
      action,
      points,
      description: this.getActionDescription(action)
    });

    // Update tier based on new points
    userReward.tier = this.calculateTier(userReward.totalPoints);
    
    // Check for new achievements
    await this.checkAchievements(userId, action);
    
    return userReward;
  }

  getActionDescription(action) {
    const descriptions = {
      'patient_added': 'Added a new patient',
      'appointment_scheduled': 'Scheduled an appointment',
      'referral_made': 'Made a referral',
      'subscription_payment': 'Subscription payment processed',
      'feature_used': 'Used a platform feature',
      'login_streak_7': 'Maintained 7-day login streak',
      'login_streak_30': 'Maintained 30-day login streak',
      'profile_completed': 'Completed profile setup',
      'feedback_submitted': 'Submitted feedback',
      'review_given': 'Gave a review'
    };
    return descriptions[action] || 'Earned points';
  }

  calculateTier(totalPoints) {
    for (let i = this.rewardTiers.length - 1; i >= 0; i--) {
      if (totalPoints >= this.rewardTiers[i].minPoints) {
        return this.rewardTiers[i].id;
      }
    }
    return 'bronze';
  }

  async checkAchievements(userId, action) {
    const userReward = await this.getUserRewards(userId);
    const newAchievements = [];
    
    // Check for achievements based on action
    for (const achievement of this.achievements) {
      const alreadyUnlocked = userReward.achievements.some(a => a.id === achievement.id);
      if (!alreadyUnlocked && this.shouldUnlockAchievement(achievement, action, userReward)) {
        const unlockedAchievement = {
          id: achievement.id,
          unlockedAt: new Date(),
          points: achievement.points
        };
        
        userReward.achievements.push(unlockedAchievement);
        userReward.totalPoints += achievement.points;
        userReward.availablePoints += achievement.points;
        
        userReward.pointsHistory.unshift({
          date: new Date(),
          action: `achievement_${achievement.id}`,
          points: achievement.points,
          description: `Unlocked achievement: ${achievement.name}`
        });
        
        newAchievements.push(achievement);
      }
    }
    
    return newAchievements;
  }

  shouldUnlockAchievement(achievement, action, userReward) {
    switch (achievement.id) {
      case 'first_patient':
        return action === 'patient_added' && userReward.pointsHistory.filter(p => p.action === 'patient_added').length >= 1;
      case 'patient_milestone_50':
        return action === 'patient_added' && userReward.pointsHistory.filter(p => p.action === 'patient_added').length >= 50;
      case 'patient_milestone_100':
        return action === 'patient_added' && userReward.pointsHistory.filter(p => p.action === 'patient_added').length >= 100;
      case 'first_referral':
        return action === 'referral_made' && userReward.pointsHistory.filter(p => p.action === 'referral_made').length >= 1;
      case 'referral_milestone_25':
        return action === 'referral_made' && userReward.pointsHistory.filter(p => p.action === 'referral_made').length >= 25;
      case 'feature_explorer':
        return action === 'feature_used' && userReward.pointsHistory.filter(p => p.action === 'feature_used').length >= 10;
      case 'power_user':
        return this.getMonthlyActionCount(userReward) >= 100;
      case 'referrer_bronze':
        return userReward.referrals.filter(r => r.status === 'completed').length >= 1;
      case 'referrer_silver':
        return userReward.referrals.filter(r => r.status === 'completed').length >= 3;
      case 'referrer_gold':
        return userReward.referrals.filter(r => r.status === 'completed').length >= 5;
      default:
        return false;
    }
  }

  getMonthlyActionCount(userReward) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return userReward.pointsHistory.filter(p => p.date >= oneMonthAgo).length;
  }

  async redeemReward(userId, rewardId) {
    await this.simulateDelay(1000);
    const userReward = await this.getUserRewards(userId);
    const rewardItem = this.rewardItems.find(item => item.id === rewardId);
    
    if (!rewardItem) {
      throw new Error('Reward not found');
    }
    
    if (userReward.availablePoints < rewardItem.cost) {
      throw new Error('Insufficient points');
    }
    
    userReward.availablePoints -= rewardItem.cost;
    userReward.rewardsRedeemed.push({
      id: rewardId,
      redeemedAt: new Date(),
      pointsSpent: rewardItem.cost
    });
    
    userReward.pointsHistory.unshift({
      date: new Date(),
      action: 'reward_redeemed',
      points: -rewardItem.cost,
      description: `Redeemed: ${rewardItem.name}`
    });
    
    return { success: true, reward: rewardItem };
  }

  async createReferral(userId, email) {
    await this.simulateDelay(500);
    const userReward = await this.getUserRewards(userId);
    
    const referral = {
      id: `ref_${Date.now()}`,
      email,
      status: 'pending',
      signupDate: new Date(),
      pointsEarned: 0
    };
    
    userReward.referrals.push(referral);
    return referral;
  }

  async completeReferral(userId, referralId) {
    await this.simulateDelay(800);
    const userReward = await this.getUserRewards(userId);
    const referral = userReward.referrals.find(r => r.id === referralId);
    
    if (!referral) {
      throw new Error('Referral not found');
    }
    
    referral.status = 'completed';
    referral.pointsEarned = 2000;
    
    userReward.totalPoints += 2000;
    userReward.availablePoints += 2000;
    
    userReward.pointsHistory.unshift({
      date: new Date(),
      action: 'referral_completed',
      points: 2000,
      description: `Referral completed: ${referral.email}`
    });
    
    // Update tier
    userReward.tier = this.calculateTier(userReward.totalPoints);
    
    // Check for referral achievements
    await this.checkAchievements(userId, 'referral_completed');
    
    return referral;
  }

  async getRewardItems() {
    await this.simulateDelay(300);
    return this.rewardItems;
  }

  async getAchievements() {
    await this.simulateDelay(300);
    return this.achievements;
  }

  async getRewardTiers() {
    await this.simulateDelay(300);
    return this.rewardTiers;
  }

  async getLeaderboard(limit = 10) {
    await this.simulateDelay(600);
    return this.userRewards
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit)
      .map(reward => ({
        userId: reward.userId,
        totalPoints: reward.totalPoints,
        tier: reward.tier,
        achievementCount: reward.achievements.length
      }));
  }

  async updateLoginStreak(userId) {
    await this.simulateDelay(300);
    const userReward = await this.getUserRewards(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastLogin = userReward.streaks.lastLoginDate ? new Date(userReward.streaks.lastLoginDate) : null;
    if (lastLogin) {
      lastLogin.setHours(0, 0, 0, 0);
    }
    
    if (!lastLogin || lastLogin.getTime() !== today.getTime()) {
      // Check if it's consecutive
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastLogin && lastLogin.getTime() === yesterday.getTime()) {
        userReward.streaks.currentLoginStreak++;
      } else if (!lastLogin || lastLogin.getTime() < yesterday.getTime()) {
        userReward.streaks.currentLoginStreak = 1;
      }
      
      userReward.streaks.lastLoginDate = today;
      userReward.streaks.longestLoginStreak = Math.max(
        userReward.streaks.longestLoginStreak,
        userReward.streaks.currentLoginStreak
      );
      
      // Award streak bonuses
      if (userReward.streaks.currentLoginStreak === 7) {
        await this.addPoints(userId, 'login_streak_7');
      } else if (userReward.streaks.currentLoginStreak === 30) {
        await this.addPoints(userId, 'login_streak_30');
      }
    }
    
    return userReward.streaks;
  }

  async getRewardsAnalytics() {
    await this.simulateDelay(800);
    
    const totalUsers = this.userRewards.length;
    const totalPointsDistributed = this.userRewards.reduce((sum, reward) => sum + reward.totalPoints, 0);
    const totalRewardsRedeemed = this.userRewards.reduce((sum, reward) => sum + reward.rewardsRedeemed.length, 0);
    
    const tierDistribution = this.rewardTiers.map(tier => ({
      tier: tier.name,
      count: this.userRewards.filter(reward => reward.tier === tier.id).length,
      percentage: (this.userRewards.filter(reward => reward.tier === tier.id).length / totalUsers) * 100
    }));
    
    const popularRewards = this.rewardItems.map(item => ({
      ...item,
      redemptionCount: this.userRewards.reduce((sum, reward) => 
        sum + reward.rewardsRedeemed.filter(r => r.id === item.id).length, 0
      )
    })).sort((a, b) => b.redemptionCount - a.redemptionCount);
    
    return {
      totalUsers,
      totalPointsDistributed,
      totalRewardsRedeemed,
      tierDistribution,
      popularRewards
    };
  }
}

export const rewardsService = new RewardsService();