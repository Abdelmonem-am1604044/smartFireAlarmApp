import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://cb0fa568adb3.ngrok.io',
});

export default instance;
