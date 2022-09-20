import axios from 'axios';

const prod = {
  baseURL: 'https://bosstracker-server.onrender.com/api/v1/bosses',
};
const dev = { baseURL: 'http://localhost:5000/api/v1/bosses' };

export default axios.create(process.env.NODE_ENV === 'production' ? prod : dev);
