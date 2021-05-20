import axios, { request } from 'axios';
import cookie from 'js-cookie';

import { errorHandler } from './apiErrorHandler';
import config from '../constants/serverConfig';
import { ACCESS_TOKEN } from '../constants/storage';

const api = (options = {}) => {
  const axiosConfig = {
    baseURL: config.SERVER_BASE_URL,
    headers: {
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      'x-sc-useragent': ';;WebPortal=0.1;Windows NT 6.1; WOW64;',
      'Content-type': 'application/json;charset=UTF-8',
      'x-access-token': cookie.get(ACCESS_TOKEN)
    }
  };
  const finalOptions = {
    ...axiosConfig,
    ...options,
    baseURL: config.SERVER_BASE_URL
  };
  return request({ ...finalOptions });
};

axios.interceptors.request.use(
  config => config,

  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  e => {
    errorHandler(e);
    return Promise.reject(e);
  }
);

export default api;
