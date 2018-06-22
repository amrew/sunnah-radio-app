// @flow
import axios from 'axios';

export default (apiSettings: {apiEndpoint: string}) => {
  const instance = axios.create({
    baseURL: apiSettings.apiEndpoint, // @todo: get baseUrl from appSettings
    timeout: 5000,
  });
  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return instance;
};
