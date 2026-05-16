import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function StripeSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-5xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold mb-2">Payment successful!</h1>
      <p className="text-gray-500 mb-6">Your subscription is now active. Start spawning databases.</p>
      <Link to="/dashboard"><Button>Go to Dashboard</Button></Link>
    </div>
  );
}
