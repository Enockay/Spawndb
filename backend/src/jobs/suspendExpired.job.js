const prisma = require('../config/database');
const coolifyService = require('../services/coolify.service');
const { releasePort } = require('../services/port.service');

async function suspendExpired() {
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const expired = await prisma.database.findMany({
    where: { status: 'Suspended', updatedAt: { lt: cutoff } },
  });

  for (const db of expired) {
    try {
      await coolifyService.deleteDatabase(db.coolifyId);
      await releasePort(db.port);
      await prisma.database.delete({ where: { id: db.id } });
      console.log(`Deleted expired suspended database ${db.id}`);
    } catch (err) {
      console.error(`suspendExpired failed for ${db.id}:`, err.message);
    }
  }
}

module.exports = { suspendExpired };
