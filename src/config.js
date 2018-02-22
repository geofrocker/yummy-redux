import axios from 'axios';

export const url = 'https://yummy-api.herokuapp.com/';

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
