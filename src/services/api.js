import axios from 'axios';

const api = axios.create({
  baseURL: '/.netlify/functions',
});

export default api;
