import React from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {FiUsers, FiShare2, FiDatabase, FiUser, FiAlertTriangle, FiTrendingUp, FiArrowUp, FiArrowDown, FiInfo} = FiIcons;

function UsageMetrics({usage}) {
  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getUsageTextColor = (percentage) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getUsageStatus = (percentage) => {
    if (percentage >= 90) return { status: 'critical', message: 'Usage Critical' };
    if (percentage >= 75) return { status: 'warning', message: 'Approaching Limit' };
    return { status: 'good', message: 'Within Limits' };
  };

  const formatStorageSize = (sizeStr) => {
    if (!sizeStr) return '0 GB';
    const match = sizeStr.match(/(\d+(?:\.\d+)?)\s*([KMGT]?B)/i);
    if (!match) return sizeStr;
    
    const [, size, unit] = match;
    return `${parseFloat(size).toFixed(1)} ${unit.toUpperCase()}`;
  };

  const calculateStoragePercentage = (current, limit) => {
    if (!current || !limit) return 0;
    
    const parseSize = (str) => {
      const match = str.match(/(\d+(?:\.\d+)?)\s*([KMGT]?B)/i);
      if (!match) return 0;
      
      const [, size, unit] = match;
      const multipliers = { B: 1, KB: 1024, MB: 1024**2, GB: 1024**3, TB: 1024**4 };
      return parseFloat(size) * (multipliers[unit.toUpperCase()] || 1);
    };
    
    const currentBytes = parseSize(current);
    const limitBytes = parseSize(limit);
    
    return limitBytes > 0 ? (currentBytes / limitBytes) * 100 : 0;
  };

  const metrics = [
    {
      key: 'patients',
      label: 'Patients',
      icon: FiUsers,
      current: usage.current.patients,
      limit: usage.limits.patients,
      percentage: usage.percentages.patients,
      trend: '+12%',
      trendDirection: 'up'
    },
    {
      key: 'referrals',
      label: 'Referrals',
      icon: FiShare2,
      current: usage.current.referrals,
      limit: usage.limits.referrals,
      percentage: usage.percentages.referrals,
      trend: '+8%',
      trendDirection: 'up'
    },
    {
      key: 'users',
      label: 'Users',
      icon: FiUser,
      current: usage.current.users,
      limit: usage.limits.users,
      percentage: usage.percentages.users,
      trend: '+2%',
      trendDirection: 'up'
    },
    {
      key: 'storage',
      label: 'Storage',
      icon: FiDatabase,
      current: usage.current.storage,
      limit: usage.limits.storage,
      percentage: calculateStoragePercentage(usage.current.storage, usage.limits.storage),
      trend: '+15%',
      trendDirection: 'up'
    }
  ];

  const getRecommendation = (metric) => {
    const { percentage, key } = metric;
    
    if (percentage >= 90) {
      return {
        type: 'upgrade',
        message: `Consider upgrading your plan to avoid service interruption`,
        action: 'Upgrade Plan'
      };
    }
    
    if (percentage >= 75) {
      return {
        type: 'warning',
        message: `You're approaching your ${key} limit`,
        action: 'Monitor Usage'
      };
    }
    
    return null;
  };

  const overallHealthScore = () => {
    const avgPercentage = metrics
      .filter(m => m.limit !== -1)
      .reduce((sum, m) => sum + m.percentage, 0) / metrics.filter(m => m.limit !== -1).length;
    
    if (avgPercentage >= 80) return { score: 'Critical', color: 'text-red-600', bg: 'bg-red-50' };
    if (avgPercentage >= 60) return { score: 'Warning', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { score: 'Healthy', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const healthScore = overallHealthScore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
    >
      {/* Header with Health Score */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Usage Metrics</h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${healthScore.color} ${healthScore.bg}`}>
          <SafeIcon icon={FiTrendingUp} className="inline mr-1" />
          {healthScore.score}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const status = getUsageStatus(metric.percentage);
          const recommendation = getRecommendation(metric);
          
          return (
            <motion.div
              key={metric.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4 relative"
            >
              {/* Metric Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <SafeIcon icon={metric.icon} className="text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">{metric.label}</span>
                </div>
                
                {/* Trend Indicator */}
                <div className={`flex items-center text-xs font-medium ${
                  metric.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <SafeIcon 
                    icon={metric.trendDirection === 'up' ? FiArrowUp : FiArrowDown} 
                    className="mr-1" 
                  />
                  {metric.trend}
                </div>
              </div>

              {/* Usage Numbers */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {metric.key === 'storage' 
                      ? formatStorageSize(metric.current)
                      : metric.current
                    } {metric.limit === -1 ? '' : `of ${
                      metric.key === 'storage' 
                        ? formatStorageSize(metric.limit)
                        : metric.limit
                    }`}
                  </span>
                  {metric.limit !== -1 && (
                    <span className={`font-medium ${getUsageTextColor(metric.percentage)}`}>
                      {Math.round(metric.percentage)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {metric.limit !== -1 ? (
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, metric.percentage)}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(metric.percentage)}`}
                    />
                  </div>
                  
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-medium ${getUsageTextColor(metric.percentage)}`}>
                      {status.message}
                    </span>
                    {metric.percentage >= 75 && (
                      <SafeIcon icon={FiAlertTriangle} className={getUsageTextColor(metric.percentage)} />
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-3">
                  <div className="text-sm text-green-600 font-medium flex items-center">
                    <SafeIcon icon={FiInfo} className="mr-1" />
                    Unlimited
                  </div>
                </div>
              )}

              {/* Recommendation */}
              {recommendation && (
                <div className={`text-xs p-2 rounded ${
                  recommendation.type === 'upgrade' 
                    ? 'bg-red-50 text-red-700 border border-red-200' 
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                }`}>
                  <div className="font-medium">{recommendation.action}</div>
                  <div>{recommendation.message}</div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Usage Breakdown Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Breakdown</h3>
        <div className="space-y-3">
          {metrics.filter(m => m.limit !== -1).map((metric, index) => (
            <div key={metric.key} className="flex items-center">
              <div className="w-24 text-sm text-gray-600 capitalize">{metric.label}</div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, metric.percentage)}%` }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                    className={`h-2 rounded-full ${getUsageColor(metric.percentage)}`}
                  />
                </div>
              </div>
              <div className="w-16 text-sm text-right">
                <span className={`font-medium ${getUsageTextColor(metric.percentage)}`}>
                  {Math.round(metric.percentage)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="p-4 bg-blue-50 rounded-lg"
      >
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
          <SafeIcon icon={FiInfo} className="mr-2" />
          Usage Tips
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Monitor your usage regularly to optimize your plan</li>
          <li>• Upgrade before reaching limits to avoid service interruption</li>
          <li>• Archive old data to free up storage space</li>
          <li>• Contact support for custom enterprise solutions</li>
        </ul>
      </motion.div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
          <SafeIcon icon={FiTrendingUp} className="mr-2" />
          View Detailed Analytics
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
          <SafeIcon icon={FiUsers} className="mr-2" />
          Manage Plan
        </button>
      </div>
    </motion.div>
  );
}

export default UsageMetrics;