const prisma = require('../config/database');

async function logAction(userId, action, metadata = {}, ip = null) {
  await prisma.auditLog.create({ data: { userId, action, metadata, ip } });
}

module.exports = { logAction };
