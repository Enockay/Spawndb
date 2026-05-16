const coolifyClient = require('../config/coolify');

async function createDatabase({ name, db_type, port }) {
  const res = await coolifyClient.post('/databases', { name, type: db_type, port });
  return res.data;
}

async function getDatabase(coolifyId) {
  const res = await coolifyClient.get(`/databases/${coolifyId}`);
  return res.data;
}

async function deleteDatabase(coolifyId) {
  await coolifyClient.delete(`/databases/${coolifyId}`);
}

async function listDatabases() {
  const res = await coolifyClient.get('/databases');
  return res.data;
}

module.exports = { createDatabase, getDatabase, deleteDatabase, listDatabases };
