import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FeedbackWorkflow } from '@questlabs/react-sdk';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { questConfig } from '../../config/questConfig';
import toast from 'react-hot-toast';

const { FiMessageSquare, FiChevronLeft, FiChevronRight } = FiIcons;

function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleFeedback = () => {
    try {
      // Track feedback button interaction
      console.log('Feedback button clicked', {
        timestamp: new Date().toISOString(),
        action: isOpen ? 'close' : 'open',
        userId: localStorage.getItem('userId') || questConfig.USER_ID
      });

      setIsOpen(prev => !prev);

      if (!isOpen) {
        toast.success('Feedback panel opened');
      }
    } catch (error) {
      console.error('Feedback toggle error:', error);
      toast.error('Failed to open feedback panel');
    }
  };

  const handleFeedbackClose = () => {
    setIsOpen(false);
    toast.success('Thank you for your feedback!');
  };

  return (
    <>
      {/* Floating Feedback Button - Positioned on right side */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleToggleFeedback}
        className="fixed top-1/2 -translate-y-1/2 -right-10 z-50 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-md rounded-b-none shadow-lg hover:shadow-xl transition-all duration-300 transform rotate-[270deg] origin-center"
        style={{
          background: `linear-gradient(135deg, ${questConfig.PRIMARY_COLOR}, #4F46E5)`,
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }}
        title="Give us feedback"
      >
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-fit h-fit rotate-90"
          >
            <SafeIcon 
              icon={isOpen ? FiChevronLeft : FiChevronRight} 
              className="text-sm"
            />
          </motion.div>
          <span className="text-sm font-medium leading-none">Feedback</span>
        </div>
      </motion.button>

      {/* Feedback Workflow Component */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <FeedbackWorkflow
              uniqueUserId={localStorage.getItem('userId') || questConfig.USER_ID}
              questId={questConfig.QUEST_FEEDBACK_QUESTID}
              isOpen={isOpen}
              accent={questConfig.PRIMARY_COLOR}
              onClose={handleFeedbackClose}
              styleConfig={{
                primaryColor: questConfig.PRIMARY_COLOR,
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              <FeedbackWorkflow.ThankYou />
            </FeedbackWorkflow>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default FeedbackButton;