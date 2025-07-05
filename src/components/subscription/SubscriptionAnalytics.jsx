import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import { subscriptionService } from '../../services/SubscriptionService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const { 
  FiTrendingUp, FiTrendingDown, FiDollarSign, FiUsers, FiActivity, FiTarget,
  FiAlertTriangle, FiCheckCircle, FiInfo, FiPieChart, FiBarChart3, FiSettings
} = FiIcons;

function SubscriptionAnalytics() {
  const { user } = useAuth();
  const [insights, setInsights] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    loadAnalyticsData();
  }, [user]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const subscriptionData = await subscriptionService.getSubscription(user.id);
      
      if (subscriptionData) {
        const [insightsData, alertsData] = await Promise.all([
          subscriptionService.getSubscriptionInsights(subscriptionData.id),
          subscriptionService.checkUsageLimits(subscriptionData.id)
        ]);
        
        setSubscription(subscriptionData);
        setInsights(insightsData);
        setAlerts(alertsData);
      }
    } catch (error) {
      console.error('Failed to load analytics data:', error);
      toast.error('Failed to load subscription analytics');
    } finally {
      setLoading(false);
    }
  };

  const getUsageChartOption = () => {
    if (!insights) return {};
    
    const { usageTrends } = insights;
    const metrics = Object.keys(usageTrends);
    
    return {
      title: {
        text: 'Usage Trends',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: metrics.map(metric => metric.charAt(0).toUpperCase() + metric.slice(1)),
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Month 1', 'Month 2', 'Month 3', 'Current'],
        axisPointer: {
          type: 'shadow'
        }
      },
      yAxis: {
        type: 'value'
      },
      series: metrics.map((metric, index) => ({
        name: metric.charAt(0).toUpperCase() + metric.slice(1),
        type: 'line',
        data: usageTrends[metric].historical,
        smooth: true,
        lineStyle: {
          width: 3
        },
        itemStyle: {
          borderRadius: 5
        }
      }))
    };
  };

  const getValueMetricsChartOption = () => {
    if (!insights) return {};
    
    const { valueMetrics } = insights;
    
    return {
      title: {
        text: 'Value Metrics',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: ${c}'
      },
      series: [
        {
          name: 'Cost Analysis',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: valueMetrics.costPerPatient, name: 'Cost per Patient' },
            { value: valueMetrics.costPerReferral, name: 'Cost per Referral' },
            { value: valueMetrics.averageMonthlySpend, name: 'Avg Monthly Spend' }
          ]
        }
      ]
    };
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return FiAlertTriangle;
      case 'warning': return FiInfo;
      case 'info': return FiCheckCircle;
      default: return FiInfo;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return FiTrendingUp;
      case 'decreasing': return FiTrendingDown;
      default: return FiActivity;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing': return 'text-green-600';
      case 'decreasing': return 'text-red-600';
      default: return 'text-gray-600';
    }
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

  if (!subscription) {
    return (
      <div className="max-w-7xl mx-auto text-center py-12">
        <SafeIcon icon={FiTarget} className="text-gray-300 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Active Subscription</h2>
        <p className="text-gray-600">You need an active subscription to view analytics.</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Analytics</h1>
          <p className="text-gray-600">Detailed insights into your subscription usage and value</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <SafeIcon icon={FiSettings} />
          <span>Customize Dashboard</span>
        </button>
      </motion.div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Usage Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={getAlertIcon(alert.type)} className="text-xl" />
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm opacity-75">
                      {alert.usage} / {alert.limit} {alert.metric}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                ${insights?.valueMetrics.totalSpent.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {insights?.valueMetrics.subscriptionAge} days active
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiDollarSign} className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Cost per Patient</p>
              <p className="text-2xl font-bold text-gray-900">
                ${insights?.valueMetrics.costPerPatient.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Per patient managed</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Monthly Average</p>
              <p className="text-2xl font-bold text-gray-900">
                ${insights?.valueMetrics.averageMonthlySpend.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Average monthly spend</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiBarChart3} className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Cost per Referral</p>
              <p className="text-2xl font-bold text-gray-900">
                ${insights?.valueMetrics.costPerReferral.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Per referral made</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTarget} className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Usage Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Usage Trends</h3>
          <div className="space-y-4">
            {insights && Object.entries(insights.usageTrends).map(([metric, data]) => (
              <div key={metric} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <SafeIcon 
                    icon={getTrendIcon(data.trend)} 
                    className={`text-xl ${getTrendColor(data.trend)}`} 
                  />
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{metric}</p>
                    <p className="text-sm text-gray-600">Current: {data.current}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${getTrendColor(data.trend)}`}>
                    {data.growth > 0 ? '+' : ''}{data.growth.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600 capitalize">{data.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Usage Chart</h3>
          <ReactECharts option={getUsageChartOption()} style={{ height: '300px' }} />
        </div>
      </motion.div>

      {/* Feature Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Most Used Features</h3>
          <div className="space-y-3">
            {insights?.featureUsage.mostUsedFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-900">{feature.feature}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${feature.usage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{feature.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Underutilized Features</h3>
          <div className="space-y-3">
            {insights?.featureUsage.underutilizedFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-900">{feature.feature}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-400 h-2 rounded-full"
                      style={{ width: `${feature.usage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{feature.usage}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800">
              💡 These features could help optimize your practice workflow
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights?.recommendations.map((rec, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default SubscriptionAnalytics;