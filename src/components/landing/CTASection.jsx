import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiArrowRight, FiPlay, FiCheck, FiPhone } = FiIcons;

function CTASection() {
  const navigate = useNavigate();

  const benefits = [
    'Setup in under 10 minutes',
    'No long-term contracts',
    'Cancel anytime',
    'Free migration assistance'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
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
          className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Dental Practice?
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join over 10,000 dental professionals who trust refer.dental to streamline 
              their practice management and improve patient care.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center justify-center bg-white/10 backdrop-blur-lg rounded-lg p-4"
                >
                  <SafeIcon icon={FiCheck} className="text-green-300 mr-2 flex-shrink-0" />
                  <span className="text-white text-sm font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                onClick={() => navigate('/pricing')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>Start Your Free Trial</span>
                <SafeIcon 
                  icon={FiArrowRight} 
                  className="group-hover:translate-x-1 transition-transform" 
                />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-blue-200 text-sm"
            >
              <p className="mb-2">✨ 14-day free trial • No credit card required • Setup in minutes</p>
              <p>🔒 HIPAA Compliant • SOC 2 Certified • Bank-level Security</p>
            </motion.div>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-4xl mx-auto border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need a Personal Demo?
                </h3>
                <p className="text-blue-100 mb-6">
                  Schedule a 15-minute call with our team to see how refer.dental 
                  can be customized for your specific practice needs.
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-center">
                    <SafeIcon icon={FiCheck} className="text-green-300 mr-2" />
                    Personalized walkthrough
                  </li>
                  <li className="flex items-center">
                    <SafeIcon icon={FiCheck} className="text-green-300 mr-2" />
                    Custom setup assistance
                  </li>
                  <li className="flex items-center">
                    <SafeIcon icon={FiCheck} className="text-green-300 mr-2" />
                    Migration support
                  </li>
                </ul>
              </div>

              <div className="text-center md:text-left">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 w-full md:w-auto">
                  <SafeIcon icon={FiPhone} />
                  <span>Schedule Demo</span>
                </button>
                <p className="text-blue-200 text-sm mt-3">
                  Available Monday - Friday, 9 AM - 6 PM EST
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;