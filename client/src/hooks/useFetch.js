import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
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
