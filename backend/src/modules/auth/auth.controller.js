const service = require('./auth.service');

async function signup(req, res, next) {
  try {
    const { user, token } = await service.signup(req.body);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
    res.status(201).json({ user });
  } catch (err) { next(err); }
}

async function login(req, res, next) {
  try {
    const { user, token } = await service.login(req.body);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
    res.json({ user });
  } catch (err) { next(err); }
}

async function logout(req, res) {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
}

async function forgotPassword(req, res, next) {
  try {
    await service.forgotPassword(req.body.email);
    res.json({ message: 'If that email exists, a reset link was sent.' });
  } catch (err) { next(err); }
}

async function resetPassword(req, res, next) {
  try {
    await service.resetPassword(req.body.token, req.body.password);
    res.json({ message: 'Password updated' });
  } catch (err) { next(err); }
}

async function me(req, res, next) {
  try {
    const user = await service.getMe(req.cookies?.token);
    res.json(user);
  } catch (err) { next(err); }
}

module.exports = { signup, login, logout, forgotPassword, resetPassword, me };
