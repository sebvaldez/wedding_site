import axios from 'axios';

const baseUrl = `https://${process.env.REACT_APP_API_GATEWAY_ID}.execute-api.us-west-2.amazonaws.com/${process.env.REACT_APP_API_GATEWAY_ENV}`;

// Create the Axios instance with the base URL and default headers
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

let isRefreshing = false;  // Correctly declare isRefreshing with 'let'

// Function to fetch token
async function fetchToken() {
  try {
    const response = await axios.post(
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_CREDENTIALS_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH0_CLIENT_CREDENTIALS_CLIENT_SECRET,
        audience: axiosInstance.defaults.baseURL,
        grant_type: 'client_credentials',
      }
    );
    const { access_token } = response.data;
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    return access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw new Error('Failed to fetch token');
  }
}

// Request interceptor to ensure the token is set
axiosInstance.interceptors.request.use(
  async config => {
    if (!config.headers['Authorization']) {
      if (!isRefreshing) {
        isRefreshing = true;
        await fetchToken();
        isRefreshing = false;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor to handle token refresh logic
axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await fetchToken();
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;  // Export the configured Axios instance
