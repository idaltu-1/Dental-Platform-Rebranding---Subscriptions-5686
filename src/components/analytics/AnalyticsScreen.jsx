import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ReactECharts from 'echarts-for-react';
import AnalyticsFilters from './AnalyticsFilters';
import {analyticsService} from '../../services/AnalyticsService';
import toast from 'react-hot-toast';

const {
  FiTrendingUp, FiTrendingDown, FiDollarSign, FiUsers, FiCalendar, 
  FiClock, FiDownload, FiRefreshCw, FiBarChart3, FiTarget, FiActivity
} = FiIcons;

function AnalyticsScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    overview: {},
    trends: [],
    treatments: [],
    performance: {},
    predictions: {}
  });
  const [filters, setFilters] = useState({
    dateRange: '30d',
    metricType: 'all',
    practiceType: 'all',
    minRevenue: '',
    startDate: '',
    endDate: ''
  });
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [viewMode, setViewMode] = useState('overview'); // overview, detailed, comparison

  useEffect(() => {
    loadAnalyticsData();
  }, [filters]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const [overview, trends, treatments, performance, predictions] = await Promise.all([
        analyticsService.getOverviewMetrics(filters),
        analyticsService.getReferralTrends(filters.dateRange),
        analyticsService.getTreatmentAnalytics(filters),
        analyticsService.getPerformanceMetrics(filters),
        analyticsService.getPredictiveAnalytics(filters)
      ]);

      setData({
        overview,
        trends,
        treatments,
        performance,
        predictions
      });
    } catch (error) {
      console.error('Failed to load analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: '30d',
      metricType: 'all',
      practiceType: 'all',
      minRevenue: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleExport = async (format = 'csv') => {
    try {
      toast.loading('Exporting analytics...', { id: 'export' });
      const result = await analyticsService.exportAnalytics(format, filters);
      if (result.success) {
        toast.success('Analytics exported successfully', { id: 'export' });
      }
    } catch (error) {
      toast.error('Export failed. Please try again.', { id: 'export' });
    }
  };

  const handleViewRecommendations = () => {
    toast.success('Opening recommendations dashboard...');
    // In a real app, this would navigate to recommendations
  };

  const handleScheduleConsultation = () => {
    toast.success('Opening consultation scheduler...');
    // In a real app, this would open a booking modal
  };

  // Enhanced Key Metrics with better calculations
  const keyMetrics = [
    {
      title: 'Total Revenue',
      value: `$${(data.overview.revenue || 0).toLocaleString()}`,
      change: data.overview.revenueGrowth || '+0%',
      trend: data.overview.revenueGrowth?.startsWith('+') ? 'up' : 'down',
      icon: FiDollarSign,
      color: 'from-green-500 to-green-600',
      description: 'Total revenue generated',
      target: `$${(data.overview.revenueTarget || 0).toLocaleString()}`,
      progress: ((data.overview.revenue || 0) / (data.overview.revenueTarget || 1)) * 100
    },
    {
      title: 'Active Referrals',
      value: (data.overview.activeReferrals || 0).toLocaleString(),
      change: data.overview.referralGrowth || '+0%',
      trend: data.overview.referralGrowth?.startsWith('+') ? 'up' : 'down',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      description: 'Currently active referrals',
      target: (data.overview.referralTarget || 0).toLocaleString(),
      progress: ((data.overview.activeReferrals || 0) / (data.overview.referralTarget || 1)) * 100
    },
    {
      title: 'Conversion Rate',
      value: `${(data.overview.conversionRate || 0).toFixed(1)}%`,
      change: data.overview.conversionGrowth || '+0%',
      trend: data.overview.conversionGrowth?.startsWith('+') ? 'up' : 'down',
      icon: FiTarget,
      color: 'from-purple-500 to-purple-600',
      description: 'Referral to treatment conversion',
      target: `${(data.overview.conversionTarget || 0).toFixed(1)}%`,
      progress: ((data.overview.conversionRate || 0) / (data.overview.conversionTarget || 1)) * 100
    },
    {
      title: 'Avg Response Time',
      value: `${(data.overview.avgResponseTime || 0).toFixed(1)} hrs`,
      change: data.overview.responseTimeChange || '0%',
      trend: data.overview.responseTimeChange?.startsWith('-') ? 'up' : 'down', // Lower is better
      icon: FiClock,
      color: 'from-orange-500 to-orange-600',
      description: 'Average response time to referrals',
      target: `${(data.overview.responseTimeTarget || 0).toFixed(1)} hrs`,
      progress: 100 - (((data.overview.avgResponseTime || 0) / (data.overview.responseTimeTarget || 1)) * 100)
    }
  ];

  // Advanced Revenue Chart with multiple series
  const revenueChartOptions = {
    title: {
      text: 'Revenue Analytics',
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
      },
      formatter: (params) => {
        let result = `${params[0].name}<br/>`;
        params.forEach(param => {
          result += `${param.seriesName}: $${param.value.toLocaleString()}<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['Actual Revenue', 'Target Revenue', 'Predicted Revenue'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.trends.map(t => t.month) || []
    },
    yAxis: {
      type: 'value',
      name: 'Revenue ($)',
      axisLabel: {
        formatter: (value) => `$${value / 1000}K`
      }
    },
    series: [
      {
        name: 'Actual Revenue',
        type: 'line',
        smooth: true,
        data: data.trends.map(t => t.revenue) || [],
        itemStyle: { color: '#3B82F6' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59,130,246,0.3)' },
              { offset: 1, color: 'rgba(59,130,246,0.05)' }
            ]
          }
        }
      },
      {
        name: 'Target Revenue',
        type: 'line',
        smooth: true,
        data: data.trends.map(t => t.target) || [],
        itemStyle: { color: '#10B981' },
        lineStyle: { type: 'dashed' }
      },
      {
        name: 'Predicted Revenue',
        type: 'line',
        smooth: true,
        data: data.predictions.revenue || [],
        itemStyle: { color: '#F59E0B' },
        lineStyle: { type: 'dotted' }
      }
    ]
  };

  // Performance Radar Chart
  const performanceRadarOptions = {
    title: {
      text: 'Performance Metrics',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    radar: {
      indicator: [
        { name: 'Revenue', max: 100 },
        { name: 'Patient Satisfaction', max: 100 },
        { name: 'Response Time', max: 100 },
        { name: 'Conversion Rate', max: 100 },
        { name: 'Treatment Quality', max: 100 },
        { name: 'Referral Volume', max: 100 }
      ],
      shape: 'polygon',
      splitNumber: 4,
      splitArea: { show: true },
      splitLine: { show: true }
    },
    series: [{
      name: 'Performance',
      type: 'radar',
      data: [{
        value: [
          data.performance.revenue || 75,
          data.performance.satisfaction || 85,
          data.performance.responseTime || 90,
          data.performance.conversion || 70,
          data.performance.quality || 88,
          data.performance.volume || 82
        ],
        name: 'Current Performance',
        itemStyle: { color: '#3B82F6' },
        areaStyle: { color: 'rgba(59,130,246,0.3)' }
      }]
    }]
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded-xl"></div>
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
          <p className="text-gray-600">Comprehensive insights and predictive analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {[
              { value: 'overview', label: 'Overview', icon: FiBarChart3 },
              { value: 'detailed', label: 'Detailed', icon: FiActivity },
              { value: 'comparison', label: 'Compare', icon: FiTrendingUp }
            ].map(mode => (
              <button
                key={mode.value}
                onClick={() => setViewMode(mode.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded transition-all ${
                  viewMode === mode.value 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <SafeIcon icon={mode.icon} />
                <span className="font-medium">{mode.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => handleExport('xlsx')}
            className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiDownload} />
            <span>Export</span>
          </button>
          <button
            onClick={loadAnalyticsData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiRefreshCw} />
            <span>Refresh</span>
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <AnalyticsFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.1}}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color}`}>
                <SafeIcon icon={metric.icon} className="text-white text-xl" />
              </div>
              <div className={`flex items-center text-sm font-semibold ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <SafeIcon icon={metric.trend === 'up' ? FiTrendingUp : FiTrendingDown} className="mr-1" />
                {metric.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-gray-600 text-sm mb-3">{metric.title}</p>
            
            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{metric.progress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${metric.color}`}
                  style={{width: `${Math.min(100, metric.progress)}%`}}
                ></div>
              </div>
            </div>
            <p className="text-xs text-gray-500">Target: {metric.target}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Revenue Chart */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.5}}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <ReactECharts option={revenueChartOptions} style={{height: '400px'}} />
        </motion.div>

        {/* Performance Radar Chart */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.6}}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <ReactECharts option={performanceRadarOptions} style={{height: '400px'}} />
        </motion.div>
      </div>

      {/* Predictive Analytics Section */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.7}}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-4">Predictive Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Revenue Forecast</h4>
            <p className="text-2xl font-bold mb-1">
              ${(data.predictions.nextMonthRevenue || 0).toLocaleString()}
            </p>
            <p className="text-sm opacity-75">Predicted next month</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Growth Opportunity</h4>
            <p className="text-2xl font-bold mb-1">
              {(data.predictions.growthOpportunity || 0)}%
            </p>
            <p className="text-sm opacity-75">Potential increase</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Risk Assessment</h4>
            <p className="text-2xl font-bold mb-1">
              {data.predictions.riskLevel || 'Low'}
            </p>
            <p className="text-sm opacity-75">Current risk level</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleViewRecommendations}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            View Recommendations
          </button>
          <button
            onClick={handleScheduleConsultation}
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Schedule Consultation
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default AnalyticsScreen;