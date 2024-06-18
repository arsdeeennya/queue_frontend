import useSWR from 'swr';
import axios from 'axios';

export function useGetNoticesReadCheck(read: boolean) {
  const fetcher = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/notice/read/${read}`
    );
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<any>(`/notice/read`, fetcher);

  // 呼び出し元で命名した方が、いい
  return {
    newNotices: data,
    isLoading,
    isError: error,
    mutate,
  };
}
