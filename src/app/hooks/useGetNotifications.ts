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

export function useGetNotifications(unreadOnly: boolean = false) {
  const fetcher = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/notification${
        unreadOnly ? '?unreadOnly=true' : ''
      }`
    );
    return res.data;
  };

  const { data, error, isLoading, mutate } = useSWR<NotificationModel[]>(
    `/notification${unreadOnly ? '?unreadOnly=true' : ''}`,
    fetcher
  );

  return {
    notifications: data,
    isLoading,
    isError: error,
    mutate,
  };
}
