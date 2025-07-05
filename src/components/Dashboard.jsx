import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import QuickActions from './dashboard/QuickActions';
import toast from 'react-hot-toast';

const {
  FiCalendar, FiUsers, FiTrendingUp, FiDollarSign, FiClock, FiCheckCircle,
  FiEye, FiEdit, FiPlus, FiArrowRight, FiPhone, FiMail
} = FiIcons;

function Dashboard() {
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const stats = [
    {
      title: 'Total Patients',
      value: '1,247',
      change: '+12%',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      onClick: () => navigate('patients')
    },
    {
      title: 'Today\'s Appointments',
      value: '28',
      change: '+5%',
      icon: FiCalendar,
      color: 'from-green-500 to-green-600',
      onClick: () => navigate('schedule')
    },
    {
      title: 'Monthly Revenue',
      value: '$24,500',
      change: '+18%',
      icon: FiDollarSign,
      color: 'from-purple-500 to-purple-600',
      onClick: () => navigate('analytics')
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+2%',
      icon: FiCheckCircle,
      color: 'from-orange-500 to-orange-600',
      onClick: () => navigate('analytics')
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: 'John Smith',
      time: '09:00 AM',
      treatment: 'Cleaning',
      status: 'confirmed',
      phone: '(555) 123-4567',
      email: 'john.smith@email.com',
      notes: 'Regular cleaning appointment',
      duration: '60 minutes'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      time: '10:30 AM',
      treatment: 'Root Canal',
      status: 'in-progress',
      phone: '(555) 987-6543',
      email: 'sarah.j@email.com',
      notes: 'Second session for root canal therapy',
      duration: '90 minutes'
    },
    {
      id: 3,
      patient: 'Mike Wilson',
      time: '02:00 PM',
      treatment: 'Checkup',
      status: 'scheduled',
      phone: '(555) 456-7890',
      email: 'mike.wilson@email.com',
      notes: 'Annual checkup and cleaning',
      duration: '45 minutes'
    },
    {
      id: 4,
      patient: 'Emma Davis',
      time: '03:30 PM',
      treatment: 'Whitening',
      status: 'confirmed',
      phone: '(555) 321-0987',
      email: 'emma.davis@email.com',
      notes: 'Teeth whitening consultation',
      duration: '30 minutes'
    }
  ];

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleEditAppointment = (appointment) => {
    navigate('schedule', { state: { editAppointment: appointment } });
  };

  const handleViewAllAppointments = () => {
    navigate('schedule');
  };

  const handleCreateAppointment = () => {
    navigate('schedule', { state: { createNew: true } });
  };

  const handleStatClick = (stat) => {
    toast.loading('Loading...', { id: 'stat-loading' });
    setTimeout(() => {
      toast.dismiss('stat-loading');
      stat.onClick();
      toast.success(`Opened ${stat.title}`);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">{"Welcome back! Here's what's happening at your practice today."}</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.1}}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300"
            onClick={() => handleStatClick(stat)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <SafeIcon icon={stat.icon} className="text-white text-lg sm:text-xl" />
              </div>
              <span className="text-green-600 text-xs sm:text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-xs sm:text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Appointments */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.5}}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Today&apos;s Appointments</h2>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center text-gray-600">
              <SafeIcon icon={FiClock} className="mr-2" />
              <span className="text-xs sm:text-sm">Last updated: 2 mins ago</span>
            </div>
            <button
              onClick={handleCreateAppointment}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiPlus} />
              <span>New</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {recentAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.6 + index * 0.1}}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors space-y-3 sm:space-y-0"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {appointment.patient.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 truncate">{appointment.patient}</h4>
                  <p className="text-gray-600 text-sm truncate">{appointment.treatment}</p>
                  <p className="text-gray-500 text-xs">{appointment.duration}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:space-x-4 space-y-2 sm:space-y-0">
                <div className="text-left sm:text-right">
                  <span className="text-gray-700 font-medium">{appointment.time}</span>
                  <div className="flex items-center justify-start sm:justify-end mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewAppointment(appointment)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <SafeIcon icon={FiEye} />
                  </button>
                  <button
                    onClick={() => handleEditAppointment(appointment)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit Appointment"
                  >
                    <SafeIcon icon={FiEdit} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleViewAllAppointments}
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
          >
            <span>View All Appointments</span>
            <SafeIcon icon={FiArrowRight} />
          </button>
        </div>
      </motion.div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAppointment(null)}
        >
          <motion.div
            initial={{scale: 0.95, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Appointment Details</h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <SafeIcon icon={FiClock} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Patient</label>
                <p className="text-lg font-semibold text-gray-900">{selectedAppointment.patient}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Time</label>
                  <p className="text-gray-900">{selectedAppointment.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Duration</label>
                  <p className="text-gray-900">{selectedAppointment.duration}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Treatment</label>
                <p className="text-gray-900">{selectedAppointment.treatment}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Contact</label>
                <div className="flex items-center space-x-2 mt-1">
                  <SafeIcon icon={FiPhone} className="text-gray-500" />
                  <p className="text-gray-900">{selectedAppointment.phone}</p>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <SafeIcon icon={FiMail} className="text-gray-500" />
                  <p className="text-gray-600 text-sm">{selectedAppointment.email}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Notes</label>
                <p className="text-gray-900">{selectedAppointment.notes}</p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  onClick={() => handleEditAppointment(selectedAppointment)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Edit Appointment
                </button>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;