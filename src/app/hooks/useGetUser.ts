import useSWR from 'swr';
import axios from 'axios';

export function useGetUser() {
  const fetcher = async () => {
    const res = await axios.get('http://localhost:3001/user');
    return res;
  };
  const { data, error, isLoading } = useSWR<any>(`user`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
