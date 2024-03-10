import posthog from 'posthog-js';

const usePosthog = () => {

  const trackEvent = (event, properties) => {
    posthog.capture(event, properties);
  }

  return trackEvent
}

export default usePosthog;