const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

function authenticate(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { authenticate };
