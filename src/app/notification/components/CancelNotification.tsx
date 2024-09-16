import React from 'react';
import { format } from 'date-fns';
import { NotificationModel } from '@/app/hooks/useGetNotifications';

const CancelNotification = ({
  notification,
}: {
  notification: NotificationModel;
}) => (
  <div className="flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <div className="w-1/3"></div>
      <h1 className="text-xl font-bold text-center w-1/3">キャンセル通知</h1>
      <div className="w-1/3 flex justify-end">
        {!notification.readAt && (
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            新着メッセージ
          </div>
        )}
      </div>
    </div>
    <p className="text-md mb-6 font-medium">
      {format(notification.jobs.startDate, 'M月d日')}の
      {notification.jobs.location}への応募がキャンセルされました。
    </p>
  </div>
);

export default CancelNotification;
