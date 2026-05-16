const axios = require('axios');
const { COOLIFY_API_URL, COOLIFY_API_KEY } = require('./env');

const coolifyClient = axios.create({
  baseURL: COOLIFY_API_URL,
  headers: {
    Authorization: `Bearer ${COOLIFY_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

module.exports = coolifyClient;
