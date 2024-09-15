'use client';
import React from 'react';
import {
  NotificationModel,
  useGetNotifications,
} from '@/app/hooks/useGetNotifications';
import { useGetUser } from '../hooks/useGetUser';
import LoadingSpinner from '../components/LoadingSpinner';
import NoNotifications from './components/NoNotifications';
import NotificationContent from './components/NotificationContent';

const NotificationPage = () => {
  const { notifications, isLoading, mutate } = useGetNotifications();
  const { user } = useGetUser();

  if (isLoading) return <LoadingSpinner />;
  if (!notifications || notifications.data.length === 0)
    return <NoNotifications />;

  // 複数ある応募の中から、通知に関係している応募のみを残す
  notifications.data = notifications.data.map(
    (notification: NotificationModel) => {
      notification.jobs.applications = notification.jobs.applications.filter(
        application => application.id === notification.applicationId
      );
      return notification;
    }
  );

  return (
    <main className="min-h-screen px-4">
      {notifications.data.map(
        (notification: NotificationModel, index: number) => (
          <div
            key={index}
            className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8"
          >
            <NotificationContent notification={notification} mutate={mutate} />
          </div>
        )
      )}
    </main>
  );
};

export default NotificationPage;
