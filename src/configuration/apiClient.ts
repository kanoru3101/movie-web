import axios from 'axios'
import { API_HOST } from './client';

const axiosInstance = axios.create({
  baseURL: `${API_HOST}/`,
  timeout: 8000,
  withCredentials: true,
  headers: {
    accept: 'application/json',
  }
});

export default axiosInstance

