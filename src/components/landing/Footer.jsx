import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiActivity, FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, 
  FiFacebook, FiInstagram, FiArrowRight, FiShield, FiHeart
} = FiIcons;

function Footer() {
  const navigate = useNavigate();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Integrations', href: '/integrations' },
        { name: 'API Documentation', href: '/docs' },
        { name: 'System Status', href: '/status' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press Kit', href: '/press' },
        { name: 'Partner Program', href: '/partners' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Blog', href: '/blog' },
        { name: 'Webinars', href: '/webinars' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Training', href: '/training' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'HIPAA Compliance', href: '/hipaa' },
        { name: 'Security', href: '/security' },
        { name: 'Accessibility', href: '/accessibility' }
      ]
    }
  ];

  const socialLinks = [
    { icon: FiTwitter, href: 'https://twitter.com/referdental', label: 'Twitter' },
    { icon: FiLinkedin, href: 'https://linkedin.com/company/referdental', label: 'LinkedIn' },
    { icon: FiFacebook, href: 'https://facebook.com/referdental', label: 'Facebook' },
    { icon: FiInstagram, href: 'https://instagram.com/referdental', label: 'Instagram' }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('/')) {
      navigate(href);
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4">
              Stay Updated with refer.dental
            </h3>
            <p className="text-gray-400 mb-8">
              Get the latest updates, tips, and insights for dental practice management 
              delivered straight to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Subscribe</span>
                <SafeIcon icon={FiArrowRight} />
              </button>
            </div>
            
            <p className="text-gray-500 text-sm mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <SafeIcon icon={FiActivity} className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    refer.dental
                  </h2>
                  <p className="text-sm text-gray-400">Professional Platform</p>
                </div>
              </div>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Empowering dental professionals with comprehensive practice management 
                solutions. Streamline your workflow, improve patient care, and grow your practice.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <SafeIcon icon={FiMail} className="mr-3" />
                  <span>support@refer.dental</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <SafeIcon icon={FiPhone} className="mr-3" />
                  <span>1-800-REFER-DENTAL</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <SafeIcon icon={FiMapPin} className="mr-3" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <button
                    key={social.label}
                    onClick={() => handleLinkClick(social.href)}
                    className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                    aria-label={social.label}
                  >
                    <SafeIcon icon={social.icon} className="text-gray-400 hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2024 refer.dental. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiShield} className="text-green-400" />
                <span>HIPAA Compliant</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <SafeIcon icon={FiHeart} className="text-red-400" />
              <span>for dental professionals</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;