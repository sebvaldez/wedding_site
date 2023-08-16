import axios from 'axios';

const baseUrl = `https://${process.env.REACT_APP_API_GATEWAY_ID}.execute-api.us-west-2.amazonaws.com/${process.env.REACT_APP_API_GATEWAY_ENV}`;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});


export default instance;
