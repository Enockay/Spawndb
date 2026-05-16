const service = require('./admin.service');

async function listUsers(req, res, next) {
  try { res.json(await service.listUsers()); } catch (err) { next(err); }
}

async function forceDeleteDatabase(req, res, next) {
  try {
    await service.forceDeleteDatabase(req.params.id);
    res.json({ message: 'Database force-deleted' });
  } catch (err) { next(err); }
}

async function getLogs(req, res, next) {
  try { res.json(await service.getLogs(req.query)); } catch (err) { next(err); }
}

module.exports = { listUsers, forceDeleteDatabase, getLogs };
