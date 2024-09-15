import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { NotificationModel } from '@/app/hooks/useGetNotifications';
import axios from 'axios';

const ApplicationNotification = ({
  notification,
  mutate,
}: {
  notification: NotificationModel;
  mutate: () => void;
}) => {
  const updateApplicationStatus = async (status: boolean) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/application`, {
        notificationId: notification.id,
        status: status,
      });
      mutate();
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const isCancelled = notification.jobs.applications[0].deletedAt !== null;
  console.log(notification);
  return (
    <>
      <div className="text-sm pb-2">
        <h1 className="text-xl font-bold text-center mb-4">お知らせ</h1>
      </div>
      <p className="text-md mb-6 font-medium">
        {format(notification.jobs.startDate, 'M月d日')}に
        {notification.jobs.location}
        で並ぶことができるユーザー(
        {notification.jobs.applications[0].users.nickName}
        さん)が見つかりました。
        {isCancelled
          ? 'この応募はキャンセルされました。'
          : 'このユーザーに依頼する場合は「はい」を選択、依頼しない場合は「いいえ」を選択してください。'}
      </p>

      {!isCancelled && (
        <>
          {notification.jobs.applications[0].status ? (
            <>
              <div className="text-left mb-4">
                <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded">
                  はい
                </button>
                を選択済み
              </div>
              <Link href={`/chat/${notification.jobs.chats[0].roomId}`}>
                <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded">
                  チャット画面へ
                </button>
              </Link>
            </>
          ) : notification.jobs.applications[0].status === false ? (
            <div className="text-right">
              <button className="bg-red-500 text-white font-bold py-2 px-6 rounded">
                いいえ
              </button>
              を選択済み
            </div>
          ) : (
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded border-blue-700"
                onClick={() => updateApplicationStatus(true)}
              >
                はい
              </button>
              <button
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded"
                onClick={() => updateApplicationStatus(false)}
              >
                いいえ
              </button>
            </div>
          )}
        </>
      )}
      <div className="text-right mt-3">
        {format(notification.createdAt, 'yyyy年MM月dd日HH時mm分ss秒')}
      </div>
    </>
  );
};

export default ApplicationNotification;
