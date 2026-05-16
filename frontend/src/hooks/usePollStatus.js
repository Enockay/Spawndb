import { useState, useEffect, useRef } from 'react';
import { pollStatus } from '../api/databases';

export function usePollStatus(id) {
  const [status, setStatus] = useState('Provisioning');
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      const res = await pollStatus(id);
      setStatus(res.data.status);
      if (res.data.status === 'Active') {
        clearInterval(intervalRef.current);
      }
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [id]);

  return { status };
}
