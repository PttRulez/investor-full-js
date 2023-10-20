import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { urls } from '@/constants/common';

export const investorAxiosInstance: AxiosInstance = axios.create({
  baseURL: urls.investor,
  withCredentials: true,
} as CreateAxiosDefaults);

investorAxiosInstance.interceptors.request.use((config) => {
  config.headers['Accept'] = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
});
