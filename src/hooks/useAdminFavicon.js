import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import adminFavicon from '../assets/admin-favicon.svg';

function useAdminFavicon() {
  const location = useLocation();

  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (!favicon) return;

    const isAdmin = location.pathname.startsWith('/admin');
    const originalHref = favicon.dataset.originalHref || favicon.getAttribute('href');
    if (!favicon.dataset.originalHref) {
      favicon.dataset.originalHref = originalHref;
    }

    if (isAdmin) {
      favicon.setAttribute('href', adminFavicon);
      document.body.classList.add('admin-mode');
      document.body.classList.add('admin-red');
      document.title = `[ADMIN] ${document.title.replace(/^\[ADMIN\]\s*/, '')}`;
    } else {
      favicon.setAttribute('href', originalHref);
      document.body.classList.remove('admin-mode');
      document.body.classList.remove('admin-red');
      document.title = document.title.replace(/^\[ADMIN\]\s*/, '');
    }
  }, [location]);
}

export default useAdminFavicon;
