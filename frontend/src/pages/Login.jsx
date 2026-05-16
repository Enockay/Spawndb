import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ErrorBanner from '../components/ui/ErrorBanner';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-6">Welcome back</h1>
      <ErrorBanner message={error} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-indigo-600">Forgot password?</Link>
        </div>
        <Button type="submit" loading={loading}>Login</Button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-4">
        No account? <Link to="/signup" className="text-indigo-600">Sign up</Link>
      </p>
    </AuthLayout>
  );
}
