// app/components/RefreshHandler.jsx
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const RefreshHandler = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Disable the browser's default scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Check if the page loaded via a refresh action
    const navigationEntries = performance.getEntriesByType('navigation');
    let isRefresh = false;
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
      isRefresh = true;
    }

    // If it was a refresh AND we are NOT on the homepage...
    if (isRefresh && pathname !== '/') {
      // Force redirect to the homepage
      window.location.href = '/';
    } else {
        // On any load (including refresh on homepage or normal navigation), scroll to top
        window.scrollTo(0, 0);
    }

  }, [pathname]); // Rerun this logic if the pathname changes

  // This component doesn't render anything visible
  return null;
};

export default RefreshHandler;