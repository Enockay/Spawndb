import { useState, useEffect } from 'react';
import { listDatabases } from '../api/databases';

export function useDatabases() {
  const [databases, setDatabases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listDatabases()
      .then((res) => setDatabases(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { databases, loading };
}
