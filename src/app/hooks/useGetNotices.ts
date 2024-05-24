import useSWR from 'swr';
import axios from 'axios';

export function useGetNotices() {
  const fetcher = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notice`);
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<any>(`/notice`, fetcher);

  // 呼び出し元で命名した方が、いい
  return {
    notices: data,
    isLoading,
    isError: error,
    mutate,
  };
}
