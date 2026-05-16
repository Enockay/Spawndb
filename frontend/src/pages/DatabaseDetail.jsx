import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import ConnectionStringDisplay from '../components/database/ConnectionStringDisplay';
import ProvisioningStatus from '../components/database/ProvisioningStatus';
import { useDatabase } from '../hooks/useDatabase';
import { deleteDatabase } from '../api/databases';
import { dbTypeLabel } from '../utils/dbTypeLabel';
import { formatDate } from '../utils/formatDate';

export default function DatabaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { database, loading, refetch } = useDatabase(id);

  const handleDelete = async () => {
    if (!window.confirm('Delete this database? This cannot be undone.')) return;
    await deleteDatabase(id);
    navigate('/dashboard');
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (!database) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{database.name}</h1>
            <p className="text-sm text-gray-500">{dbTypeLabel(database.db_type)} · Created {formatDate(database.created_at)}</p>
          </div>
          <Badge status={database.status} />
        </div>

        {database.status === 'Provisioning' ? (
          <ProvisioningStatus databaseId={id} onReady={refetch} />
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Connection String</p>
              <ConnectionStringDisplay connectionString={database.connection_string} />
            </div>
          </div>
        )}

        <div className="mt-10 border-t pt-6">
          <Button variant="danger" onClick={handleDelete}>Delete Database</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
