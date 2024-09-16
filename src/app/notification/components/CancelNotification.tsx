import React from 'react';
import { format } from 'date-fns';
import { NotificationModel } from '@/app/hooks/useGetNotifications';

const CancelNotification = ({
  notification,
}: {
  notification: NotificationModel;
}) => (
  <div className="flex flex-col">
    <div className="flex items-center mb-4 relative">
      <h1 className="text-xl font-bold text-center flex-grow">キャンセル通知</h1>
      {!notification.readAt && (
        <div className="absolute right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          新着メッセージ
        </div>
      )}
    </div>
    <p className="text-md mb-6 font-medium">
      {format(notification.jobs.startDate, 'M月d日')}の
      {notification.jobs.location}への応募がキャンセルされました。
    </p>
  </div>
);

export default CancelNotification;
