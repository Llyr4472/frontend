  import { useState, useEffect } from 'react';
  import { fetchDisasters } from '../api/disasterApi';
  import { Disaster } from '../types/disaster';

  const useDisasters = () => {
    const [disasters, setDisasters] = useState<Disaster[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const getDisasters = async () => {
        try {
          setLoading(true);
          const data = await fetchDisasters();
          setDisasters(data);
          setError(null);
        } catch (err) {
          setError('Failed to fetch disasters: ' + (err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      getDisasters();
    }, []);

    return { disasters, loading, error };
  };

  export default useDisasters;
