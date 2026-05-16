const service = require('./billing.service');

async function getSubscription(req, res, next) {
  try {
    const data = await service.getSubscription(req.user.id);
    res.json(data);
  } catch (err) { next(err); }
}

async function getInvoices(req, res, next) {
  try {
    const data = await service.getInvoices(req.user.id);
    res.json(data);
  } catch (err) { next(err); }
}

async function createPortalSession(req, res, next) {
  try {
    const data = await service.createPortalSession(req.user.id);
    res.json(data);
  } catch (err) { next(err); }
}

module.exports = { getSubscription, getInvoices, createPortalSession };
