import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DatabaseCard from '../components/database/DatabaseCard';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Spinner from '../components/ui/Spinner';
import { useDatabases } from '../hooks/useDatabases';

export default function Dashboard() {
  const { databases, loading } = useDatabases();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Your Databases</h1>
          <Link to="/databases/new"><Button>+ New Database</Button></Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : databases.length === 0 ? (
          <EmptyState
            title="No databases yet"
            description="Create your first database to get started."
            action={<Link to="/databases/new"><Button>Create database</Button></Link>}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {databases.map((db) => <DatabaseCard key={db.id} db={db} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
