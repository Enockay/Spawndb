const prisma = require('../config/database');

const PORT_RANGE_START = 10000;
const PORT_RANGE_END   = 20000;

async function reservePort() {
  return prisma.$transaction(async (tx) => {
    const used = await tx.database.findMany({ select: { port: true } });
    const usedSet = new Set(used.map((d) => d.port));
    for (let p = PORT_RANGE_START; p <= PORT_RANGE_END; p++) {
      if (!usedSet.has(p)) return p;
    }
    throw new Error('No available ports');
  });
}

async function releasePort(_port) {
  // Port is freed when the database record is deleted; this is a no-op placeholder for explicit release if needed.
}

module.exports = { reservePort, releasePort };
