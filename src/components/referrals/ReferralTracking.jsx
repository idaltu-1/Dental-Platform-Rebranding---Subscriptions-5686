import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const { FiSearch, FiPlus, FiEye, FiEdit, FiClock, FiUser, FiMapPin, FiCalendar, FiX, FiPhone, FiMail } = FiIcons;

function ReferralTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [showNewReferral, setShowNewReferral] = useState(false);
  const [showEditReferral, setShowEditReferral] = useState(false);
  const [editingReferral, setEditingReferral] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [newReferral, setNewReferral] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    referringDoctor: '',
    specialist: '',
    type: '',
    urgency: 'normal',
    notes: '',
    preferredDate: ''
  });

  const [referrals, setReferrals] = useState([
    {
      id: 'REF-001',
      patientName: 'John Smith',
      patientEmail: 'john.smith@email.com',
      patientPhone: '(555) 123-4567',
      patientAddress: '123 Main St, Springfield, IL',
      referringDoctor: 'Dr. Sarah Wilson',
      specialist: 'Dr. Michael Chen',
      type: 'Endodontics',
      status: 'pending',
      urgency: 'high',
      date: '2024-01-15',
      notes: 'Root canal evaluation needed. Patient experiencing severe pain.',
      preferredDate: '2024-02-01',
      insurance: 'Blue Cross Blue Shield',
      symptoms: 'Severe tooth pain, sensitivity to cold'
    },
    {
      id: 'REF-002',
      patientName: 'Emma Davis',
      patientEmail: 'emma.davis@email.com',
      patientPhone: '(555) 987-6543',
      patientAddress: '456 Oak Ave, Springfield, IL',
      referringDoctor: 'Dr. Robert Taylor',
      specialist: 'Dr. Lisa Anderson',
      type: 'Oral Surgery',
      status: 'accepted',
      urgency: 'normal',
      date: '2024-01-18',
      notes: 'Wisdom tooth extraction required',
      preferredDate: '2024-02-05',
      insurance: 'Aetna',
      symptoms: 'Impacted wisdom tooth causing discomfort'
    },
    {
      id: 'REF-003',
      patientName: 'Michael Wilson',
      patientEmail: 'mike.wilson@email.com',
      patientPhone: '(555) 456-7890',
      patientAddress: '789 Pine St, Springfield, IL',
      referringDoctor: 'Dr. Jennifer Brown',
      specialist: 'Dr. David Lee',
      type: 'Periodontics',
      status: 'completed',
      urgency: 'normal',
      date: '2024-01-20',
      notes: 'Gum disease treatment completed successfully',
      preferredDate: '2024-01-25',
      insurance: 'Cigna',
      symptoms: 'Gum bleeding and recession'
    }
  ]);

  const specialtyOptions = [
    'Endodontics',
    'Oral Surgery',
    'Orthodontics',
    'Periodontics',
    'Prosthodontics',
    'Pediatric Dentistry',
    'Oral Pathology'
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'normal', label: 'Normal', color: 'text-blue-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency) => {
    const option = urgencyOptions.find(opt => opt.value === urgency);
    return option ? option.color : 'text-gray-600';
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referringDoctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.specialist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || referral.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || referral.urgency === urgencyFilter;
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  // Sort filtered referrals
  const sortedReferrals = [...filteredReferrals].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'date' || sortBy === 'preferredDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleViewReferral = (referral) => {
    setSelectedReferral(referral);
  };

  const resetForm = () => {
    setNewReferral({
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      referringDoctor: '',
      specialist: '',
      type: '',
      urgency: 'normal',
      notes: '',
      preferredDate: ''
    });
  };

  const handleNewReferral = () => {
    resetForm();
    setShowNewReferral(true);
  };

  const handleCancelNew = () => {
    resetForm();
    setShowNewReferral(false);
  };

  const handleCancelEdit = () => {
    resetForm();
    setShowEditReferral(false);
    setEditingReferral(null);
  };

  const handleSaveReferral = () => {
    // Validate required fields
    if (!newReferral.patientName || !newReferral.patientEmail || !newReferral.patientPhone || 
        !newReferral.referringDoctor || !newReferral.specialist || !newReferral.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Generate new referral ID
    const newId = 'REF-' + String(referrals.length + 1).padStart(3, '0');
    
    const referralToSave = {
      ...newReferral,
      id: newId,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      patientAddress: '', // Add empty address for now
      insurance: '', // Add empty insurance for now
      symptoms: '' // Add empty symptoms for now
    };

    setReferrals([...referrals, referralToSave]);
    setShowNewReferral(false);
    resetForm();
    
    toast.success('Referral created successfully!');
  };

  const handleEditReferral = (referral) => {
    setEditingReferral(referral);
    setNewReferral({
      patientName: referral.patientName,
      patientEmail: referral.patientEmail,
      patientPhone: referral.patientPhone,
      referringDoctor: referral.referringDoctor,
      specialist: referral.specialist,
      type: referral.type,
      urgency: referral.urgency,
      notes: referral.notes,
      preferredDate: referral.preferredDate
    });
    setShowEditReferral(true);
  };

  const handleUpdateReferral = () => {
    // Validate required fields
    if (!newReferral.patientName || !newReferral.patientEmail || !newReferral.patientPhone || 
        !newReferral.referringDoctor || !newReferral.specialist || !newReferral.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedReferrals = referrals.map(referral => 
      referral.id === editingReferral.id 
        ? { ...referral, ...newReferral }
        : referral
    );

    setReferrals(updatedReferrals);
    setShowEditReferral(false);
    setEditingReferral(null);
    resetForm();
    
    toast.success('Referral updated successfully!');
  };

  const handleUpdateStatus = (referralId, newStatus) => {
    const updatedReferrals = referrals.map(referral => 
      referral.id === referralId 
        ? { ...referral, status: newStatus }
        : referral
    );
    setReferrals(updatedReferrals);
    
    // Close modal if it's open for the updated referral
    if (selectedReferral && selectedReferral.id === referralId) {
      setSelectedReferral({...selectedReferral, status: newStatus});
    }
    
    const statusMessages = {
      accepted: 'Referral accepted successfully!',
      declined: 'Referral declined',
      completed: 'Referral marked as completed!'
    };
    
    toast.success(statusMessages[newStatus] || `Referral status updated to ${newStatus}`);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Referral Tracking</h1>
          <p className="text-gray-600">Manage and track patient referrals</p>
        </div>
        <button
          onClick={handleNewReferral}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
        >
          <SafeIcon icon={FiPlus} />
          <span>New Referral</span>
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
              <p className="text-gray-600 text-sm">Total Referrals</p>
              <p className="text-2xl font-bold text-gray-900">{referrals.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <SafeIcon icon={FiUser} className="text-white text-xl" />
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
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {referrals.filter(r => r.status === 'pending').length}
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
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Accepted</p>
              <p className="text-2xl font-bold text-green-600">
                {referrals.filter(r => r.status === 'accepted').length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <SafeIcon icon={FiCalendar} className="text-white text-xl" />
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
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-2xl font-bold text-blue-600">
                {referrals.filter(r => r.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <SafeIcon icon={FiUser} className="text-white text-xl" />
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
              placeholder="Search referrals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex space-x-2">
              {['all', 'pending', 'accepted', 'declined', 'completed'].map((status) => (
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
            <div className="flex space-x-2">
              {['all', 'low', 'normal', 'high', 'urgent'].map((urgency) => (
                <button
                  key={urgency}
                  onClick={() => setUrgencyFilter(urgency)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    urgencyFilter === urgency
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {urgency}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Referrals List */}
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <button 
                    onClick={() => handleSort('id')}
                    className="flex items-center space-x-1 hover:text-blue-600"
                  >
                    <span>Referral ID</span>
                    {sortBy === 'id' && (
                      <span className="text-blue-600">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <button 
                    onClick={() => handleSort('patientName')}
                    className="flex items-center space-x-1 hover:text-blue-600"
                  >
                    <span>Patient</span>
                    {sortBy === 'patientName' && (
                      <span className="text-blue-600">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <button 
                    onClick={() => handleSort('referringDoctor')}
                    className="flex items-center space-x-1 hover:text-blue-600"
                  >
                    <span>Referring Doctor</span>
                    {sortBy === 'referringDoctor' && (
                      <span className="text-blue-600">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <button 
                    onClick={() => handleSort('specialist')}
                    className="flex items-center space-x-1 hover:text-blue-600"
                  >
                    <span>Specialist</span>
                    {sortBy === 'specialist' && (
                      <span className="text-blue-600">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <button 
                    onClick={() => handleSort('type')}
                    className="flex items-center space-x-1 hover:text-blue-600"
                  >
                    <span>Type</span>
                    {sortBy === 'type' && (
                      <span className="text-blue-600">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <button 
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-1 hover:text-blue-600"
                  >
                    <span>Status</span>
                    {sortBy === 'status' && (
                      <span className="text-blue-600">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <button 
                    onClick={() => handleSort('urgency')}
                    className="flex items-center space-x-1 hover:text-blue-600"
                  >
                    <span>Urgency</span>
                    {sortBy === 'urgency' && (
                      <span className="text-blue-600">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedReferrals.map((referral) => (
                <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {referral.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {referral.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{referral.patientName}</p>
                        <p className="text-sm text-gray-600">{referral.patientPhone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{referral.referringDoctor}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{referral.specialist}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{referral.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(referral.status)}`}>
                      {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${getUrgencyColor(referral.urgency)}`}>
                      {referral.urgency.charAt(0).toUpperCase() + referral.urgency.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewReferral(referral)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <SafeIcon icon={FiEye} />
                      </button>
                      <button
                        onClick={() => handleEditReferral(referral)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Referral"
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedReferrals.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiUser} className="text-gray-300 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No referrals found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={handleNewReferral}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Create First Referral
            </button>
          </div>
        )}
      </motion.div>

      {/* Referral Detail Modal */}
      {selectedReferral && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedReferral(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Referral Details</h3>
                <button
                  onClick={() => setSelectedReferral(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <SafeIcon icon={FiX} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Patient Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="text-gray-900 font-medium">{selectedReferral.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900">{selectedReferral.patientPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900">{selectedReferral.patientEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="text-gray-900">{selectedReferral.patientAddress}</p>
                  </div>
                </div>
              </div>

              {/* Referral Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Referral Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Referral ID</p>
                    <p className="text-gray-900 font-medium">{selectedReferral.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedReferral.status)}`}>
                      {selectedReferral.status.charAt(0).toUpperCase() + selectedReferral.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Referring Doctor</p>
                    <p className="text-gray-900">{selectedReferral.referringDoctor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Specialist</p>
                    <p className="text-gray-900">{selectedReferral.specialist}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="text-gray-900">{selectedReferral.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Urgency</p>
                    <span className={`font-semibold ${getUrgencyColor(selectedReferral.urgency)}`}>
                      {selectedReferral.urgency.charAt(0).toUpperCase() + selectedReferral.urgency.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clinical Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Clinical Information</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Symptoms</p>
                    <p className="text-gray-900">{selectedReferral.symptoms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="text-gray-900">{selectedReferral.notes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Insurance</p>
                    <p className="text-gray-900">{selectedReferral.insurance}</p>
                  </div>
                </div>
              </div>

              {/* Status Actions */}
              {selectedReferral.status === 'pending' && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Actions</h4>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleUpdateStatus(selectedReferral.id, 'accepted')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Accept Referral
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedReferral.id, 'declined')}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Decline Referral
                    </button>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedReferral(null)}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* New Referral Modal */}
      {showNewReferral && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleCancelNew}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">New Referral</h3>
                <button
                  onClick={handleCancelNew}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <SafeIcon icon={FiX} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Patient Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Patient Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                      <input
                        type="text"
                        value={newReferral.patientName}
                        onChange={(e) => setNewReferral({ ...newReferral, patientName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={newReferral.patientEmail}
                        onChange={(e) => setNewReferral({ ...newReferral, patientEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="patient@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={newReferral.patientPhone}
                        onChange={(e) => setNewReferral({ ...newReferral, patientPhone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={newReferral.preferredDate}
                        onChange={(e) => setNewReferral({ ...newReferral, preferredDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Referral Details */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Referral Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Referring Doctor</label>
                      <input
                        type="text"
                        value={newReferral.referringDoctor}
                        onChange={(e) => setNewReferral({ ...newReferral, referringDoctor: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Dr. Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialist</label>
                      <input
                        type="text"
                        value={newReferral.specialist}
                        onChange={(e) => setNewReferral({ ...newReferral, specialist: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Specialist name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialty Type</label>
                      <select
                        value={newReferral.type}
                        onChange={(e) => setNewReferral({ ...newReferral, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select specialty</option>
                        {specialtyOptions.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                      <select
                        value={newReferral.urgency}
                        onChange={(e) => setNewReferral({ ...newReferral, urgency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {urgencyOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Notes</label>
                  <textarea
                    value={newReferral.notes}
                    onChange={(e) => setNewReferral({ ...newReferral, notes: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter clinical notes, symptoms, and treatment recommendations..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={handleSaveReferral}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Referral
                </button>
                <button
                  onClick={handleCancelNew}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Referral Modal */}
      {showEditReferral && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleCancelEdit}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Edit Referral</h3>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <SafeIcon icon={FiX} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Patient Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Patient Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                      <input
                        type="text"
                        value={newReferral.patientName}
                        onChange={(e) => setNewReferral({ ...newReferral, patientName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={newReferral.patientEmail}
                        onChange={(e) => setNewReferral({ ...newReferral, patientEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="patient@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={newReferral.patientPhone}
                        onChange={(e) => setNewReferral({ ...newReferral, patientPhone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={newReferral.preferredDate}
                        onChange={(e) => setNewReferral({ ...newReferral, preferredDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Referral Details */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Referral Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Referring Doctor</label>
                      <input
                        type="text"
                        value={newReferral.referringDoctor}
                        onChange={(e) => setNewReferral({ ...newReferral, referringDoctor: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Dr. Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialist</label>
                      <input
                        type="text"
                        value={newReferral.specialist}
                        onChange={(e) => setNewReferral({ ...newReferral, specialist: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Specialist name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialty Type</label>
                      <select
                        value={newReferral.type}
                        onChange={(e) => setNewReferral({ ...newReferral, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select specialty</option>
                        {specialtyOptions.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                      <select
                        value={newReferral.urgency}
                        onChange={(e) => setNewReferral({ ...newReferral, urgency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {urgencyOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Notes</label>
                  <textarea
                    value={newReferral.notes}
                    onChange={(e) => setNewReferral({ ...newReferral, notes: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter clinical notes, symptoms, and treatment recommendations..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={handleUpdateReferral}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Update Referral
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default ReferralTracking;