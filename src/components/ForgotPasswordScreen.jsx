import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const { FiMail, FiArrowLeft, FiCheck, FiActivity } = FiIcons;

function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await forgotPassword(email);
      
      if (result.success) {
        setSubmitted(true);
        toast.success('Password reset instructions sent!');
      } else {
        setErrors({ submit: result.error || 'Failed to send reset email' });
        toast.error(result.error || 'Failed to send reset email');
      }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      setErrors({ submit: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleTryDifferentEmail = () => {
    setSubmitted(false);
    setEmail('');
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center"
          >
            {/* Success Icon */}
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
              <SafeIcon icon={FiCheck} className="text-green-600 text-2xl" />
            </div>

            {/* Success Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Check Your Email
            </h1>
            <p className="text-gray-600 mb-2">
              We've sent password reset instructions to:
            </p>
            <p className="text-blue-600 font-semibold mb-6">
              {email}
            </p>
            <p className="text-sm text-gray-500 mb-8">
              If you don't see the email, check your spam folder or try again with a different email address.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBackToLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Back to Login
              </button>
              <button
                onClick={handleTryDifferentEmail}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Try Different Email
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl inline-block mb-4">
            <SafeIcon icon={FiActivity} className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            refer.dental
          </h1>
          <p className="text-gray-600 mt-2">
            Reset your password
          </p>
        </motion.div>

        {/* Forgot Password Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          {/* Back Button */}
          <button
            onClick={handleBackToLogin}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            disabled={loading}
          >
            <SafeIcon icon={FiArrowLeft} className="mr-2" />
            <span className="text-sm">Back to Login</span>
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Forgot Password?
            </h2>
            <p className="text-gray-600">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <SafeIcon 
                  icon={FiMail} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors({ ...errors, email: '' });
                    }
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                  disabled={loading}
                  autoFocus
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <span>Send Reset Instructions</span>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{' '}
              <button
                onClick={handleBackToLogin}
                className="text-blue-600 hover:text-blue-700 font-medium"
                disabled={loading}
              >
                Sign in here
              </button>
            </p>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6"
        >
          <p className="text-sm text-blue-800">
            <strong>Security Notice:</strong> Password reset links expire after 24 hours for your security. 
            If you don't receive an email within a few minutes, please check your spam folder.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          <p>© 2024 refer.dental. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;