import axios from 'axios';

const prod = {
  baseURL: 'https://bosstracker-server.onrender.com/api/v1/login',
};
const dev = { baseURL: 'http://localhost:5000/api/v1/login' };

export default axios.create(process.env.NODE_ENV === 'production' ? prod : dev);
