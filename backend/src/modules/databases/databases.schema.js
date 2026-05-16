const { z } = require('zod');

const createDatabaseSchema = z.object({
  name:    z.string().min(2).max(64).regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens'),
  db_type: z.enum(['postgresql', 'mysql', 'redis', 'mongodb']),
});

module.exports = { createDatabaseSchema };
