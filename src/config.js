import axios from 'axios';

export const url = 'http://127.0.0.1:5000/';

export const http = axios.create({
  headers: {
    'x-access-token': localStorage.getItem('token'),
  },
});

http.interceptors.request.use((config) => {
  if (localStorage.getItem('token') && !config.headers['x-access-token']) {
    config.headers['x-access-token'] = localStorage.getItem('token');
  }
  return config;
});

export default url;
