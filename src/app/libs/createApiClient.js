// @flow
import axios from 'axios';

export default (apiSettings: {apiEndpoint: string}) => {
  const instance = axios.create({
    baseURL: apiSettings.apiEndpoint,
  });
  instance.defaults.timeout = 5000;
  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      return Promise.reject(error);
    }
  );
  return instance;
};
