import axios from 'axios';

// baseURL: 'http://localhost:5000/api/v1/bosses'
// baseURL: 'https://bosstracker-server.herokuapp.com/api/v1/bosses'

const prod = {
  baseURL: 'https://bosstracker-server.herokuapp.com/api/v1/bosses'
};
const dev = { baseURL: 'http://localhost:5000/api/v1/bosses' };

export default axios.create(process.env.NODE_ENV === 'production' ? prod : dev);
