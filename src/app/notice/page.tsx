'use client';

import React from 'react';
import { useGetNotices } from '@/app/hooks/useGetNotices';
import axios from 'axios';

const NoticePage = () => {
  const { notices, isError, isLoading: isNoticesLoading } = useGetNotices();
  return (
    <>
      <main className="flex min-h-screen flex-col items-center px-4">
        {notices && notices.data.length > 0 ? (
          <div className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8">
            <div className="text-sm pb-2">
              <h1 className="text-xl font-bold text-center mb-4">
                お知らせ
              </h1>
            </div>
            <p className="text-md mb-6 font-medium">
              5月10日に東京競馬場で並ぶことができるユーザーが見つかりました。
              このユーザーに依頼する場合は「はい」を選択、
              依頼しない場合は「いいえ」を選択してください。
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded border-blue-700">
                はい
              </button>
              <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded">
                いいえ
              </button>
            </div>
          </div>
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
