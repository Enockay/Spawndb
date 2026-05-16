import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ErrorBanner from '../components/ui/ErrorBanner';
import DatabaseTypeSelector from '../components/database/DatabaseTypeSelector';
import { createDatabase } from '../api/databases';

export default function CreateDatabase() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dbType, setDbType] = useState('postgresql');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await createDatabase({ name, db_type: dbType });
      navigate(`/databases/${res.data.id}`);
    } catch (err) {
      setError(err.message || 'Failed to create database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-10">
        <h1 className="text-2xl font-bold mb-8">New Database</h1>
        <ErrorBanner message={error} />
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
          <Input label="Database name" value={name} onChange={(e) => setName(e.target.value)} required />
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Database type</p>
            <DatabaseTypeSelector value={dbType} onChange={setDbType} />
          </div>
          <Button type="submit" loading={loading}>Create Database</Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
