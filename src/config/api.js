import axios from 'axios';

// Create an instance with custom config
const api = axios.create({
  // Replace this with your actual backend URL
  baseURL: import.meta.env.VITE_API_URL || 'https://ticket-booking-be-27tk.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Optional: Add a request interceptor
// Useful for adding Bearer tokens to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor
// Useful for handling global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logic for handling expired sessions (e.g., redirect to login)
      console.error('Unauthorized! Logging out...');
    }
    return Promise.reject(error);
  }
);

export default api;