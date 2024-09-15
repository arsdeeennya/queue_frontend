'use client';
import React from 'react';
import {
  NotificationModel,
  useGetNotifications,
} from '@/app/hooks/useGetNotifications';
import axios from 'axios';
import { format } from 'date-fns';
import { useGetUser } from '../hooks/useGetUser';
import Link from 'next/link';

const NotificationPage = () => {
  const { notifications, isError, isLoading, mutate } = useGetNotifications();
  const updateApplicationStatus = async (
    applicationId: number,
    jobId: number,
    applicationUserId: number,
    status: boolean
  ) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/application`, {
        applicationId: applicationId,
        jobId: jobId,
        applicationUserId: applicationUserId,
        status: status,
      });
      mutate();
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const addRejectedId = async (
    userId: number,
    jobId: number,
    notificationId: number
  ) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/job/addRejectedId`,
        {
          rejectedId: userId,
          jobId: jobId,
          notificationId: notificationId,
        }
      );
      mutate();
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const { user } = useGetUser();

  if (isLoading)
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        aria-label="読み込み中"
      >
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );

  if (!notifications || notifications.data.length === 0)
    return (
      <div className="h-screen flex flex-col">
        <div className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8">
          <h1 className="text-xl font-bold text-center">通知がありません。</h1>
        </div>
      </div>
    );

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
        (notification: NotificationModel, index: number) =>
          notification.userId === user?.id &&
          notification.jobs.applications[0].status !== null ? (
            <div
              className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8"
              key={index}
            >
              <div className="text-sm pb-2">
                <h1 className="text-xl font-bold text-center mb-4">お知らせ</h1>
              </div>
              <p className="text-md mb-6 font-medium">
                {format(notification.jobs.startDate, 'M月d日')}の
                {notification.jobs.location}に応募した結果、承諾
                {notification.jobs.applications[0].status
                  ? `されました。${notification.users.nickName}さんへ、チャット画面でメッセージを送信してください。`
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
            </div>
          ) : (
            <div
              className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8"
              key={index}
            >
              <div className="text-sm pb-2">
                <h1 className="text-xl font-bold text-center mb-4">お知らせ</h1>
              </div>
              <p className="text-md mb-6 font-medium">
                {format(notification.jobs.startDate, 'M月d日')}に
                {notification.jobs.location}
                で並ぶことができるユーザー(
                {notification.jobs.applications[0].users.nickName}
                さん)が見つかりました。
                このユーザーに依頼する場合は「はい」を選択、
                依頼しない場合は「いいえ」を選択してください。
              </p>

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
                    onClick={() =>
                      updateApplicationStatus(
                        notification.jobs.applications[0].id,
                        notification.jobs.id,
                        notification.jobs.applications[0].users.id,
                        true
                      )
                    }
                  >
                    はい
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded"
                    onClick={() =>
                      updateApplicationStatus(
                        notification.jobs.applications[0].id,
                        notification.jobs.id,
                        notification.jobs.applications[0].users.id,
                        false
                      )
                    }
                  >
                    いいえ
                  </button>
                </div>
              )}
              <div className="text-right mt-3">
                {format(notification.createdAt, 'yyyy年MM月dd日HH時mm分ss秒')}
              </div>
            </div>
          )
      )}
    </main>
  );
};

export default NotificationPage;
