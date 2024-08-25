import useSWR from 'swr';
import axios from 'axios';
import { Applications, Jobs, Users } from '@prisma/client';

export type ApplicationsWithJob = Applications & {
  jobs: Jobs & {
    users: Users;
  };
};

export function useGetApplications() {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/application`);
  const fetcher = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/application`
    );
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<ApplicationsWithJob[]>(
    `/application`,
    async () => {
      const res = await fetcher();
      return res.data;
    }
  );

  return {
    applications: data,
    isLoading,
    isError: error,
    mutate,
  };
}
