import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { verificationService } from '../../services/VerificationService';
import VerificationButton from './VerificationButton';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const { 
  FiShield, FiClock, FiCheck, FiX, FiAlertTriangle, FiRefreshCw, 
  FiFilter, FiDownload, FiPlay, FiPause, FiSkipForward, FiSearch 
} = FiIcons;

function VerificationDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState('queue');
  const [selectedItems, setSelectedItems] = useState([]);
  const [autoProcess, setAutoProcess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    priority: '',
    riskLevel: ''
  });
  const [batchProgress, setBatchProgress] = useState(null);

  useEffect(() => {
    loadVerificationData();
  }, []);

  const loadVerificationData = async () => {
    try {
      setLoading(true);
      const [statsData, queueData, historyData] = await Promise.all([
        verificationService.getVerificationStats(),
        verificationService.getVerificationQueue(),
        verificationService.getVerificationHistory(20)
      ]);

      setStats(statsData);
      setQueue(queueData);
      setHistory(historyData);
    } catch (error) {
      console.error('Failed to load verification data:', error);
      toast.error('Failed to load verification data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getFilteredData = () => {
    if (selectedTab === 'queue') {
      return searchTerm || Object.values(filters).some(f => f) 
        ? verificationService.searchVerificationQueue(searchTerm, filters)
        : queue;
    } else {
      return searchTerm || Object.values(filters).some(f => f)
        ? verificationService.searchVerificationHistory(searchTerm, filters)
        : history;
    }
  };

  const handleBatchVerification = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items to verify');
      return;
    }

    try {
      toast.loading('Starting batch verification...', { id: 'batch-verify' });
      setBatchProgress({ current: 0, total: selectedItems.length, percentage: 0 });
      
      const result = await verificationService.batchVerify(selectedItems, (progress) => {
        setBatchProgress(progress);
        toast.loading(`Processing ${progress.current}/${progress.total} (${progress.percentage}%)`, { id: 'batch-verify' });
      });
      
      setBatchProgress(null);
      
      if (result.success) {
        const { successful, failed } = result.summary;
        toast.success(`Batch verification completed: ${successful} successful, ${failed} failed`, { id: 'batch-verify' });
        setSelectedItems([]);
        loadVerificationData();
      } else {
        toast.error('Batch verification failed', { id: 'batch-verify' });
      }
    } catch (error) {
      setBatchProgress(null);
      toast.error('Batch verification failed', { id: 'batch-verify' });
    }
  };

  const handleSingleVerification = async (item) => {
    try {
      const result = await verificationService.updateVerificationStatus(
        item.id, 
        'in_progress'
      );

      if (result.success) {
        // Simulate verification process
        setTimeout(async () => {
          await verificationService.updateVerificationStatus(
            item.id, 
            'verified'
          );
          toast.success(`${item.type} verification completed`);
          loadVerificationData();
        }, 2000);
      }
    } catch (error) {
      toast.error('Verification failed');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'normal':
        return 'text-blue-600';
      case 'low':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'insurance':
        return FiShield;
      case 'patient_identity':
        return FiCheck;
      case 'document':
        return FiX;
      default:
        return FiShield;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Center</h1>
          <p className="text-gray-600">Manage insurance, identity, and document verifications</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBatchVerification}
            disabled={selectedItems.length === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlay} />
            <span>Batch Verify ({selectedItems.length})</span>
          </button>
          
          <button
            onClick={loadVerificationData}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiRefreshCw} />
            <span>Refresh</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Queue</p>
              <p className="text-2xl font-bold text-orange-600">{stats.queued}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              <SafeIcon icon={FiClock} className="text-white text-xl" />
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
              <p className="text-gray-600 text-sm">Verified Today</p>
              <p className="text-2xl font-bold text-green-600">{stats.today}</p>
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
              <p className="text-gray-600 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-blue-600">{stats.successRate}%</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <SafeIcon icon={FiShield} className="text-white text-xl" />
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
              <p className="text-gray-600 text-sm">Avg Time</p>
              <p className="text-2xl font-bold text-purple-600">{stats.averageTime}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <SafeIcon icon={FiClock} className="text-white text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="border-b border-gray-200"
      >
        <nav className="flex space-x-8">
          {[
            { id: 'queue', label: 'Verification Queue', count: queue.length },
            { id: 'history', label: 'History', count: history.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SafeIcon icon={FiSearch} className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search verifications..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="insurance">Insurance</option>
              <option value="patient_identity">Identity</option>
              <option value="document">Document</option>
            </select>
            
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="verified">Verified</option>
              <option value="failed">Failed</option>
            </select>
            
            {selectedTab === 'queue' && (
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Priority</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            )}
            
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({ type: '', status: '', priority: '', riskLevel: '' });
              }}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
        
        {/* Batch Actions */}
        {selectedTab === 'queue' && selectedItems.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-700">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleBatchVerification}
                  disabled={batchProgress !== null}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {batchProgress ? `Processing ${batchProgress.percentage}%` : 'Verify Selected'}
                </button>
                <button
                  onClick={() => setSelectedItems([])}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>
            {batchProgress && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${batchProgress.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Processing {batchProgress.currentItem}... ({batchProgress.current}/{batchProgress.total})
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {selectedTab === 'queue' ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            {(() => {
              const filteredQueue = getFilteredData();
              return filteredQueue.length === 0 ? (
                <div className="p-12 text-center">
                  <SafeIcon icon={FiCheck} className="text-gray-300 text-4xl mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {queue.length === 0 ? 'No pending verifications' : 'No matching verifications'}
                  </h3>
                  <p className="text-gray-600">
                    {queue.length === 0 ? 'All verifications are up to date' : 'Try adjusting your search or filters'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredQueue.map((item, index) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, item.id]);
                            } else {
                              setSelectedItems(selectedItems.filter(id => id !== item.id));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        
                        <div className={`p-3 rounded-lg bg-gray-100`}>
                          <SafeIcon icon={getTypeIcon(item.type)} className="text-gray-600 text-xl" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-gray-900">{item.patientName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status.replace('_', ' ')}
                            </span>
                            <span className={`text-sm font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority} priority
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-1">
                            {item.type.replace('_', ' ')} verification
                            {item.insuranceProvider && ` - ${item.insuranceProvider}`}
                          </p>
                          
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span>Requested {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
                            <span>Est. {item.estimatedTime}</span>
                            <span>By {item.requestedBy}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <VerificationButton
                          type={item.type}
                          patientId={item.patientId}
                          patientData={{
                            insuranceProvider: item.insuranceProvider,
                            policyNumber: item.policyNumber,
                            documentType: item.metadata?.documentType
                          }}
                          onVerificationComplete={() => {
                            loadVerificationData();
                            toast.success('Verification completed');
                          }}
                          size="small"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            {(() => {
              const filteredHistory = getFilteredData();
              return filteredHistory.length === 0 ? (
                <div className="p-12 text-center">
                  <SafeIcon icon={FiClock} className="text-gray-300 text-4xl mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {history.length === 0 ? 'No verification history' : 'No matching verifications'}
                  </h3>
                  <p className="text-gray-600">
                    {history.length === 0 ? 'Completed verifications will appear here' : 'Try adjusting your search or filters'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredHistory.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-green-100">
                          <SafeIcon icon={FiCheck} className="text-green-600 text-xl" />
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-gray-900">{item.patientName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-1">
                            {item.type.replace('_', ' ')} verification
                            {item.insuranceProvider && ` - ${item.insuranceProvider}`}
                          </p>
                          
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span>Completed {formatDistanceToNow(new Date(item.verifiedAt || item.completedAt), { addSuffix: true })}</span>
                            {item.verifiedBy && <span>By {item.verifiedBy}</span>}
                          </div>
                        </div>
                      </div>
                      
                      {item.result && (
                        <div className="text-right text-sm">
                          {item.result.coverage && (
                            <div className="text-green-600 font-medium">
                              {item.result.coverage}% coverage
                            </div>
                          )}
                          {item.result.approved !== undefined && (
                            <div className={item.result.approved ? 'text-green-600' : 'text-red-600'}>
                              {item.result.approved ? 'Approved' : 'Denied'}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default VerificationDashboard;