// useGoogleAnalytics.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const TRACKING_ID = 'G-W8YD1SX85Y'; // Google Analytics Tracking ID

const useGoogleAnalytics = () => {
  const location = useLocation();

  // Initialize Google Analytics
  useEffect(() => {
    if (process.env.REACT_APP_ENV === 'production') {
      ReactGA.initialize(TRACKING_ID);
    }
  }, []);

  // Track page views
  useEffect(() => {
    if (process.env.REACT_APP_ENV === 'production') {
      const currentPath = location.pathname + location.search;
      ReactGA.set({ page: currentPath });
      ReactGA.pageview(currentPath);
    }
  }, [location]);

  // Track events
  const trackEvent = (category = 'Event Category', action = 'Action', label = 'Label') => {
    if (process.env.REACT_APP_ENV === 'production') {
      ReactGA.event({ category, action, label });
    }
  };

  return trackEvent;
};
export default useGoogleAnalytics;
