const { DB_HOST } = require('../../config/env');

function buildConnectionString(db) {
  const { db_type, port, name, password } = db;
  switch (db_type) {
    case 'postgresql': return `postgresql://user:${password}@${DB_HOST}:${port}/${name}`;
    case 'mysql':      return `mysql://user:${password}@${DB_HOST}:${port}/${name}`;
    case 'redis':      return `redis://:${password}@${DB_HOST}:${port}`;
    case 'mongodb':    return `mongodb://user:${password}@${DB_HOST}:${port}/${name}`;
    default:           throw new Error(`Unknown db_type: ${db_type}`);
  }
}

module.exports = { buildConnectionString };
