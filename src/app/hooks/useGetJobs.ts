import useSWR from 'swr';
import axios from 'axios';

export function useGetJobs() {
  const fetcher = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job`);
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<any>(`/job`, fetcher);

  return {
    jobs: data,
    isLoading,
    isError: error,
    mutate,
  };
}
