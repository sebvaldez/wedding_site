import { useEffect } from 'react';
import { useClientCredentials } from "./useClientCredentials";
import backend from '../api/backend';

export function useAuthenticatedAxios() {
  const {token, refreshToken } = useClientCredentials();

  useEffect(() => {
    if(!token) return;  // Do not attach interceptors if token is not available

    // Request Intercept
    const requestIntercept = backend.interceptors.request.use(
      config => {
        if(!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config
      },
      error => Promise.reject(error)
    );

    // Response Intercept
    const responseIntercept = backend.interceptors.response.use(
      response => response,
      async error => {
        const retryCodes = [401, 403];
        const prevRequest = error?.config;
        if ( retryCodes.includes(error?.response?.status) && !prevRequest?._retry) {
          prevRequest._retry = true // Prevent endless loop of refresh attempts

          await refreshToken(); // Get new credentials

          prevRequest.headers['Authorization'] = `Bearer ${token}`;
          return backend(prevRequest)
        }
        return Promise.reject(error);
      }
    );

    return( () => {
      //useEffect cleanup unmount fn, removes interceptors
      backend.interceptors.request.eject(requestIntercept)
      backend.interceptors.response.eject(responseIntercept)
    })

  }, [token, refreshToken])

  return backend;
};
