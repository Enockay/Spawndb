const service = require('./databases.service');

async function list(req, res, next) {
  try {
    const databases = await service.list(req.user.id);
    res.json(databases);
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const database = await service.create(req.user.id, req.body);
    res.status(201).json(database);
  } catch (err) { next(err); }
}

async function getOne(req, res, next) {
  try {
    const database = await service.getOne(req.user.id, req.params.id);
    res.json(database);
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    await service.remove(req.user.id, req.params.id);
    res.json({ message: 'Database deleted' });
  } catch (err) { next(err); }
}

async function status(req, res, next) {
  try {
    const result = await service.getStatus(req.user.id, req.params.id);
    res.json(result);
  } catch (err) { next(err); }
}

module.exports = { list, create, getOne, remove, status };
