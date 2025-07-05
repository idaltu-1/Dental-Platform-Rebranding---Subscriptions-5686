import React from 'react';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {AuthProvider} from './contexts/AuthContext';
import '@questlabs/react-sdk/dist/style.css';

// Components
import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import PatientManagement from './components/PatientManagement';
import ClinicalNotesScreen from './components/ClinicalNotes/ClinicalNotesScreen';
import AnalyticsScreen from './components/analytics/AnalyticsScreen';
import AdvancedAnalytics from './components/analytics/AdvancedAnalytics';
import CustomIntegrations from './components/CustomIntegrations';
import OnboardingWizard from './components/onboarding/OnboardingWizard';
import PricingPlans from './components/PricingPlans';
import SubscriptionDashboard from './components/subscription/SubscriptionDashboard';
import ProfileScreen from './components/ProfileScreen';
import AdminRoute from './components/admin/AdminRoute';
import useAdminFavicon from './hooks/useAdminFavicon';

// Advanced Features
import TelemedicineHub from './components/telemedicine/TelemedicineHub';
import AIAssistant from './components/ai/AIAssistant';

// New screens to implement
import ReferralTracking from './components/referrals/ReferralTracking';
import InsuranceScreen from './components/insurance/InsuranceScreen';
import DocumentsScreen from './components/documents/DocumentsScreen';
import NotificationsScreen from './components/notifications/NotificationsScreen';
import ScheduleScreen from './components/schedule/ScheduleScreen';
import ChatScreen from './components/chat/ChatScreen';

// Settings and Help
import SettingsScreen from './components/settings/SettingsScreen';
import HelpScreen from './components/help/HelpScreen';

// Feedback System
import FeedbackProvider from './components/feedback/FeedbackProvider';
import FeedbackButton from './components/feedback/FeedbackButton';

function App() {
  useAdminFavicon();
  return (
    <AuthProvider>
      <FeedbackProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
              <Route path="/onboarding" element={<OnboardingWizard />} />
              
              {/* Pricing page */}
              <Route path="/pricing" element={<PricingPlans />} />

              {/* Protected Dashboard routes with sidebar */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                
                {/* Profile */}
                <Route path="profile" element={<ProfileScreen />} />
                
                {/* Settings */}
                <Route path="settings" element={<SettingsScreen />} />
                
                {/* Help */}
                <Route path="help" element={<HelpScreen />} />

                {/* Patient Management */}
                <Route 
                  path="patients" 
                  element={
                    <ProtectedRoute requiredPermission="patient_management">
                      <PatientManagement />
                    </ProtectedRoute>
                  } 
                />

                {/* Referral System */}
                <Route 
                  path="referrals" 
                  element={
                    <ProtectedRoute requiredPermission="referral_management">
                      <ReferralTracking />
                    </ProtectedRoute>
                  } 
                />

                {/* Clinical Notes */}
                <Route 
                  path="clinical-notes" 
                  element={
                    <ProtectedRoute requiredPermission="clinical_notes">
                      <ClinicalNotesScreen />
                    </ProtectedRoute>
                  } 
                />

                {/* Scheduling */}
                <Route 
                  path="schedule" 
                  element={
                    <ProtectedRoute requiredPermission="schedule_management">
                      <ScheduleScreen />
                    </ProtectedRoute>
                  } 
                />

                {/* Insurance */}
                <Route 
                  path="insurance" 
                  element={
                    <ProtectedRoute requiredPermission="insurance_verification">
                      <InsuranceScreen />
                    </ProtectedRoute>
                  } 
                />

                {/* Documents */}
                <Route 
                  path="documents" 
                  element={
                    <ProtectedRoute requiredPermission="document_management">
                      <DocumentsScreen />
                    </ProtectedRoute>
                  } 
                />

                {/* Chat */}
                <Route 
                  path="chat" 
                  element={
                    <ProtectedRoute requiredPermission="chat_system">
                      <ChatScreen />
                    </ProtectedRoute>
                  } 
                />

                {/* Notifications */}
                <Route path="notifications" element={<NotificationsScreen />} />

                {/* Analytics */}
                <Route 
                  path="analytics" 
                  element={
                    <ProtectedRoute requiredPermission="analytics">
                      <AnalyticsScreen />
                    </ProtectedRoute>
                  } 
                />

                {/* Advanced Analytics */}
                <Route 
                  path="advanced-analytics" 
                  element={
                    <ProtectedRoute requiredPermission="analytics">
                      <AdvancedAnalytics />
                    </ProtectedRoute>
                  } 
                />

                {/* Telemedicine Hub */}
                <Route 
                  path="telemedicine" 
                  element={
                    <ProtectedRoute requiredPermission="telemedicine">
                      <TelemedicineHub />
                    </ProtectedRoute>
                  } 
                />

                {/* AI Assistant */}
                <Route 
                  path="ai-assistant" 
                  element={
                    <ProtectedRoute requiredPermission="ai_features">
                      <AIAssistant />
                    </ProtectedRoute>
                  } 
                />

                {/* Subscription Management */}
                <Route 
                  path="subscription" 
                  element={
                    <ProtectedRoute>
                      <SubscriptionDashboard />
                    </ProtectedRoute>
                  } 
                />

                {/* Integrations */}
                <Route 
                  path="integrations" 
                  element={
                    <ProtectedRoute>
                      <CustomIntegrations />
                    </ProtectedRoute>
                  } 
                />

                {/* Get Started Guide */}
                <Route 
                  path="get-started" 
                  element={
                    <ProtectedRoute>
                      <OnboardingWizard />
                    </ProtectedRoute>
                  } 
                />
              </Route>

              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <AdminRoute requiredLevel={1}>
                    <DashboardLayout />
                  </AdminRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route
                  path="users"
                  element={
                    <AdminRoute requiredLevel={2} requiredPermission="user_management">
                      <PatientManagement />
                    </AdminRoute>
                  }
                />
                <Route
                  path="analytics"
                  element={
                    <AdminRoute requiredLevel={1} requiredPermission="analytics">
                      <AnalyticsScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="integrations"
                  element={
                    <AdminRoute requiredLevel={2}>
                      <CustomIntegrations />
                    </AdminRoute>
                  }
                />
                <Route
                  path="subscription"
                  element={<AdminRoute requiredLevel={1}><SubscriptionDashboard /></AdminRoute>}
                />
              </Route>

              {/* Unauthorized Route */}
              <Route 
                path="/unauthorized" 
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
                      <p className="text-gray-600">{'You don\'t have permission to access this page.'}</p>
                    </div>
                  </div>
                } 
              />

              {/* 404 Route */}
              <Route 
                path="*" 
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                      <p className="text-gray-600">{'The page you\'re looking for doesn\'t exist.'}</p>
                    </div>
                  </div>
                } 
              />
            </Routes>

            {/* Global Feedback Button - Available on all protected routes */}
            <ProtectedRoute>
              <FeedbackButton />
            </ProtectedRoute>
          </div>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
        </Router>
      </FeedbackProvider>
    </AuthProvider>
  );
}

export default App;