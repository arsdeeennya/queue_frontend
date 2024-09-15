import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { NotificationModel } from '@/app/hooks/useGetNotifications';

const ApprovalRejectNotification = ({
  notification,
}: {
  notification: NotificationModel;
}) => {
  console.log(notification);
  return (
    <>
      <div className="text-sm pb-2">
        <h1 className="text-xl font-bold text-center mb-4">応募結果</h1>
      </div>
      <p className="text-md mb-6 font-medium">
        {format(notification.jobs.startDate, 'M月d日')}の
        {notification.jobs.location}に応募した結果、承諾
        {notification.jobs.applications[0].status
          ? `されました。${notification.jobs.users.nickName}さんへ、チャット画面でメッセージを送信してください。`
          : 'されませんでした。'}
        <br />
        {notification.jobs.applications[0].status && (
          <Link href={`/chat/${notification.jobs.chats[0].roomId}`}>
            <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded">
              チャット画面へ
            </button>
          </Link>
        )}
      </p>
      <div className="text-right mt-3">
        {format(notification.updatedAt, 'yyyy年MM月dd日HH時mm分ss秒')}
      </div>
    </>
  );
};

export default ApprovalRejectNotification;
