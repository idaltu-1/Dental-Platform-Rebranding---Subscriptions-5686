import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiVideo, FiPhone, FiCalendar, FiUsers, FiFileText, FiShield,
  FiMonitor, FiMic, FiCamera, FiSettings, FiClock, FiCheck,
  FiX, FiPlay, FiPause, FiVolumeX, FiVolume2, FiMaximize,
  FiMessageCircle, FiHeart, FiActivity, FiZap, FiStar
} = FiIcons;

function TelemedicineHub() {
  const [activeCall, setActiveCall] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [callQueue, setCallQueue] = useState([]);

  const upcomingConsultations = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '2:00 PM',
      type: 'Follow-up',
      status: 'confirmed',
      duration: 30,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      patient: 'Michael Chen',
      time: '2:30 PM',
      type: 'Initial Consultation',
      status: 'waiting',
      duration: 45,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      patient: 'Emily Rodriguez',
      time: '3:15 PM',
      type: 'Emergency',
      status: 'urgent',
      duration: 20,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      patient: 'David Wilson',
      time: '4:00 PM',
      type: 'Treatment Review',
      status: 'confirmed',
      duration: 25,
      avatar: '/api/placeholder/40/40'
    }
  ];

  const telemedicineFeatures = [
    {
      icon: FiVideo,
      title: 'HD Video Consultations',
      description: 'Crystal clear video calls with advanced audio processing',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FiShield,
      title: 'HIPAA Compliant',
      description: 'End-to-end encryption and secure data transmission',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FiFileText,
      title: 'Digital Prescriptions',
      description: 'Send prescriptions directly to patient pharmacy',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FiHeart,
      title: 'Remote Monitoring',
      description: 'Track patient vitals and recovery progress',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: FiZap,
      title: 'AI Diagnostics',
      description: 'AI-powered symptom analysis and treatment suggestions',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: FiActivity,
      title: 'Real-time Collaboration',
      description: 'Consult with specialists during patient calls',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const callQueueStatus = [
    { id: 1, patient: 'Anna Martinez', waiting: '5 min', priority: 'high' },
    { id: 2, patient: 'Robert Kim', waiting: '12 min', priority: 'medium' },
    { id: 3, patient: 'Lisa Thompson', waiting: '8 min', priority: 'low' }
  ];

  const handleStartCall = (patient) => {
    setActiveCall({
      patient: patient.patient,
      startTime: new Date(),
      type: patient.type,
      status: 'active'
    });
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Telemedicine Hub</h1>
            <p className="text-gray-600">Secure virtual consultations with advanced diagnostic tools</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
              Start New Consultation
            </button>
          </div>
        </div>
      </motion.div>

      {/* Active Call Interface */}
      {activeCall && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 rounded-xl p-6 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleEndCall}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
            >
              <SafeIcon icon={FiX} className="text-lg" />
            </button>
          </div>
          
          <div className="flex items-center justify-between text-white mb-6">
            <div>
              <h3 className="text-xl font-bold">{activeCall.patient}</h3>
              <p className="text-gray-300">{activeCall.type}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Live</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg aspect-video mb-4 flex items-center justify-center">
            <div className="text-center">
              <SafeIcon icon={FiVideo} className="text-4xl text-gray-400 mb-2" />
              <p className="text-gray-400">Video call in progress</p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors">
              <SafeIcon icon={FiMic} className="text-lg" />
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors">
              <SafeIcon icon={FiCamera} className="text-lg" />
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors">
              <SafeIcon icon={FiMonitor} className="text-lg" />
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors">
              <SafeIcon icon={FiMessageCircle} className="text-lg" />
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Upcoming Consultations */}
        <div className="xl:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Today's Consultations</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Schedule
              </button>
            </div>

            <div className="space-y-4">
              {upcomingConsultations.map((consultation, index) => (
                <motion.div
                  key={consultation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiUsers} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{consultation.patient}</h3>
                      <p className="text-sm text-gray-600">{consultation.type} • {consultation.duration} min</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{consultation.time}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(consultation.status)}`}>
                        {consultation.status}
                      </span>
                    </div>
                    <button
                      onClick={() => handleStartCall(consultation)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                    >
                      <SafeIcon icon={FiVideo} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            {telemedicineFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  <SafeIcon icon={feature.icon} className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Call Queue */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Call Queue</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {callQueueStatus.length} waiting
              </span>
            </div>

            <div className="space-y-3">
              {callQueueStatus.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`p-3 rounded-lg border-l-4 ${getPriorityColor(item.priority)}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.patient}</p>
                      <p className="text-xs text-gray-600">Waiting: {item.waiting}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <SafeIcon icon={FiPhone} className="text-sm" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiVideo} className="text-blue-500" />
                  <span className="text-sm text-gray-600">Consultations</span>
                </div>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiClock} className="text-green-500" />
                  <span className="text-sm text-gray-600">Avg. Duration</span>
                </div>
                <span className="font-semibold text-gray-900">24 min</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiStar} className="text-yellow-500" />
                  <span className="text-sm text-gray-600">Satisfaction</span>
                </div>
                <span className="font-semibold text-gray-900">4.8/5</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                Schedule Consultation
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Send Prescription
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Patient Records
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default TelemedicineHub;