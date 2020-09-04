import axios from 'axios';

const api = axios.create({
  baseURL: '/.netlify/functions',
});

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error.response.data.error);
  }
);

export default api;
