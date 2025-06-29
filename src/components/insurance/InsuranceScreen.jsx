import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSearch, FiPlus, FiCheck, FiX, FiClock, FiCreditCard, FiUser, FiPhone } = FiIcons;

function InsuranceScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const insuranceVerifications = [
    {
      id: 'INS-001',
      patientName: 'John Smith',
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BC123456789',
      status: 'verified',
      coverage: '80%',
      deductible: '$500',
      remaining: '$200',
      verifiedDate: '2024-01-15'
    },
    {
      id: 'INS-002',
      patientName: 'Emma Davis',
      provider: 'Aetna',
      policyNumber: 'AE987654321',
      status: 'pending',
      coverage: 'N/A',
      deductible: 'N/A',
      remaining: 'N/A',
      verifiedDate: null
    },
    {
      id: 'INS-003',
      patientName: 'Michael Wilson',
      provider: 'Cigna',
      policyNumber: 'CG456789123',
      status: 'rejected',
      coverage: 'N/A',
      deductible: 'N/A',
      remaining: 'N/A',
      verifiedDate: '2024-01-18'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return FiCheck;
      case 'pending': return FiClock;
      case 'rejected': return FiX;
      default: return FiClock;
    }
  };

  const filteredVerifications = insuranceVerifications.filter(verification => {
    const matchesSearch = verification.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verification.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verification.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || verification.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Verification</h1>
          <p className="text-gray-600">Manage and verify patient insurance coverage</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all">
          <SafeIcon icon={FiPlus} />
          <span>New Verification</span>
        </button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Verifications</p>
              <p className="text-2xl font-bold text-gray-900">{insuranceVerifications.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <SafeIcon icon={FiCreditCard} className="text-white text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Verified</p>
              <p className="text-2xl font-bold text-green-600">
                {insuranceVerifications.filter(v => v.status === 'verified').length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <SafeIcon icon={FiCheck} className="text-white text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {insuranceVerifications.filter(v => v.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg">
              <SafeIcon icon={FiClock} className="text-white text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {insuranceVerifications.filter(v => v.status === 'rejected').length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <SafeIcon icon={FiX} className="text-white text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient, ID, or provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            {['all', 'verified', 'pending', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Insurance Verifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Verification ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Insurance Provider</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Policy Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Coverage</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Deductible</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVerifications.map((verification) => (
                <tr key={verification.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {verification.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {verification.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900">{verification.patientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{verification.provider}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">{verification.policyNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={getStatusIcon(verification.status)} className="text-sm" />
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(verification.status)}`}>
                        {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{verification.coverage}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{verification.deductible}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <SafeIcon icon={FiPhone} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                        <SafeIcon icon={FiCheck} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVerifications.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiCreditCard} className="text-gray-300 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No verifications found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default InsuranceScreen;