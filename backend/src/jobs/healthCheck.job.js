const coolifyClient = require('../config/coolify');

async function healthCheck() {
  try {
    await coolifyClient.get('/health');
  } catch (err) {
    console.error(`[healthCheck] Coolify API unreachable: ${err.message}`);
  }
}

module.exports = { healthCheck };
