import { useState, useEffect, useCallback } from 'react';
import { getDatabase } from '../api/databases';

export function useDatabase(id) {
  const [database, setDatabase] = useState(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(() => {
    getDatabase(id).then((res) => setDatabase(res.data));
  }, [id]);

  useEffect(() => {
    getDatabase(id)
      .then((res) => setDatabase(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  return { database, loading, refetch };
}
