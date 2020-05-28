import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://trading-journey.firebaseio.com/'
});

export default instance;