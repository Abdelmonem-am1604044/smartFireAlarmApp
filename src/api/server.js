import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://b49d7caa624f.ngrok.io',
});

export default instance;
