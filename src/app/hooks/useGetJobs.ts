import useSWR from 'swr';
import axios from 'axios';
import { Jobs, Users, Applications, Chats } from '@prisma/client';

export type JobModel = Jobs & {
  users: Users;
  applications: Applications[];
  chats: Chats[];
};

export function useGetJobs() {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/job`);
  const fetcher = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job`);
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<JobModel[]>(
    `/job`,
    async () => {
      const res = await fetcher();
      return res.data;
    }
  );

  return {
    jobs: data,
    isLoading,
    isError: error,
    mutate,
  };
}
