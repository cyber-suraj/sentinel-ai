import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Extract error message
    const extractedMessage = error.response?.data?.error?.message || error.response?.data?.message || 'Something went wrong';
    error.extractedMessage = extractedMessage;
    
    return Promise.reject(error);
  }
);

export default {
  signup: async (email, password) => {
    const res = await client.post('/api/auth/signup', { email, password });
    return res.data;
  },
  login: async (email, password) => {
    const res = await client.post('/api/auth/login', { email, password });
    return res.data;
  },
  getMe: async () => {
    const res = await client.get('/api/auth/me');
    return res.data;
  },
  analyze: async (text) => {
    const res = await client.post('/api/analyze', { text });
    return res.data;
  },
  getScans: async () => {
    const res = await client.get('/api/scans');
    return res.data;
  },
  getScan: async (id) => {
    const res = await client.get(`/api/scans/${id}`);
    return res.data;
  },
  updateScanAction: async (id, action_taken) => {
    const res = await client.patch(`/api/scans/${id}/action`, { action_taken });
    return res.data;
  }
};
