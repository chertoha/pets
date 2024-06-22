import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_API_URL;
axios.defaults.baseURL = BASE_URL;

const api = axios.create({
  baseUrl: BASE_URL,
});

export { BASE_URL, api };
