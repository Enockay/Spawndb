const required = [
  'DATABASE_URL',
  'JWT_SECRET',
  'COOLIFY_API_URL',
  'COOLIFY_API_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'RESEND_API_KEY',
  'ENCRYPTION_KEY',
  'DB_HOST',
];

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required env var: ${key}`);
    process.exit(1);
  }
});

module.exports = {
  PORT:                   process.env.PORT || 4000,
  DATABASE_URL:           process.env.DATABASE_URL,
  JWT_SECRET:             process.env.JWT_SECRET,
  COOLIFY_API_URL:        process.env.COOLIFY_API_URL,
  COOLIFY_API_KEY:        process.env.COOLIFY_API_KEY,
  STRIPE_SECRET_KEY:      process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET:  process.env.STRIPE_WEBHOOK_SECRET,
  RESEND_API_KEY:         process.env.RESEND_API_KEY,
  ENCRYPTION_KEY:         process.env.ENCRYPTION_KEY,
  DB_HOST:                process.env.DB_HOST,
  FRONTEND_URL:           process.env.FRONTEND_URL || 'http://localhost:5173',
};
