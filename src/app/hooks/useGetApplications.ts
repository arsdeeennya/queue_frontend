import useSWR from 'swr';
import axios from 'axios';
import { Applications, Chats, Jobs, Users } from '@prisma/client';

export type ApplicationModel = Applications & {
  jobs: Jobs & {
    users: Users;
    chats: Chats[];
  };
};

export function useGetApplications() {
  const fetcher = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/application`
    );
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<ApplicationModel[]>(
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
