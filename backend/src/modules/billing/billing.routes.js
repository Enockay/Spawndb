const router = require('express').Router();
const { authenticate } = require('../../middleware/authenticate');
const controller = require('./billing.controller');

router.use(authenticate);

router.get('/subscription', controller.getSubscription);
router.get('/invoices',     controller.getInvoices);
router.post('/portal',      controller.createPortalSession);

module.exports = router;
