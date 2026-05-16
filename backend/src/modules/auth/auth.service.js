const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const prisma = require('../../config/database');
const { JWT_SECRET } = require('../../config/env');
const { sendWelcomeEmail, sendPasswordResetEmail } = require('../../services/email.service');

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

async function signup({ email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw Object.assign(new Error('Email already in use'), { status: 409 });

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { email, password: hashed } });
  await sendWelcomeEmail(user.email);
  return { user: { id: user.id, email: user.email }, token: signToken(user) };
}

async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  return { user: { id: user.id, email: user.email }, token: signToken(user) };
}

async function forgotPassword(email) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;

  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600 * 1000);
  await prisma.user.update({ where: { id: user.id }, data: { resetToken: token, resetTokenExpires: expires } });
  await sendPasswordResetEmail(email, token);
}

async function resetPassword(token, password) {
  const user = await prisma.user.findFirst({ where: { resetToken: token, resetTokenExpires: { gt: new Date() } } });
  if (!user) throw Object.assign(new Error('Invalid or expired token'), { status: 400 });

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed, resetToken: null, resetTokenExpires: null } });
}

async function getMe(cookieToken) {
  if (!cookieToken) throw Object.assign(new Error('Unauthorized'), { status: 401 });
  const payload = jwt.verify(cookieToken, JWT_SECRET);
  const user = await prisma.user.findUnique({ where: { id: payload.id }, select: { id: true, email: true, role: true } });
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return user;
}

module.exports = { signup, login, forgotPassword, resetPassword, getMe };
