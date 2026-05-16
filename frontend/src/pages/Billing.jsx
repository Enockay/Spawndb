import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { getSubscription, getInvoices, createPortalSession } from '../api/billing';
import { formatDate } from '../utils/formatDate';

export default function Billing() {
  const [subscription, setSubscription] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSubscription(), getInvoices()])
      .then(([sub, inv]) => {
        setSubscription(sub.data);
        setInvoices(inv.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePortal = async () => {
    const res = await createPortalSession();
    window.location.href = res.data.url;
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        <h1 className="text-2xl font-bold mb-8">Billing</h1>

        <section className="border rounded-xl p-6 mb-8">
          <h2 className="font-semibold mb-2">Subscription</h2>
          <p className="text-sm text-gray-600">Status: <strong>{subscription?.status ?? 'None'}</strong></p>
          <Button className="mt-4" variant="secondary" onClick={handlePortal}>
            Manage payment method
          </Button>
        </section>

        <section>
          <h2 className="font-semibold mb-4">Invoices</h2>
          {invoices.length === 0 ? (
            <p className="text-sm text-gray-500">No invoices yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-500 border-b"><th className="pb-2">Date</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b last:border-0">
                    <td className="py-3">{formatDate(inv.created)}</td>
                    <td>${(inv.amount_paid / 100).toFixed(2)}</td>
                    <td>{inv.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
