const router = require('express').Router();
const { authenticate } = require('../../middleware/authenticate');
const controller = require('./admin.controller');

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
}

router.use(authenticate, requireAdmin);

router.get('/users',              controller.listUsers);
router.delete('/databases/:id',   controller.forceDeleteDatabase);
router.get('/logs',               controller.getLogs);

module.exports = router;
