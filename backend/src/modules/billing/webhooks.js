const router = require('express').Router();
const Stripe = require('stripe');
const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = require('../../config/env');
const prisma = require('../../config/database');

const stripe = new Stripe(STRIPE_SECRET_KEY);

router.post('/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch {
    return res.status(400).json({ message: 'Webhook signature verification failed' });
  }

  switch (event.type) {
    case 'invoice.payment_succeeded':
      // Mark user subscription as active
      break;
    case 'customer.subscription.deleted':
      // Suspend user's databases
      break;
  }

  res.json({ received: true });
});

module.exports = router;
