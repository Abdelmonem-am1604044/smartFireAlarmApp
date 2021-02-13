import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ce3f967b2109.ngrok.io',
});

export default instance;
