import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { referralService } from '../../services/ReferralService';

const { FiTemplate, FiPlus, FiEdit3, FiCheck, FiX, FiFileText, FiUser, FiClock } = FiIcons;

function ReferralTemplates({ isOpen, onClose, onTemplateSelected }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [patientData, setPatientData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientAddress: '',
    referringDoctor: '',
    specialist: '',
    preferredDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadTemplates();
    }
  }, [isOpen]);

  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      const data = await referralService.getReferralTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleCreateFromTemplate = async () => {
    if (!selectedTemplate) return;

    try {
      setIsCreating(true);
      const newReferral = await referralService.createReferralFromTemplate(
        selectedTemplate.id,
        patientData
      );
      
      if (onTemplateSelected) {
        onTemplateSelected(newReferral);
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to create referral from template:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      'urgent': 'text-red-600',
      'high': 'text-orange-600',
      'normal': 'text-blue-600',
      'low': 'text-green-600'
    };
    return colors[urgency] || 'text-gray-600';
  };

  const getTypeColor = (type) => {
    const colors = {
      'Endodontics': 'bg-red-100 text-red-800',
      'Oral Surgery': 'bg-blue-100 text-blue-800',
      'Orthodontics': 'bg-green-100 text-green-800',
      'Periodontics': 'bg-purple-100 text-purple-800',
      'Prosthodontics': 'bg-yellow-100 text-yellow-800',
      'Pediatric Dentistry': 'bg-pink-100 text-pink-800',
      'Oral Pathology': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <SafeIcon icon={FiTemplate} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Referral Templates</h3>
                <p className="text-sm text-gray-600">
                  Create referrals quickly using pre-defined templates
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex min-h-0">
          {/* Templates List */}
          <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Templates</h4>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading templates...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTemplate?.id === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{template.name}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                          {template.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiClock} />
                          <span className={`capitalize ${getUrgencyColor(template.urgency)}`}>
                            {template.urgency}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiFileText} />
                          <span>{template.requiredFields.length} fields</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {template.notes}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Template Details and Form */}
          <div className="w-1/2 overflow-y-auto">
            <div className="p-6">
              {selectedTemplate ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {selectedTemplate.name}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Type:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedTemplate.type)}`}>
                          {selectedTemplate.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Urgency:</span>
                        <span className={`capitalize ${getUrgencyColor(selectedTemplate.urgency)}`}>
                          {selectedTemplate.urgency}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Default Notes:</span>
                        <p className="text-sm text-gray-900 mt-1">{selectedTemplate.notes}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Common Symptoms:</span>
                        <p className="text-sm text-gray-900 mt-1">{selectedTemplate.symptoms}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h5 className="font-medium text-gray-900 mb-4">Patient Information</h5>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Patient Name *
                          </label>
                          <input
                            type="text"
                            value={patientData.patientName}
                            onChange={(e) => setPatientData({...patientData, patientName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter patient name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={patientData.patientEmail}
                            onChange={(e) => setPatientData({...patientData, patientEmail: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="patient@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            value={patientData.patientPhone}
                            onChange={(e) => setPatientData({...patientData, patientPhone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            value={patientData.preferredDate}
                            onChange={(e) => setPatientData({...patientData, preferredDate: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          value={patientData.patientAddress}
                          onChange={(e) => setPatientData({...patientData, patientAddress: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Patient address"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Referring Doctor
                          </label>
                          <input
                            type="text"
                            value={patientData.referringDoctor}
                            onChange={(e) => setPatientData({...patientData, referringDoctor: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Dr. Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Specialist
                          </label>
                          <input
                            type="text"
                            value={patientData.specialist}
                            onChange={(e) => setPatientData({...patientData, specialist: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Specialist name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <SafeIcon icon={FiTemplate} className="text-gray-300 text-4xl mx-auto mb-4" />
                  <p className="text-gray-600">Select a template to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateFromTemplate}
              disabled={!selectedTemplate || !patientData.patientName || !patientData.patientPhone || isCreating}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !selectedTemplate || !patientData.patientName || !patientData.patientPhone || isCreating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isCreating ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheck} />
                  <span>Create Referral</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ReferralTemplates;