import React from 'react';
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import FeedbackButton from './feedback/FeedbackButton';

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
      {/* Feedback Button - Available on all dashboard routes */}
      <FeedbackButton />
    </div>
  );
}

export default DashboardLayout;