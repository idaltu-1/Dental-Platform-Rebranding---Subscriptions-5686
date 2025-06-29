import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { scheduleService } from '../../services/ScheduleService';
import { format, addDays, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import toast from 'react-hot-toast';

const {
  FiCalendar, FiPlus, FiEdit, FiTrash2, FiClock, FiUser,
  FiChevronLeft, FiChevronRight, FiGrid, FiList
} = FiIcons;

function ScheduleScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    loadAppointments();
  }, [currentDate, viewMode]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await scheduleService.getAppointments(currentDate, viewMode);
      setAppointments(data);
    } catch (error) {
      console.error('Failed to load appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }
    setCurrentDate(newDate);
  };

  const getDateRange = () => {
    switch (viewMode) {
      case 'day':
        return format(currentDate, 'EEEE, MMMM dd, yyyy');
      case 'week':
        const start = startOfWeek(currentDate);
        const end = endOfWeek(currentDate);
        return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd, yyyy')}`;
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      default:
        return '';
    }
  };

  const getAppointmentColor = (type) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'treatment': return 'bg-green-100 border-green-300 text-green-800';
      case 'follow-up': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'emergency': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const handleCreateAppointment = () => {
    setSelectedAppointment(null);
    setShowAppointmentModal(true);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (!confirm('Are you sure you want to delete this appointment?')) {
      return;
    }

    try {
      await scheduleService.deleteAppointment(appointmentId);
      toast.success('Appointment deleted successfully');
      loadAppointments();
    } catch (error) {
      console.error('Failed to delete appointment:', error);
      toast.error('Failed to delete appointment');
    }
  };

  const renderDayView = () => {
    const dayAppointments = appointments.filter(apt =>
      isSameDay(new Date(apt.start), currentDate)
    );
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'EEEE, MMMM dd, yyyy')}
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {hours.map(hour => {
            const hourAppointments = dayAppointments.filter(apt =>
              new Date(apt.start).getHours() === hour
            );

            return (
              <div key={hour} className="flex">
                <div className="w-20 p-4 text-sm text-gray-500 border-r border-gray-100">
                  {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
                <div className="flex-1 p-4 min-h-16">
                  {hourAppointments.map(appointment => (
                    <div
                      key={appointment.id}
                      className={`p-3 rounded-lg border-l-4 mb-2 ${getAppointmentColor(appointment.type)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{appointment.title}</h4>
                          <p className="text-sm opacity-75">{appointment.patientName}</p>
                          <p className="text-xs opacity-60">
                            {format(new Date(appointment.start), 'h:mm a')} - {format(new Date(appointment.end), 'h:mm a')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditAppointment(appointment)}
                            className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <SafeIcon icon={FiEdit} className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <SafeIcon icon={FiTrash2} className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Week header */}
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-4 border-r border-gray-200"></div>
          {weekDays.map(day => (
            <div key={day.toISOString()} className="p-4 text-center border-r border-gray-200 last:border-r-0">
              <div className="text-sm text-gray-500">{format(day, 'EEE')}</div>
              <div className={`text-lg font-semibold ${
                isSameDay(day, new Date()) ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>

        {/* Week content */}
        <div className="max-h-96 overflow-y-auto">
          {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b border-gray-100 min-h-16">
              <div className="p-2 text-sm text-gray-500 border-r border-gray-200 flex items-center">
                {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </div>
              {weekDays.map(day => {
                const dayAppointments = appointments.filter(apt =>
                  isSameDay(new Date(apt.start), day) && new Date(apt.start).getHours() === hour
                );

                return (
                  <div key={day.toISOString()} className="p-1 border-r border-gray-200 last:border-r-0">
                    {dayAppointments.map(appointment => (
                      <div
                        key={appointment.id}
                        className={`p-2 rounded text-xs mb-1 ${getAppointmentColor(appointment.type)}`}
                      >
                        <div className="font-medium truncate">{appointment.patientName}</div>
                        <div className="truncate">{appointment.title}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const sortedAppointments = [...appointments].sort((a, b) =>
      new Date(a.start) - new Date(b.start)
    );

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {sortedAppointments.map(appointment => (
            <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    appointment.type === 'consultation' ? 'bg-blue-500' :
                    appointment.type === 'treatment' ? 'bg-green-500' :
                    appointment.type === 'follow-up' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{appointment.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <SafeIcon icon={FiUser} className="mr-1" />
                        {appointment.patientName}
                      </span>
                      <span className="flex items-center">
                        <SafeIcon icon={FiClock} className="mr-1" />
                        {format(new Date(appointment.start), 'MMM dd, h:mm a')}
                      </span>
                      <span className="flex items-center">
                        <SafeIcon icon={FiCalendar} className="mr-1" />
                        {appointment.doctorName}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status}
                  </span>
                  <button
                    onClick={() => handleEditAppointment(appointment)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiEdit} />
                  </button>
                  <button
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="p-12 text-center">
              <SafeIcon icon={FiCalendar} className="text-gray-300 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments scheduled</h3>
              <p className="text-gray-600">Create your first appointment to get started</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule</h1>
          <p className="text-gray-600">Manage appointments and availability</p>
        </div>
        <button
          onClick={handleCreateAppointment}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
        >
          <SafeIcon icon={FiPlus} />
          <span>New Appointment</span>
        </button>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between bg-white rounded-xl shadow-lg border border-gray-100 p-4"
      >
        {/* Date Navigation */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateDate('prev')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiChevronLeft} />
          </button>
          <div className="text-lg font-semibold text-gray-900 min-w-64 text-center">
            {getDateRange()}
          </div>
          <button
            onClick={() => navigateDate('next')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiChevronRight} />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Today
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          {[
            { value: 'day', label: 'Day', icon: FiClock },
            { value: 'week', label: 'Week', icon: FiGrid },
            { value: 'list', label: 'List', icon: FiList }
          ].map(view => (
            <button
              key={view.value}
              onClick={() => setViewMode(view.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded transition-all ${
                viewMode === view.value
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <SafeIcon icon={view.icon} />
              <span className="font-medium">{view.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Schedule Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {viewMode === 'day' && renderDayView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'list' && renderListView()}
      </motion.div>
    </div>
  );
}

export default ScheduleScreen;