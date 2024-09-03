import useSWR from 'swr';
import axios from 'axios';
import { Users, Jobs, Applications } from '@prisma/client';

export type UserModel = Users & {
  jobs: (Jobs & {
    applications: Applications[];
  })[];
};

export function useGetUser() {
  const fetcher = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<UserModel>(
    `/user`,
    async () => {
      const res = await fetcher();
      return res.data;
    }
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}
