import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import VerificationButton from './VerificationButton';

const { FiX, FiShield, FiUser, FiFileText, FiCreditCard } = FiIcons;

function VerificationModal({ 
  isOpen, 
  onClose, 
  patient, 
  verificationType = 'insurance',
  onVerificationComplete 
}) {
  const [selectedType, setSelectedType] = useState(verificationType);

  if (!isOpen) return null;

  const verificationTypes = [
    {
      id: 'insurance',
      label: 'Insurance Verification',
      icon: FiCreditCard,
      description: 'Verify insurance coverage and benefits'
    },
    {
      id: 'identity',
      label: 'Identity Verification',
      icon: FiUser,
      description: 'Verify patient identity and documents'
    },
    {
      id: 'document',
      label: 'Document Verification',
      icon: FiFileText,
      description: 'Verify medical documents and forms'
    }
  ];

  const handleVerificationComplete = (result) => {
    if (onVerificationComplete) {
      onVerificationComplete(result);
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <SafeIcon icon={FiShield} className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Verification Center</h3>
              <p className="text-sm text-gray-600">Verify patient information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiX} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Patient Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {patient?.name?.charAt(0) || 'P'}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{patient?.name || 'Patient'}</h4>
                <p className="text-sm text-gray-600">ID: {patient?.id || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Verification Type Selection */}
          <div className="mb-6">
            <h5 className="font-medium text-gray-900 mb-3">Select Verification Type</h5>
            <div className="space-y-2">
              {verificationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${
                    selectedType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <SafeIcon 
                      icon={type.icon} 
                      className={selectedType === type.id ? 'text-blue-600' : 'text-gray-600'} 
                    />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{type.label}</p>
                      <p className="text-xs text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Verification Details */}
          {selectedType === 'insurance' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h6 className="font-medium text-gray-900 mb-2">Insurance Information</h6>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Provider: {patient?.insurance || 'Not specified'}</p>
                <p>Policy: {patient?.policyNumber || 'Not specified'}</p>
                <p>Group: {patient?.groupNumber || 'Not specified'}</p>
              </div>
            </div>
          )}

          {selectedType === 'identity' && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h6 className="font-medium text-gray-900 mb-2">Identity Information</h6>
              <div className="space-y-1 text-sm text-gray-600">
                <p>DOB: {patient?.dateOfBirth || 'Not specified'}</p>
                <p>Address: {patient?.address || 'Not specified'}</p>
                <p>Phone: {patient?.phone || 'Not specified'}</p>
              </div>
            </div>
          )}

          {selectedType === 'document' && (
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
              <h6 className="font-medium text-gray-900 mb-2">Document Information</h6>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Recent uploads will be verified</p>
                <p>Includes consent forms and medical records</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Cancel
          </button>
          
          <VerificationButton
            type={selectedType}
            patientId={patient?.id}
            patientData={{
              insuranceProvider: patient?.insurance,
              policyNumber: patient?.policyNumber,
              groupNumber: patient?.groupNumber,
              documentType: 'Medical Record',
              dateOfBirth: patient?.dateOfBirth
            }}
            onVerificationComplete={handleVerificationComplete}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default VerificationModal;