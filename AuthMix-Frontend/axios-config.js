import axios from 'axios';

// Create an Axios instance with default configuration
const instance = axios.create({
  baseURL: 'http://localhost:4000/', // Set your API base URL
  withCredentials: true, // Allow sending cookies with requests
});

export default instance;
