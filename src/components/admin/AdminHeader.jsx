import React from 'react';
import { FiShield } from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { adminService } from '../../services/AdminService';

function AdminHeader({ level }) {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-2 px-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-2">
        <SafeIcon icon={FiShield} />
        <span className="font-semibold">ADMIN MODE</span>
      </div>
      <span className="text-sm bg-white text-blue-700 px-2 py-1 rounded font-medium">
        {adminService.getLevelLabel(level)}
      </span>
    </header>
  );
}

export default AdminHeader;
