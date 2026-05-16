const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { requestLogger } = require('./middleware/requestLogger');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./modules/auth/auth.routes');
const databasesRoutes = require('./modules/databases/databases.routes');
const billingRoutes = require('./modules/billing/billing.routes');
const adminRoutes = require('./modules/admin/admin.routes');
const webhookRoutes = require('./modules/billing/webhooks');
const { startScheduler } = require('./jobs/scheduler');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(requestLogger);

// Raw body required for Stripe webhook signature verification
app.use('/webhooks', express.raw({ type: 'application/json' }), webhookRoutes);

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/databases', databasesRoutes);
app.use('/billing', billingRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandler);

startScheduler();

module.exports = app;
