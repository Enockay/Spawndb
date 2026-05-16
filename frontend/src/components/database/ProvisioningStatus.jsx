import { useEffect } from 'react';
import Spinner from '../ui/Spinner';
import { usePollStatus } from '../../hooks/usePollStatus';

export default function ProvisioningStatus({ databaseId, onReady }) {
  const { status } = usePollStatus(databaseId);

  useEffect(() => {
    if (status === 'Active') onReady?.();
  }, [status, onReady]);

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <Spinner size="lg" />
      <p className="text-gray-600 font-medium">Provisioning your database…</p>
      <p className="text-sm text-gray-400">This usually takes 30–60 seconds.</p>
    </div>
  );
}
