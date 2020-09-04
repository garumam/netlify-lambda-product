import { config } from 'dotenv';
import axios from 'axios';

config();

const api = axios.create({
  baseURL: process.env.BASE_URL,
});

export default api;
