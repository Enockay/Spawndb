import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err.response?.data || err);
  }
);

export default client;
