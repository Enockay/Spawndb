const { Resend } = require('resend');
const { RESEND_API_KEY, FRONTEND_URL } = require('../config/env');

const resend = new Resend(RESEND_API_KEY);

const FROM = 'SpawnDB <no-reply@spawndb.io>';

async function sendWelcomeEmail(to) {
  await resend.emails.send({ from: FROM, to, subject: 'Welcome to SpawnDB!', text: 'Your account is ready.' });
}

async function sendPasswordResetEmail(to, token) {
  const url = `${FRONTEND_URL}/reset-password?token=${token}`;
  await resend.emails.send({ from: FROM, to, subject: 'Reset your password', text: `Reset link: ${url}` });
}

async function sendSuspensionEmail(to, dbName) {
  await resend.emails.send({ from: FROM, to, subject: `Database ${dbName} suspended`, text: 'Your database has been suspended due to a failed payment.' });
}

async function sendDeletionWarningEmail(to, dbName) {
  await resend.emails.send({ from: FROM, to, subject: `Database ${dbName} will be deleted`, text: 'Your suspended database will be deleted in 24 hours.' });
}

module.exports = { sendWelcomeEmail, sendPasswordResetEmail, sendSuspensionEmail, sendDeletionWarningEmail };
