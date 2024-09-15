import React from 'react';
import { format } from 'date-fns';
import { NotificationModel } from '@/app/hooks/useGetNotifications';

const CancelNotification = ({
  notification,
}: {
  notification: NotificationModel;
}) => (
  <>
    <div className="text-sm pb-2">
      <h1 className="text-xl font-bold text-center mb-4">キャンセル通知</h1>
    </div>
    <p className="text-md mb-6 font-medium">
      {format(notification.jobs.startDate, 'M月d日')}の
      {notification.jobs.location}への応募がキャンセルされました。
    </p>
    <div className="text-right mt-3">
      {format(notification.createdAt, 'yyyy年MM月dd日HH時mm分ss秒')}
    </div>
  </>
);

export default CancelNotification;
