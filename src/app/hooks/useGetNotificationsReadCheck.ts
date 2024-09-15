import useSWR from 'swr';
import axios from 'axios';

export function useGetNotificationsReadCheck(read: boolean) {
  const fetcher = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/notification/read/${read}`
    );
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<any>(
    `/notification/read`,
    fetcher
  );

  // 呼び出し元で命名した方が、いい
  return {
    newNotifications: data,
    isLoading,
    isError: error,
    mutate,
  };
}
