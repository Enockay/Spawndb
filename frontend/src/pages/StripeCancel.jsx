import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function StripeCancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-5xl mb-4">😕</div>
      <h1 className="text-2xl font-bold mb-2">Payment cancelled</h1>
      <p className="text-gray-500 mb-6">No worries — you were not charged. You can try again anytime.</p>
      <Link to="/billing"><Button variant="secondary">Back to Billing</Button></Link>
    </div>
  );
}
