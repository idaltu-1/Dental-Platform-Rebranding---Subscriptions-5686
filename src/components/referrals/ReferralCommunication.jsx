import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { referralService } from '../../services/ReferralService';

const { FiSend, FiPaperclip, FiUser, FiClock, FiX, FiMessageSquare } = FiIcons;

function ReferralCommunication({ referralId, isOpen, onClose, referralData }) {
  const [communications, setCommunications] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (isOpen && referralId) {
      loadCommunications();
    }
  }, [isOpen, referralId]);

  const loadCommunications = async () => {
    try {
      setIsLoading(true);
      const data = await referralService.getReferralCommunications(referralId);
      setCommunications(data);
    } catch (error) {
      console.error('Failed to load communications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setIsSending(true);
      const communicationData = {
        from: 'Current User', // In real app, get from auth context
        to: referralData?.specialist || 'Specialist',
        message: newMessage.trim(),
        type: 'message'
      };

      const newCommunication = await referralService.addCommunication(referralId, communicationData);
      setCommunications(prev => [...prev, newCommunication]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 border-red-200 text-red-800';
      case 'response': return 'bg-green-100 border-green-200 text-green-800';
      case 'update': return 'bg-blue-100 border-blue-200 text-blue-800';
      default: return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <SafeIcon icon={FiMessageSquare} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Communication</h3>
                <p className="text-sm text-gray-600">
                  Referral {referralId} - {referralData?.patientName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading messages...</p>
            </div>
          ) : communications.length === 0 ? (
            <div className="text-center py-8">
              <SafeIcon icon={FiMessageSquare} className="text-gray-300 text-4xl mx-auto mb-4" />
              <p className="text-gray-600">No messages yet</p>
              <p className="text-sm text-gray-500 mt-1">Start the conversation by sending a message</p>
            </div>
          ) : (
            communications.map((comm) => (
              <motion.div
                key={comm.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border rounded-lg p-4 ${getMessageTypeColor(comm.type)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiUser} className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{comm.from}</p>
                      <p className="text-xs text-gray-600">to {comm.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <SafeIcon icon={FiClock} />
                    <span>{formatTimestamp(comm.timestamp)}</span>
                  </div>
                </div>
                <p className="text-gray-800">{comm.message}</p>
                {comm.attachments && comm.attachments.length > 0 && (
                  <div className="mt-2 flex items-center space-x-2">
                    <SafeIcon icon={FiPaperclip} className="text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {comm.attachments.length} attachment(s)
                    </span>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                disabled={isSending}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                className="p-3 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                title="Attach file"
              >
                <SafeIcon icon={FiPaperclip} />
              </button>
              <button
                type="submit"
                disabled={!newMessage.trim() || isSending}
                className={`p-3 rounded-lg transition-colors ${
                  !newMessage.trim() || isSending
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                title="Send message"
              >
                {isSending ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <SafeIcon icon={FiSend} />
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ReferralCommunication;