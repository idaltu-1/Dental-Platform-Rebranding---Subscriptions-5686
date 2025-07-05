import React from 'react';
import ReferralTracking from './components/referrals/ReferralTracking';
import ReferralAnalytics from './components/referrals/ReferralAnalytics';
import './index.css';

function ReferralTest() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Expanded Referral Functionality Demo
        </h1>
        <p className="text-gray-600 mt-1">
          Demonstrating enhanced referral management capabilities
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Referral Tracking Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Enhanced Referral Tracking
            </h2>
            <div className="bg-white rounded-lg shadow-sm">
              <ReferralTracking />
            </div>
          </div>

          {/* Analytics Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Referral Analytics & Insights
            </h2>
            <div className="bg-white rounded-lg shadow-sm">
              <ReferralAnalytics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralTest;