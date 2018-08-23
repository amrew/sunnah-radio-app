// @flow
import axios from 'axios';

export default (apiSettings: {apiEndpoint: string}) => {
  const instance = axios.create({
    baseURL: apiSettings.apiEndpoint, // @todo: get baseUrl from appSettings
  });
  instance.defaults.timeout = 5000;
  instance.interceptors.response.use(
    response => {
      console.log(response);
      return response.data;
    },
    error => {
      // Do something with response error
      console.log(error);
      return Promise.reject(error);
    }
  );
  return instance;
};
