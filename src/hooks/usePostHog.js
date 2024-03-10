import posthog from 'posthog-js';

const usePosthog = () => {

  const trackEvent = (event, properties) => {
    if (process.env.REACT_APP_ENV === 'production') {
      posthog.capture(event, properties);
    }
  }

  return trackEvent
}

export default usePosthog;