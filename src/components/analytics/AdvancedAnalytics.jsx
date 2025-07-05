import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ReactECharts from 'echarts-for-react';

const { 
  FiTrendingUp, FiBarChart3, FiPieChart, FiActivity, FiUsers,
  FiCalendar, FiDollarSign, FiTarget, FiEye, FiZap, FiStar,
  FiArrowUp, FiArrowDown, FiClock, FiAward, FiHeart, FiSmile
} = FiIcons;

function AdvancedAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const timeRanges = [
    { id: '7d', name: '7 Days', active: false },
    { id: '30d', name: '30 Days', active: true },
    { id: '90d', name: '90 Days', active: false },
    { id: '1y', name: '1 Year', active: false }
  ];

  const kpiMetrics = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '$847,392',
      change: '+12.5%',
      changeType: 'positive',
      icon: FiDollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'patients',
      title: 'Active Patients',
      value: '2,847',
      change: '+8.2%',
      changeType: 'positive',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'appointments',
      title: 'Appointments',
      value: '1,234',
      change: '+15.7%',
      changeType: 'positive',
      icon: FiCalendar,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'satisfaction',
      title: 'Patient Satisfaction',
      value: '4.8/5',
      change: '+0.3',
      changeType: 'positive',
      icon: FiStar,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'efficiency',
      title: 'Practice Efficiency',
      value: '94%',
      change: '+5.2%',
      changeType: 'positive',
      icon: FiTarget,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'retention',
      title: 'Patient Retention',
      value: '89%',
      change: '+2.1%',
      changeType: 'positive',
      icon: FiHeart,
      color: 'from-red-500 to-red-600'
    }
  ];

  const advancedInsights = [
    {
      title: 'AI-Powered Predictions',
      description: 'Revenue forecast shows 18% growth potential in next quarter',
      icon: FiZap,
      color: 'from-cyan-500 to-cyan-600',
      actionable: true
    },
    {
      title: 'Peak Hour Analysis',
      description: 'Tuesday 2-4 PM shows highest appointment completion rate',
      icon: FiClock,
      color: 'from-orange-500 to-orange-600',
      actionable: true
    },
    {
      title: 'Patient Journey Optimization',
      description: 'Streamline check-in process to reduce wait times by 23%',
      icon: FiActivity,
      color: 'from-purple-500 to-purple-600',
      actionable: true
    },
    {
      title: 'Treatment Success Patterns',
      description: 'Identify high-success treatment combinations',
      icon: FiAward,
      color: 'from-green-500 to-green-600',
      actionable: false
    }
  ];

  const revenueChartOptions = {
    title: {
      text: 'Revenue Trends',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: ['Revenue', 'Profit', 'Forecast'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}K'
      }
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: true,
        data: [65, 68, 72, 75, 78, 82, 85, 88, 91, 94, 97, 100],
        itemStyle: { color: '#3B82F6' }
      },
      {
        name: 'Profit',
        type: 'line',
        smooth: true,
        data: [45, 48, 52, 55, 58, 62, 65, 68, 71, 74, 77, 80],
        itemStyle: { color: '#10B981' }
      },
      {
        name: 'Forecast',
        type: 'line',
        smooth: true,
        lineStyle: { type: 'dashed' },
        data: [null, null, null, null, null, null, null, null, null, 94, 98, 102],
        itemStyle: { color: '#F59E0B' }
      }
    ]
  };

  const patientDemographicsOptions = {
    title: {
      text: 'Patient Demographics',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      bottom: 0,
      data: ['18-30', '31-45', '46-60', '60+']
    },
    series: [
      {
        name: 'Age Groups',
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
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 435, name: '18-30', itemStyle: { color: '#3B82F6' } },
          { value: 679, name: '31-45', itemStyle: { color: '#10B981' } },
          { value: 548, name: '46-60', itemStyle: { color: '#F59E0B' } },
          { value: 312, name: '60+', itemStyle: { color: '#EF4444' } }
        ]
      }
    ]
  };

  const treatmentSuccessOptions = {
    title: {
      text: 'Treatment Success Rates',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['Success Rate', 'Patient Satisfaction'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Cleaning', 'Fillings', 'Crowns', 'Root Canal', 'Extractions', 'Implants']
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: 'Success Rate',
        type: 'bar',
        data: [98, 94, 92, 88, 95, 91],
        itemStyle: { color: '#3B82F6' }
      },
      {
        name: 'Patient Satisfaction',
        type: 'line',
        yAxisIndex: 0,
        data: [96, 92, 89, 85, 93, 88],
        itemStyle: { color: '#10B981' }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
            <p className="text-gray-600">AI-powered insights and predictive analytics for your dental practice</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {timeRanges.map(range => (
                <option key={range.id} value={range.id}>{range.name}</option>
              ))}
            </select>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
              Export Report
            </button>
          </div>
        </div>
      </motion.div>

      {/* KPI Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8"
      >
        {kpiMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color}`}>
                <SafeIcon icon={metric.icon} className="text-white text-xl" />
              </div>
              <div className={`flex items-center text-sm font-semibold ${
                metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                <SafeIcon 
                  icon={metric.changeType === 'positive' ? FiArrowUp : FiArrowDown} 
                  className="mr-1" 
                />
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm text-gray-600">{metric.title}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <ReactECharts option={revenueChartOptions} style={{ height: '350px' }} />
        </motion.div>

        {/* Patient Demographics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <ReactECharts option={patientDemographicsOptions} style={{ height: '350px' }} />
        </motion.div>
      </div>

      {/* Treatment Success Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8"
      >
        <ReactECharts option={treatmentSuccessOptions} style={{ height: '400px' }} />
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg mr-4">
            <SafeIcon icon={FiZap} className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">AI-Powered Insights</h3>
            <p className="text-gray-600">Actionable recommendations based on your practice data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advancedInsights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${insight.color} flex-shrink-0`}>
                  <SafeIcon icon={insight.icon} className="text-white text-sm" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                  {insight.actionable && (
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Take Action →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default AdvancedAnalytics;