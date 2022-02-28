import axios from 'axios';

// baseURL: 'http://localhost:5000/api/v1/profiles'
// baseURL: 'https://bosstracker-server.herokuapp.com/api/v1/profiles'

const prod = {
  baseURL: 'https://bosstracker-server.herokuapp.com/api/v1/profiles'
};
const dev = { baseURL: 'http://localhost:5000/api/v1/profiles' };

export default axios.create(process.env.NODE_ENV === 'production' ? prod : dev);
