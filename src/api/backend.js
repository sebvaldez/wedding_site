import axios from 'axios';

const baseUrl = `https://${process.env.REACT_APP_API_GATEWAY_ID}.execute-api.us-west-2.amazonaws.com/${process.env.REACT_APP_API_GATEWAY_ENV}`;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor for authentication
instance.interceptors.request.use(
  config => {
    const idToken = config.headers['x-auth-token']; // Fetch the id_token from headers
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
