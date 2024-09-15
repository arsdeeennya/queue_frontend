'use client';
import React from 'react';
import {
  NotificationModel,
  useGetNotifications,
} from '@/app/hooks/useGetNotifications';
import { useGetUser } from '../hooks/useGetUser';
import LoadingSpinner from '../components/LoadingSpinner';
import NoNotifications from './components/NoNotifications';
import ApprovalRejectNotification from './components/ApprovalRejectNotification';
import ApplicationNotification from './components/ApplicationNotification';

const NotificationPage = () => {
  const { notifications, isLoading, mutate } = useGetNotifications();
  const { user } = useGetUser();

  if (isLoading) return <LoadingSpinner />;
  if (!notifications || notifications.data.length === 0)
    return <NoNotifications />;

  notifications.data = notifications.data.map(
    (notification: NotificationModel) => {
      notification.jobs.applications = notification.jobs.applications.filter(
        application => application.id === notification.applicationId
      );
      return notification;
    }
  );

  console.log(notifications.data);
  return (
    <main className="min-h-screen px-4">
      {notifications.data.map(
        (notification: NotificationModel, index: number) => (
          <div
            key={index}
            className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8"
          >
            {(() => {
              switch (notification.type) {
                case 'APPROVAL':
                case 'REJECT':
                  return (
                    <ApprovalRejectNotification notification={notification} />
                  );
                case 'APPLICATION':
                  return (
                    <ApplicationNotification
                      notification={notification}
                      mutate={mutate}
                    />
                  );
                case 'CANCEL':
                  return <>キャンセル</>;
              }
            })()}
          </div>
        )
      )}
    </main>
  );
};

export default NotificationPage;
