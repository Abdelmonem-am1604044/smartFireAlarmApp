import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://smart-fire-alarm.herokuapp.com/'
});

export default instance;
