const prisma = require('../../config/database');
const coolifyService = require('../../services/coolify.service');
const { reservePort, releasePort } = require('../../services/port.service');
const { buildConnectionString } = require('./connectionString');

async function list(userId) {
  return prisma.database.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
}

async function create(userId, { name, db_type }) {
  const port = await reservePort();
  try {
    const coolifyDb = await coolifyService.createDatabase({ name, db_type, port });
    const record = await prisma.database.create({
      data: { userId, name, db_type, port, coolifyId: coolifyDb.id, status: 'Provisioning', monthlyCostUsd: 5 },
    });
    return record;
  } catch (err) {
    await releasePort(port);
    throw err;
  }
}

async function getOne(userId, id) {
  const db = await prisma.database.findFirst({ where: { id, userId } });
  if (!db) throw Object.assign(new Error('Not found'), { status: 404 });
  return { ...db, connection_string: buildConnectionString(db) };
}

async function remove(userId, id) {
  const db = await prisma.database.findFirst({ where: { id, userId } });
  if (!db) throw Object.assign(new Error('Not found'), { status: 404 });
  await coolifyService.deleteDatabase(db.coolifyId);
  await releasePort(db.port);
  await prisma.database.delete({ where: { id } });
}

async function getStatus(userId, id) {
  const db = await prisma.database.findFirst({ where: { id, userId } });
  if (!db) throw Object.assign(new Error('Not found'), { status: 404 });
  return { status: db.status };
}

module.exports = { list, create, getOne, remove, getStatus };
