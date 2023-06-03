import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchApi();
  }, []);

  const refetch = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(url);
      setData(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, refetch };
};
