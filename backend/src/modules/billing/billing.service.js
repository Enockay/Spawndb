const Stripe = require('stripe');
const prisma = require('../../config/database');
const { STRIPE_SECRET_KEY, FRONTEND_URL } = require('../../config/env');

const stripe = new Stripe(STRIPE_SECRET_KEY);

async function getStripeCustomerId(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe.customers.create({ email: user.email });
  await prisma.user.update({ where: { id: userId }, data: { stripeCustomerId: customer.id } });
  return customer.id;
}

async function getSubscription(userId) {
  const customerId = await getStripeCustomerId(userId);
  const subs = await stripe.subscriptions.list({ customer: customerId, limit: 1 });
  return subs.data[0] ?? null;
}

async function getInvoices(userId) {
  const customerId = await getStripeCustomerId(userId);
  const invoices = await stripe.invoices.list({ customer: customerId, limit: 24 });
  return invoices.data;
}

async function createPortalSession(userId) {
  const customerId = await getStripeCustomerId(userId);
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${FRONTEND_URL}/billing`,
  });
  return { url: session.url };
}

module.exports = { getSubscription, getInvoices, createPortalSession };
