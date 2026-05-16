const router = require('express').Router();
const { authenticate } = require('../../middleware/authenticate');
const { apiLimiter } = require('../../middleware/rateLimiter');
const { validateBody } = require('../../middleware/validateBody');
const { createDatabaseSchema } = require('./databases.schema');
const controller = require('./databases.controller');

router.use(authenticate, apiLimiter);

router.get('/',           controller.list);
router.post('/',          validateBody(createDatabaseSchema), controller.create);
router.get('/:id',        controller.getOne);
router.delete('/:id',     controller.remove);
router.get('/:id/status', controller.status);

module.exports = router;
