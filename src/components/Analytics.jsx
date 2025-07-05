import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReactECharts from 'echarts-for-react';

const { 
  FiTrendingUp, FiUsers, FiCalendar, FiDollarSign, 
  FiClock, FiTarget, FiBarChart3, FiPieChart,
  FiActivity, FiArrowUp, FiArrowDown, FiDownload,
  FiFilter, FiRefreshCw
} = FiIcons;

function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const periods = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

  const keyMetrics = [
    {
      title: 'Total Revenue',
      value: '$127,450',
      change: '+18.2%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'from-green-500 to-green-600',
      description: 'Revenue generated this period'
    },
    {
      title: 'New Patients',
      value: '89',
      change: '+12.5%',
      trend: 'up',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      description: 'New patient acquisitions'
    },
    {
      title: 'Appointments',
      value: '1,247',
      change: '+8.3%',
      trend: 'up',
      icon: FiCalendar,
      color: 'from-purple-500 to-purple-600',
      description: 'Total appointments scheduled'
    },
    {
      title: 'Avg. Treatment Value',
      value: '$342',
      change: '-2.1%',
      trend: 'down',
      icon: FiTarget,
      color: 'from-orange-500 to-orange-600',
      description: 'Average value per treatment'
    }
  ];

  const revenueChartOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Revenue', 'Target']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
        data: [8.2, 9.1, 10.5, 11.2, 12.8, 13.5, 14.2, 15.1, 14.8, 16.2, 17.1, 18.5],
        itemStyle: {
          color: '#3B82F6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(59, 130, 246, 0.3)'
            }, {
              offset: 1, color: 'rgba(59, 130, 246, 0.05)'
            }]
          }
        }
      },
      {
        name: 'Target',
        type: 'line',
        smooth: true,
        data: [10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5],
        itemStyle: {
          color: '#10B981'
        },
        lineStyle: {
          type: 'dashed'
        }
      }
    ]
  };

  const appointmentTypesChartOptions = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Appointment Types',
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
          { value: 335, name: 'Cleaning', itemStyle: { color: '#3B82F6' } },
          { value: 310, name: 'Checkup', itemStyle: { color: '#10B981' } },
          { value: 234, name: 'Filling', itemStyle: { color: '#F59E0B' } },
          { value: 135, name: 'Root Canal', itemStyle: { color: '#EF4444' } },
          { value: 148, name: 'Whitening', itemStyle: { color: '#8B5CF6' } }
        ]
      }
    ]
  };

  const patientAcquisitionChartOptions = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['New Patients', 'Referrals']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'New Patients',
        type: 'bar',
        data: [23, 31, 28, 35],
        itemStyle: {
          color: '#3B82F6'
        }
      },
      {
        name: 'Referrals',
        type: 'bar',
        data: [8, 12, 15, 18],
        itemStyle: {
          color: '#10B981'
        }
      }
    ]
  };

  const topTreatments = [
    { name: 'Dental Cleaning', count: 145, revenue: '$21,750', trend: '+5%' },
    { name: 'Dental Checkup', count: 132, revenue: '$19,800', trend: '+8%' },
    { name: 'Tooth Filling', count: 89, revenue: '$26,700', trend: '+12%' },
    { name: 'Root Canal', count: 34, revenue: '$20,400', trend: '-3%' },
    { name: 'Teeth Whitening', count: 67, revenue: '$16,750', trend: '+15%' }
  ];

  const performanceInsights = [
    {
      title: 'Peak Hours',
      value: '10 AM - 2 PM',
      description: 'Highest appointment volume',
      icon: FiClock,
      color: 'text-blue-600'
    },
    {
      title: 'Best Day',
      value: 'Tuesday',
      description: 'Highest revenue generation',
      icon: FiCalendar,
      color: 'text-green-600'
    },
    {
      title: 'Top Referrer',
      value: 'Dr. Smith',
      description: '23 referrals this month',
      icon: FiUsers,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '68%',
      description: 'Consultation to treatment',
      icon: FiTarget,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
            <p className="text-gray-600">Comprehensive insights into your practice performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedPeriod === period.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <SafeIcon icon={FiDownload} />
              <span>Export</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <SafeIcon icon={FiRefreshCw} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color}`}>
                <SafeIcon icon={metric.icon} className="text-white text-xl" />
              </div>
              <div className={`flex items-center text-sm font-semibold ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <SafeIcon 
                  icon={metric.trend === 'up' ? FiArrowUp : FiArrowDown} 
                  className="mr-1" 
                />
                {metric.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-gray-600 text-sm mb-2">{metric.title}</p>
            <p className="text-gray-500 text-xs">{metric.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Revenue Trend</h3>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiTrendingUp} className="text-green-600" />
              <span className="text-sm text-green-600 font-semibold">+18.2%</span>
            </div>
          </div>
          <ReactECharts option={revenueChartOptions} style={{ height: '300px' }} />
        </motion.div>

        {/* Appointment Types Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Appointment Types</h3>
            <SafeIcon icon={FiPieChart} className="text-blue-600" />
          </div>
          <ReactECharts option={appointmentTypesChartOptions} style={{ height: '300px' }} />
        </motion.div>
      </div>

      {/* Patient Acquisition & Top Treatments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Patient Acquisition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Patient Acquisition</h3>
            <SafeIcon icon={FiBarChart3} className="text-purple-600" />
          </div>
          <ReactECharts option={patientAcquisitionChartOptions} style={{ height: '300px' }} />
        </motion.div>

        {/* Top Treatments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Top Treatments</h3>
            <SafeIcon icon={FiActivity} className="text-orange-600" />
          </div>
          <div className="space-y-4">
            {topTreatments.map((treatment, index) => (
              <div key={treatment.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{treatment.name}</h4>
                    <p className="text-sm text-gray-600">{treatment.count} treatments</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{treatment.revenue}</p>
                  <p className={`text-sm font-medium ${
                    treatment.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {treatment.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceInsights.map((insight, index) => (
            <div key={insight.title} className="text-center p-4 bg-gray-50 rounded-lg">
              <SafeIcon icon={insight.icon} className={`text-3xl ${insight.color} mx-auto mb-3`} />
              <h4 className="font-bold text-gray-900 text-lg mb-1">{insight.value}</h4>
              <p className="font-semibold text-gray-700 mb-1">{insight.title}</p>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white"
      >
        <h3 className="text-2xl font-bold mb-4">Ready to Optimize Your Practice?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          {"Based on your analytics, we've identified key opportunities to increase revenue and improve patient satisfaction."}
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            View Recommendations
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Schedule Consultation
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Analytics;