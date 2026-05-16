import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ErrorBanner from '../components/ui/ErrorBanner';
import { resetPassword } from '../api/auth';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await resetPassword({ token: searchParams.get('token'), password });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-6">Set new password</h1>
      <ErrorBanner message={error} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <Input label="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" loading={loading}>Reset password</Button>
      </form>
    </AuthLayout>
  );
}
