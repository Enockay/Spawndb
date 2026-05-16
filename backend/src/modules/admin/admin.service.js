const prisma = require('../../config/database');
const coolifyService = require('../../services/coolify.service');
const { releasePort } = require('../../services/port.service');

async function listUsers() {
  return prisma.user.findMany({ select: { id: true, email: true, role: true, createdAt: true } });
}

async function forceDeleteDatabase(id) {
  const db = await prisma.database.findUnique({ where: { id } });
  if (!db) throw Object.assign(new Error('Not found'), { status: 404 });
  await coolifyService.deleteDatabase(db.coolifyId);
  await releasePort(db.port);
  await prisma.database.delete({ where: { id } });
}

async function getLogs({ userId, action, limit = 50 }) {
  return prisma.auditLog.findMany({
    where: { ...(userId && { userId }), ...(action && { action }) },
    orderBy: { createdAt: 'desc' },
    take: Number(limit),
  });
}

module.exports = { listUsers, forceDeleteDatabase, getLogs };
