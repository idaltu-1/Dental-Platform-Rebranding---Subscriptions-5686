import React from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {FiFilter, FiCalendar, FiUsers, FiDollarSign, FiTrendingUp, FiX} = FiIcons;

function AnalyticsFilters({filters, onFiltersChange, onClearFilters}) {
  const dateRanges = [
    {value: '7d', label: 'Last 7 days'},
    {value: '30d', label: 'Last 30 days'},
    {value: '90d', label: 'Last 90 days'},
    {value: '6m', label: 'Last 6 months'},
    {value: '1y', label: 'Last year'},
    {value: 'custom', label: 'Custom range'}
  ];

  const metricTypes = [
    {value: 'all', label: 'All Metrics'},
    {value: 'revenue', label: 'Revenue'},
    {value: 'patients', label: 'Patients'},
    {value: 'referrals', label: 'Referrals'},
    {value: 'treatments', label: 'Treatments'}
  ];

  const practiceTypes = [
    {value: 'all', label: 'All Practices'},
    {value: 'general', label: 'General Dentistry'},
    {value: 'endodontics', label: 'Endodontics'},
    {value: 'oral_surgery', label: 'Oral Surgery'},
    {value: 'orthodontics', label: 'Orthodontics'},
    {value: 'periodontics', label: 'Periodontics'}
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== 'all' && value !== '30d'
  );

  return (
    <motion.div
      initial={{opacity: 0, y: -10}}
      animate={{opacity: 1, y: 0}}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <SafeIcon icon={FiFilter} className="mr-2" />
          Analytics Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
          >
            <SafeIcon icon={FiX} className="mr-1" />
            Clear filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiCalendar} className="inline mr-1" />
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Metric Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiTrendingUp} className="inline mr-1" />
            Metric Type
          </label>
          <select
            value={filters.metricType}
            onChange={(e) => handleFilterChange('metricType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {metricTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Practice Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiUsers} className="inline mr-1" />
            Practice Type
          </label>
          <select
            value={filters.practiceType}
            onChange={(e) => handleFilterChange('practiceType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {practiceTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Revenue Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiDollarSign} className="inline mr-1" />
            Min Revenue
          </label>
          <input
            type="number"
            value={filters.minRevenue}
            onChange={(e) => handleFilterChange('minRevenue', e.target.value)}
            placeholder="Enter minimum"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Custom Date Range */}
      {filters.dateRange === 'custom' && (
        <motion.div
          initial={{opacity: 0, height: 0}}
          animate={{opacity: 1, height: 'auto'}}
          className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default AnalyticsFilters;