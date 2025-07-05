import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import toast from 'react-hot-toast';

const {
  FiSearch, FiPlus, FiEdit, FiTrash2, FiPhone, FiMail, FiCalendar,
  FiEye, FiX, FiUser, FiMapPin, FiCreditCard, FiSave, FiUserPlus,
  FiUsers
} = FiIcons;

function PatientManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-10',
      status: 'Active',
      dateOfBirth: '1985-03-15',
      address: '123 Main St, Springfield, IL 62701',
      insurance: 'Blue Cross Blue Shield',
      emergencyContact: 'Jane Smith - (555) 123-4568',
      totalVisits: 12,
      totalSpent: '$2,340',
      allergies: 'Penicillin',
      notes: 'Patient prefers morning appointments'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 987-6543',
      lastVisit: '2024-01-20',
      nextAppointment: '2024-02-15',
      status: 'Active',
      dateOfBirth: '1990-07-22',
      address: '456 Oak Ave, Springfield, IL 62702',
      insurance: 'Aetna',
      emergencyContact: 'Mike Johnson - (555) 987-6544',
      totalVisits: 8,
      totalSpent: '$1,680',
      allergies: 'None',
      notes: 'Anxious patient - prefers sedation'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '(555) 456-7890',
      lastVisit: '2023-12-10',
      nextAppointment: null,
      status: 'Inactive',
      dateOfBirth: '1978-11-03',
      address: '789 Pine St, Springfield, IL 62703',
      insurance: 'Cigna',
      emergencyContact: 'Lisa Wilson - (555) 456-7891',
      totalVisits: 15,
      totalSpent: '$3,200',
      allergies: 'Latex',
      notes: 'Requires antibiotic premedication'
    }
  ]);

  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    insurance: '',
    emergencyContact: '',
    allergies: '',
    notes: ''
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
  };

  const handleEditPatient = (patient) => {
    // Set up edit mode
    setNewPatient({
      firstName: patient.name.split(' ')[0],
      lastName: patient.name.split(' ')[1],
      email: patient.email,
      phone: patient.phone,
      dateOfBirth: patient.dateOfBirth,
      address: patient.address,
      insurance: patient.insurance,
      emergencyContact: patient.emergencyContact,
      allergies: patient.allergies || '',
      notes: patient.notes || ''
    });
    setSelectedPatient(patient);
    setShowAddPatient(true);
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(prev => prev.filter(p => p.id !== patientId));
      toast.success('Patient deleted successfully');
    }
  };

  const handleAddPatient = () => {
    setNewPatient({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      insurance: '',
      emergencyContact: '',
      allergies: '',
      notes: ''
    });
    setSelectedPatient(null);
    setShowAddPatient(true);
  };

  const handleSavePatient = () => {
    if (!newPatient.firstName || !newPatient.lastName || !newPatient.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    const patientData = {
      id: selectedPatient ? selectedPatient.id : Date.now(),
      name: `${newPatient.firstName} ${newPatient.lastName}`,
      email: newPatient.email,
      phone: newPatient.phone,
      dateOfBirth: newPatient.dateOfBirth,
      address: newPatient.address,
      insurance: newPatient.insurance,
      emergencyContact: newPatient.emergencyContact,
      allergies: newPatient.allergies,
      notes: newPatient.notes,
      status: 'Active',
      lastVisit: selectedPatient ? selectedPatient.lastVisit : null,
      nextAppointment: selectedPatient ? selectedPatient.nextAppointment : null,
      totalVisits: selectedPatient ? selectedPatient.totalVisits : 0,
      totalSpent: selectedPatient ? selectedPatient.totalSpent : '$0'
    };

    if (selectedPatient) {
      // Update existing patient
      setPatients(prev => prev.map(p => p.id === selectedPatient.id ? patientData : p));
      toast.success('Patient updated successfully');
    } else {
      // Add new patient
      setPatients(prev => [...prev, patientData]);
      toast.success('Patient added successfully');
    }

    setShowAddPatient(false);
    setSelectedPatient(null);
    setNewPatient({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      insurance: '',
      emergencyContact: '',
      allergies: '',
      notes: ''
    });
  };

  const handleScheduleAppointment = (patient) => {
    navigate('schedule', { state: { patientId: patient.id, patientName: patient.name } });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Management</h1>
          <p className="text-gray-600">Manage your patients and their information</p>
        </div>
        <button
          onClick={handleAddPatient}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
        >
          <SafeIcon icon={FiUserPlus} />
          <span>Add Patient</span>
        </button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.1}}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <SafeIcon icon={FiUsers} className="text-white text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.2}}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Patients</p>
              <p className="text-2xl font-bold text-green-600">
                {patients.filter(p => p.status === 'Active').length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <SafeIcon icon={FiUser} className="text-white text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.3}}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Appointments Today</p>
              <p className="text-2xl font-bold text-purple-600">
                {patients.filter(p => p.nextAppointment && new Date(p.nextAppointment).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <SafeIcon icon={FiCalendar} className="text-white text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.4}}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">New This Month</p>
              <p className="text-2xl font-bold text-orange-600">
                {patients.filter(p => {
                  const lastVisit = new Date(p.lastVisit);
                  const currentMonth = new Date().getMonth();
                  return lastVisit.getMonth() === currentMonth;
                }).length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              <SafeIcon icon={FiUserPlus} className="text-white text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.5}}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <div className="relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Patients Grid */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.6}}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.7 + index * 0.1}}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
          >
            {/* Patient Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-600">ID: {patient.id.toString().padStart(4, '0')}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {patient.status}
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiMail} className="mr-2 text-xs" />
                <span className="truncate">{patient.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiPhone} className="mr-2 text-xs" />
                <span>{patient.phone}</span>
              </div>
            </div>

            {/* Visit Info */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-600">Last Visit</p>
                <p className="font-medium text-gray-900">
                  {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'Never'}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Total Visits</p>
                <p className="font-medium text-gray-900">{patient.totalVisits}</p>
              </div>
            </div>

            {/* Next Appointment */}
            {patient.nextAppointment ? (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center text-sm">
                  <SafeIcon icon={FiCalendar} className="mr-2 text-blue-600" />
                  <span className="text-blue-800">
                    Next: {new Date(patient.nextAppointment).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <button
                  onClick={() => handleScheduleAppointment(patient)}
                  className="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                >
                  Schedule Appointment
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => handleViewPatient(patient)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                title="View Details"
              >
                <SafeIcon icon={FiEye} />
              </button>
              <button
                onClick={() => handleEditPatient(patient)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit Patient"
              >
                <SafeIcon icon={FiEdit} />
              </button>
              <button
                onClick={() => handleDeletePatient(patient.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                title="Delete Patient"
              >
                <SafeIcon icon={FiTrash2} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredPatients.length === 0 && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          className="text-center py-12"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12">
            <SafeIcon icon={FiUser} className="text-gray-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or add your first patient.</p>
            <button
              onClick={handleAddPatient}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Add Patient
            </button>
          </div>
        </motion.div>
      )}

      {/* Patient Detail Modal */}
      {selectedPatient && !showAddPatient && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPatient(null)}
        >
          <motion.div
            initial={{scale: 0.95, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h3>
                    <p className="text-gray-600">Patient ID: {selectedPatient.id.toString().padStart(4, '0')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <SafeIcon icon={FiX} className="text-xl" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <SafeIcon icon={FiMail} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-900">{selectedPatient.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SafeIcon icon={FiPhone} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-gray-900">{selectedPatient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SafeIcon icon={FiMapPin} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-gray-900">{selectedPatient.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SafeIcon icon={FiUser} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Emergency Contact</p>
                      <p className="text-gray-900">{selectedPatient.emergencyContact}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Medical Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="text-gray-900">{new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Insurance</p>
                    <p className="text-gray-900">{selectedPatient.insurance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Allergies</p>
                    <p className="text-gray-900">{selectedPatient.allergies}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedPatient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedPatient.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Visit History */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Visit History</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Visits</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedPatient.totalVisits}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-green-600">{selectedPatient.totalSpent}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Last Visit</p>
                    <p className="text-lg font-semibold text-purple-600">
                      {selectedPatient.lastVisit ? new Date(selectedPatient.lastVisit).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Notes</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900">{selectedPatient.notes || 'No notes available'}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleEditPatient(selectedPatient)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Edit Patient
                </button>
                <button
                  onClick={() => handleScheduleAppointment(selectedPatient)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Schedule Appointment
                </button>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add/Edit Patient Modal */}
      {showAddPatient && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddPatient(false)}
        >
          <motion.div
            initial={{scale: 0.95, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedPatient ? 'Edit Patient' : 'Add New Patient'}
                </h3>
                <button
                  onClick={() => setShowAddPatient(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <SafeIcon icon={FiX} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      value={newPatient.firstName}
                      onChange={(e) => setNewPatient({...newPatient, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={newPatient.lastName}
                      onChange={(e) => setNewPatient({...newPatient, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={newPatient.dateOfBirth}
                    onChange={(e) => setNewPatient({...newPatient, dateOfBirth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
                    <input
                      type="text"
                      value={newPatient.insurance}
                      onChange={(e) => setNewPatient({...newPatient, insurance: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                    <input
                      type="text"
                      value={newPatient.emergencyContact}
                      onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                  <input
                    type="text"
                    value={newPatient.allergies}
                    onChange={(e) => setNewPatient({...newPatient, allergies: e.target.value})}
                    placeholder="e.g., Penicillin, Latex"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={newPatient.notes}
                    onChange={(e) => setNewPatient({...newPatient, notes: e.target.value})}
                    rows={3}
                    placeholder="Additional notes about the patient..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={handleSavePatient}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiSave} />
                  <span>{selectedPatient ? 'Update Patient' : 'Save Patient'}</span>
                </button>
                <button
                  onClick={() => setShowAddPatient(false)}
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

export default PatientManagement;