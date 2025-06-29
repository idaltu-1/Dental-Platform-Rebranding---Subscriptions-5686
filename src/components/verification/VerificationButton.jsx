import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { verificationService } from '../../services/VerificationService';
import toast from 'react-hot-toast';

const { FiShield, FiCheck, FiClock, FiAlertTriangle, FiRefreshCw } = FiIcons;

function VerificationButton({ 
  type = 'insurance', 
  patientId, 
  patientData, 
  onVerificationComplete,
  disabled = false,
  size = 'default',
  variant = 'primary'
}) {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerification = async () => {
    if (loading || disabled) return;

    setLoading(true);
    const loadingToast = toast.loading(`Verifying ${type}...`);

    try {
      let result;

      switch (type) {
        case 'insurance':
          result = await verificationService.verifyInsurance(patientId, {
            provider: patientData.insuranceProvider,
            policyNumber: patientData.policyNumber,
            groupNumber: patientData.groupNumber
          });
          break;

        case 'identity':
          result = await verificationService.verifyPatientIdentity(patientId, {
            documentType: patientData.documentType || 'Driver License',
            documentNumber: patientData.documentNumber,
            dateOfBirth: patientData.dateOfBirth
          });
          break;

        case 'document':
          result = await verificationService.verifyDocument(patientData.documentId, {
            type: patientData.documentType,
            content: patientData.documentContent
          });
          break;

        default:
          throw new Error('Unknown verification type');
      }

      toast.dismiss(loadingToast);

      if (result.success) {
        setVerified(true);
        toast.success(`${type} verification completed successfully!`);
        
        if (onVerificationComplete) {
          onVerificationComplete(result.result);
        }
      } else {
        toast.error(`${type} verification failed: ${result.error}`);
      }

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(`Verification failed: ${error.message}`);
      console.error('Verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-sm';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2';
    }
  };

  const getButtonVariant = () => {
    if (verified) {
      return 'bg-green-600 hover:bg-green-700 text-white';
    }

    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300';
      case 'outline':
        return 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const getIcon = () => {
    if (loading) return FiRefreshCw;
    if (verified) return FiCheck;
    
    switch (type) {
      case 'insurance':
        return FiShield;
      case 'identity':
        return FiShield;
      case 'document':
        return FiShield;
      default:
        return FiShield;
    }
  };

  const getButtonText = () => {
    if (verified) return 'Verified';
    if (loading) return 'Verifying...';
    
    switch (type) {
      case 'insurance':
        return 'Verify Insurance';
      case 'identity':
        return 'Verify Identity';
      case 'document':
        return 'Verify Document';
      default:
        return 'Verify';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={handleVerification}
      disabled={disabled || loading || verified}
      className={`
        inline-flex items-center space-x-2 font-medium rounded-lg
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getButtonSize()} ${getButtonVariant()}
      `}
    >
      <SafeIcon 
        icon={getIcon()} 
        className={`${loading ? 'animate-spin' : ''} ${size === 'small' ? 'text-sm' : 'text-base'}`} 
      />
      <span>{getButtonText()}</span>
    </motion.button>
  );
}

export default VerificationButton;