import useSWR from 'swr';
import axios from 'axios';
import {
  Applications,
  Chats,
  Jobs,
  Notifications,
  Users,
} from '@prisma/client';

export type NotificationModel = Notifications & {
  jobs: Jobs & {
    applications: (Applications & {
      users: Users;
    })[];
    chats: Chats[];
    users: Users;
  };
  users: Users;
};

export function useGetNotifications() {
  const fetcher = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/notification`
    );
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<any>(
    `/notification`,
    fetcher
  );
  // 呼び出し元で命名した方が、いい
  return {
    notifications: data,
    isLoading,
    isError: error,
    mutate,
  };
}
