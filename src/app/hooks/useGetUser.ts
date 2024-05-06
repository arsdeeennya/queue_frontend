import useSWR from 'swr';
import axios from 'axios';

export function useGetUser() {
  const fetcher = async () => {
    const res = await axios.get('http://localhost:3001/user');
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<any>(`/user`, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // 404では再試行しない。
      if (error.status === 401) return;

      // // 特定のキーでは再試行しない。
      // if (key === '/api/user') return;

      // // 再試行は10回までしかできません。
      // if (retryCount >= 10) return;

      // // 5秒後に再試行します。
      // setTimeout(() => revalidate({ retryCount }), 5000);
    },
    // shouldRetryOnError: false,
  });

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}
