import axios from 'axios';

const api = axios.create({
  baseURL: 'https://swapi.py4e.com/api/',
});

export default api;

