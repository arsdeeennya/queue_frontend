import useSWR from 'swr';
import axios from 'axios';

export function useGetChats() {
  const fetcher = async () => {
    const res = await axios.get('http://localhost:3001/chat');
    return res;
  };
  const { data, error, isLoading } = useSWR<any>(`/chat`, fetcher);

  return {
    chats: data,
    isLoading,
    isError: error,
  };
}