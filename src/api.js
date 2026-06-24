import axios from 'axios';

const api = axios.create({
  baseURL: '/api/events',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
