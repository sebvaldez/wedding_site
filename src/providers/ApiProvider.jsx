import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ApiContext from '../contexts/ApiContext';

const useAuthentication = () => {
  const [token, setToken] = useState(null);

  const fetchToken = useCallback(async () => {
    try {
      const response = await axios.post(
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
        {
          client_id: process.env.REACT_APP_AUTH0_CLIENT_CREDENTIALS_CLIENT_ID,
          client_secret: process.env.REACT_APP_AUTH0_CLIENT_CREDENTIALS_CLIENT_SECRET,
          audience:
            `https://${process.env.REACT_APP_API_GATEWAY_ID}.execute-api.us-west-2.amazonaws.com/${process.env.REACT_APP_API_GATEWAY_ENV}`,
          grant_type: 'client_credentials',
        }
      );

      if (response.data && response.data.access_token) {
        setToken(response.data.access_token);
      }
    } catch (error) {
      console.error('Error fetching the token:', error);
    }
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return { token, refreshToken: fetchToken };
};

// The ApiProvider
const ApiProvider = ({ children }) => {
  const auth = useAuthentication();

  return <ApiContext.Provider value={auth}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
