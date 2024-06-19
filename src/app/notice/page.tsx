'use client';

import React from 'react';
import { useGetNotices } from '@/app/hooks/useGetNotices';
import axios from 'axios';
import { format } from 'date-fns';

const NoticePage = () => {
  const { notices, isError, isLoading: isNoticesLoading } = useGetNotices();
  const addAcceptedId = async (userId: number, jobId: number) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/job/addAcceptedId`,
        {
          acceptedId: userId,
          jobId: jobId,
        }
      );
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const addRejectedId = async (userId: number, jobId: number) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/job/addRejectedId`,
        {
          rejectedId: userId,
          jobId: jobId,
        }
      );
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center px-4">
        {notices && notices.data.length > 0 ? (
          notices.data.map((notice: any, index: number) => (
            <div
              className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8"
              key={index}
            >
              <div className="text-sm pb-2">
                <h1 className="text-xl font-bold text-center mb-4">お知らせ</h1>
              </div>
              <p className="text-md mb-6 font-medium">
                {format(notice.job.startDate, 'M月d日')}に{notice.job.location}
                で並ぶことができるユーザー({notice.applicant.nickName}
                さん)が見つかりました。
                このユーザーに依頼する場合は「はい」を選択、
                依頼しない場合は「いいえ」を選択してください。
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded border-blue-700"
                  onClick={() =>
                    addAcceptedId(notice.applicant.id, notice.job.id)
                  }
                >
                  はい
                </button>
                <button
                  className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded"
                  onClick={() =>
                    addRejectedId(notice.applicant.id, notice.job.id)
                  }
                >
                  いいえ
                </button>
              </div>
              <div className="text-right mt-3">
                {format(notice.createdAt, 'yyyy年M月d日H時m分')}
              </div>
            </div>
          ))
        ) : (
          <div className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8">
            <div className="text-sm">
              <h1 className="text-xl font-bold text-center">
                通知がありません。
              </h1>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default NoticePage;
