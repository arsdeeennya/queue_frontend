'use client';
import React from 'react';
import {
  NotificationModel,
  useGetNotifications,
} from '@/app/hooks/useGetNotifications';
import LoadingSpinner from '../components/LoadingSpinner';
import NoNotifications from './components/NoNotifications';
import NotificationContent from './components/NotificationContent';
import { format } from 'date-fns';

const NotificationPage = () => {
  const { notifications, isLoading, mutate } = useGetNotifications();

  if (isLoading) return <LoadingSpinner />;
  if (!notifications || notifications.length === 0) return <NoNotifications />;

  // 複数ある応募の中から
  const notificationsFiltered = notifications.map(
    (notification: NotificationModel) => {
      notification.jobs.applications = notification.jobs.applications.filter(
        application => application.id === notification.applicationId
      );
      return notification;
    }
  );

  return (
    <main className="min-h-screen px-4">
      {notificationsFiltered.map(
        (notification: NotificationModel, index: number) => (
          <>
            <div
              key={index}
              className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8"
            >
              <NotificationContent
                notification={notification}
                mutate={mutate}
              />
              <div className="text-right mt-3">
                {format(notification.updatedAt, 'yyyy年MM月dd日HH時mm分ss秒')}
              </div>
            </div>
          </>
        )
      )}
    </main>
  );
};

export default NotificationPage;
