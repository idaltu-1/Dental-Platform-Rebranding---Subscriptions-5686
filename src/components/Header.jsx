import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiActivity, FiMenu, FiBell, FiUser } = FiIcons;

function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-lg border-b border-gray-100"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <SafeIcon icon={FiActivity} className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                refer.dental
              </h1>
              <p className="text-sm text-gray-500">Professional Dental Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden">
              <SafeIcon icon={FiMenu} className="text-gray-600 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;