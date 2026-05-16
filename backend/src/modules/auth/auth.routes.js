const router = require('express').Router();
const { authLimiter } = require('../../middleware/rateLimiter');
const { validateBody } = require('../../middleware/validateBody');
const { signupSchema, loginSchema } = require('./auth.schema');
const controller = require('./auth.controller');

router.post('/signup',          authLimiter, validateBody(signupSchema), controller.signup);
router.post('/login',           authLimiter, validateBody(loginSchema),  controller.login);
router.post('/logout',          controller.logout);
router.post('/forgot-password', authLimiter, controller.forgotPassword);
router.post('/reset-password',  authLimiter, controller.resetPassword);
router.get('/me',               controller.me);

module.exports = router;
