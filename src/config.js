import axios from 'axios';

export const url = 'http://127.0.0.1:5000/';

export const http = axios.create({
    headers: {
        'x-access-token': localStorage.getItem('token')
    },
  });

  export default url;
