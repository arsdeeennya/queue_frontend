import useSWR from 'swr';
import axios from 'axios';

export function useGetChats(id: string) {
  const fetcher = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`
    );
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<any>(
    `/chat/${id}`,
    fetcher
  );

  return {
    chats: data,
    isLoading,
    isError: error,
    mutate,
  };
}
