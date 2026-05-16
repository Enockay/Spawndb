const prisma = require('../config/database');
const coolifyService = require('../services/coolify.service');

async function syncDatabaseStatus() {
  const provisioning = await prisma.database.findMany({ where: { status: 'Provisioning' } });
  for (const db of provisioning) {
    try {
      const coolifyDb = await coolifyService.getDatabase(db.coolifyId);
      if (coolifyDb.status === 'running') {
        await prisma.database.update({ where: { id: db.id }, data: { status: 'Active' } });
      }
    } catch (err) {
      console.error(`syncDatabaseStatus failed for ${db.id}:`, err.message);
    }
  }
}

module.exports = { syncDatabaseStatus };
