import { useState } from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ErrorBanner from '../components/ui/ErrorBanner';
import { forgotPassword } from '../api/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await forgotPassword({ email });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
      {sent ? (
        <p className="text-sm text-green-600 mt-4">Check your email for a reset link.</p>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-6">Enter your email and we'll send you a reset link.</p>
          <ErrorBanner message={error} />
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" loading={loading}>Send reset link</Button>
          </form>
        </>
      )}
    </AuthLayout>
  );
}
