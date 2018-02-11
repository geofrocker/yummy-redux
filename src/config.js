import axios from 'axios';

export const url = 'http://yummy-api.herokuapp.com/';

export const http = axios.create({
  headers: {
    'x-access-token': localStorage.getItem('token'),
  },
});

export default url;
