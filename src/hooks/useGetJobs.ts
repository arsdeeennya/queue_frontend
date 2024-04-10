import useSWR from 'swr';
import axios from 'axios';

export function useGetJobs() {
  const fetcher = async () => {
    const res = await axios.get('http://localhost:3001/jobs');
    return res.data;
  };
  const { data, error, isLoading } = useSWR(`jobs`, fetcher);

  return {
    jobs: data,
    isLoading,
    isError: error,
  };
}
