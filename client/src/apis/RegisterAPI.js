import axios from 'axios';

const prod = {
  baseURL: 'https://bosstracker.onrender.com/api/v1/register',
};
const dev = { baseURL: 'http://localhost:5000/api/v1/register' };

export default axios.create(process.env.NODE_ENV === 'production' ? prod : dev);
