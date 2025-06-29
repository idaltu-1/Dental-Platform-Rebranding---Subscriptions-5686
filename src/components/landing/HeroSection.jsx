import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlay, FiArrowRight, FiCheck, FiUsers, FiShield, FiTrendingUp } = FiIcons;

function HeroSection() {
  const navigate = useNavigate();

  const stats = [
    { number: '10,000+', label: 'Happy Dentists' },
    { number: '1M+', label: 'Patients Served' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const benefits = [
    'HIPAA Compliant & Secure',
    'Easy Integration',
    'Expert Support',
    'No Setup Fees'
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 pt-32 sm:pt-40">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-lg"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 mb-6">
                <SafeIcon icon={FiTrendingUp} className="mr-2" />
                <span className="text-sm font-medium">Trusted by 10,000+ dental practices</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Transform Your{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Dental Practice
                </span>{' '}
                Management
              </h1>

              <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                Streamline referrals, manage patients, and grow your practice with our 
                comprehensive HIPAA-compliant platform designed specifically for dental professionals.
              </p>

              {/* Benefits List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <SafeIcon icon={FiCheck} className="text-green-300 mr-2 flex-shrink-0" />
                    <span className="text-sm text-blue-100">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => navigate('/pricing')}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Start Free Trial</span>
                  <SafeIcon 
                    icon={FiArrowRight} 
                    className="group-hover:translate-x-1 transition-transform" 
                  />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiPlay} />
                  <span>Watch Demo</span>
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm text-blue-200"
              >
                <div className="flex items-center space-x-4">
                  <SafeIcon icon={FiShield} className="text-green-300" />
                  <span>HIPAA Compliant</span>
                  <span>•</span>
                  <span>SOC 2 Certified</span>
                  <span>•</span>
                  <span>99.9% Uptime</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Stats & Visual */}
          <div className="relative hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Dashboard Preview */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="bg-white rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Dashboard Overview</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Mock Dashboard Content */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">1,247</div>
                        <div className="text-sm text-gray-600">Total Patients</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">89</div>
                        <div className="text-sm text-gray-600">Active Referrals</div>
                      </div>
                    </div>
                    
                    <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <div className="text-gray-500 text-sm">Analytics Chart</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-3/4 rounded-full"></div>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-1/2 rounded-full"></div>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-2/3 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className={`absolute bg-white/90 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-white/30 ${
                    index === 0 ? '-top-6 -left-6' :
                    index === 1 ? '-top-6 -right-6' :
                    index === 2 ? '-bottom-6 -left-6' :
                    '-bottom-6 -right-6'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;