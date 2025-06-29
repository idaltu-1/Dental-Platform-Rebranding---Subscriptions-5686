import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiFilter, FiCalendar, FiUser, FiFileText } = FiIcons;

function NotesFilters({ filters, onChange, notes }) {
  const noteTypes = [
    { value: '', label: 'All Types' },
    { value: 'clinical-findings', label: 'Clinical Findings' },
    { value: 'treatment-plan', label: 'Treatment Plan' },
    { value: 'progress-note', label: 'Progress Note' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'follow-up', label: 'Follow-up Note' },
    { value: 'discharge-summary', label: 'Discharge Summary' },
    { value: 'referral-note', label: 'Referral Note' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'final', label: 'Final' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'archived', label: 'Archived' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  // Get unique authors from notes
  const uniqueAuthors = [...new Set(notes.map(note => note.author))];
  
  // Get unique patients from notes
  const uniquePatients = [...new Set(notes.map(note => note.patientName))];

  // Get unique tags from notes
  const allTags = notes.flatMap(note => note.tags || []);
  const uniqueTags = [...new Set(allTags)];

  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...filters,
      [field]: value
    };
    onChange(newFilters);
  };

  const handleTagToggle = (tag) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    handleFilterChange('tags', newTags);
  };

  const clearFilters = () => {
    onChange({
      type: '',
      status: '',
      dateRange: '',
      author: '',
      patient: '',
      tags: []
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <SafeIcon icon={FiFilter} className="mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
          >
            <SafeIcon icon={FiX} className="mr-1" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Note Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {noteTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {dateRangeOptions.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <select
            value={filters.author}
            onChange={(e) => handleFilterChange('author', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map(author => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Patient Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Patient Name
        </label>
        <input
          type="text"
          value={filters.patient}
          onChange={(e) => handleFilterChange('patient', e.target.value)}
          placeholder="Search by patient name..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tags */}
      {uniqueTags.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.slice(0, 15).map(tag => {
              const isSelected = (filters.tags || []).includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {uniqueTags.length > 15 && (
              <span className="text-sm text-gray-500 py-1">
                +{uniqueTags.length - 15} more tags
              </span>
            )}
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Active filters: {[
                filters.type && noteTypes.find(t => t.value === filters.type)?.label,
                filters.status && statusOptions.find(s => s.value === filters.status)?.label,
                filters.dateRange && dateRangeOptions.find(d => d.value === filters.dateRange)?.label,
                filters.author,
                filters.patient,
                filters.tags?.length > 0 && `${filters.tags.length} tags`
              ].filter(Boolean).join(', ')}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default NotesFilters;