import useSWR from 'swr';
import axios from 'axios';
import { Applicants, Job, User } from '@prisma/client';

export type UserWithJobs = User & {
  jobs: (Job & {
    applicants: Applicants[];
  })[];
};

export function useGetUser() {
  const fetcher = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<UserWithJobs>(
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
