import useSWR from 'swr';
import axios from 'axios';

export function useGetJobs() {
  const fetcher = async () => {
    const res = await axios.get('http://localhost:3001/job');
    return res;
  };
  const { data, error, isLoading } = useSWR<any>(`jobs`, fetcher);

  return {
    jobs: data,
    isLoading,
    isError: error,
  };
}
