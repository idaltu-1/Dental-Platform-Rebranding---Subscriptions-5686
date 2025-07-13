import React, { useEffect } from 'react';
import AdminHeader from './AdminHeader';
import useAdminFavicon from '../../hooks/useAdminFavicon';

function AdminLayout({ level, children }) {
  useAdminFavicon();
  useEffect(() => {
    document.body.classList.add('admin-red');
    return () => document.body.classList.remove('admin-red');
  }, []);

  return (
    <>
      <AdminHeader level={level} />
      <div className="p-4">{children}</div>
    </>
  );
}

export default AdminLayout;
