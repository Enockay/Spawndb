import client from './client';

export const getSubscription = () => client.get('/billing/subscription');
export const getInvoices = () => client.get('/billing/invoices');
export const createPortalSession = () => client.post('/billing/portal');
