import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { formatDistanceToNow } from 'date-fns';

const { FiEdit, FiTrash2, FiUser, FiCalendar, FiTag, FiFileText, FiClock, FiEye } = FiIcons;

function NotesList({ notes, viewMode, loading, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-orange-100 text-orange-800';
      case 'final': return 'bg-green-100 text-green-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'text-green-600';
      case 'normal': return 'text-blue-600';
      case 'high': return 'text-orange-600';
      case 'urgent': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeLabel = (type) => {
    const types = {
      'clinical-findings': 'Clinical Findings',
      'treatment-plan': 'Treatment Plan',
      'progress-note': 'Progress Note',
      'consultation': 'Consultation',
      'follow-up': 'Follow-up Note',
      'discharge-summary': 'Discharge Summary',
      'referral-note': 'Referral Note'
    };
    return types[type] || type;
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading clinical notes...</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
        <SafeIcon icon={FiFileText} className="text-gray-300 text-4xl mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No clinical notes found</h3>
        <p className="text-gray-600 mb-6">Start by creating your first clinical note</p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {getTypeLabel(note.type)}
                </p>
              </div>
              <div className="flex items-center space-x-1 ml-2">
                <span className={`inline-block w-2 h-2 rounded-full ${getPriorityColor(note.priority)}`}></span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(note.status)}`}>
                  {note.status}
                </span>
              </div>
            </div>

            {/* Patient Info */}
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <SafeIcon icon={FiUser} className="mr-2" />
              <span>{note.patientName}</span>
              {note.patientId && (
                <span className="ml-2 text-gray-400">({note.patientId})</span>
              )}
            </div>

            {/* Content Preview */}
            <div className="text-sm text-gray-700 mb-4 line-clamp-3">
              {truncateText(stripHtml(note.content), 100)}
            </div>

            {/* Tags */}
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {note.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {note.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{note.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-xs text-gray-500">
                <SafeIcon icon={FiClock} className="mr-1" />
                {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => onEdit(note)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  title="Edit note"
                >
                  <SafeIcon icon={FiEdit} className="text-sm" />
                </button>
                <button
                  onClick={() => onDelete(note.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="Delete note"
                >
                  <SafeIcon icon={FiTrash2} className="text-sm" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // List View
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="divide-y divide-gray-100">
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {note.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <SafeIcon icon={FiFileText} className="mr-1" />
                        {getTypeLabel(note.type)}
                      </span>
                      <span className="flex items-center">
                        <SafeIcon icon={FiUser} className="mr-1" />
                        {note.patientName}
                      </span>
                      <span className="flex items-center">
                        <SafeIcon icon={FiCalendar} className="mr-1" />
                        {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status & Priority */}
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`inline-block w-2 h-2 rounded-full ${getPriorityColor(note.priority)}`}></span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(note.status)}`}>
                      {note.status}
                    </span>
                  </div>
                </div>

                {/* Content Preview */}
                <p className="text-gray-700 mb-3 line-clamp-2">
                  {truncateText(stripHtml(note.content), 200)}
                </p>

                {/* Tags and Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Tags */}
                    {note.tags && note.tags.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiTag} className="text-gray-400 text-sm" />
                        <div className="flex flex-wrap gap-1">
                          {note.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {note.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{note.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Author */}
                  <div className="text-sm text-gray-500">
                    by {note.author}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-6">
                <button
                  onClick={() => onEdit(note)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  title="Edit note"
                >
                  <SafeIcon icon={FiEdit} />
                </button>
                <button
                  onClick={() => onDelete(note.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="Delete note"
                >
                  <SafeIcon icon={FiTrash2} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;