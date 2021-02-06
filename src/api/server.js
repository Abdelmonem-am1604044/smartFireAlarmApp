import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://fd374161cea4.ngrok.io',
});

export default instance;
