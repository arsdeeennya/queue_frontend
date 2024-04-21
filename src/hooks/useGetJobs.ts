import useSWR from 'swr';
import axios from 'axios';

export function useGetJobs() {
  console.log(1111111);
  const fetcher = async () => {
    const res = await axios.get('http://localhost:3001/job');
    console.log(res);
    return res;
  };
  const { data, error, isLoading } = useSWR<any>(`jobs`, fetcher);

  return {
    jobs: data,
    isLoading,
    isError: error,
  };
}
