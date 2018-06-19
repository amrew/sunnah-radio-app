// @flow
import axios from 'axios';

export default () => {
  const instance = axios.create({
    baseURL: 'http://radioislam.or.id', // @todo: get baseUrl from appSettings
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
