import React from 'react';
import { NotificationModel } from '@/app/hooks/useGetNotifications';
import ApprovalRejectNotification from './ApprovalRejectNotification';
import ApplicationNotification from './ApplicationNotification';
import CancelNotification from './CancelNotification';

const NotificationContent = ({
  notification,
  mutate,
}: {
  notification: NotificationModel;
  mutate: () => void;
}) => {
  switch (notification.type) {
    case 'APPROVAL':
    case 'REJECT':
      return <ApprovalRejectNotification notification={notification} />;
    case 'APPLICATION':
      return (
        <ApplicationNotification notification={notification} mutate={mutate} />
      );
    case 'CANCEL':
      return <CancelNotification notification={notification} />;
    default:
      return null;
  }
};

export default NotificationContent;
