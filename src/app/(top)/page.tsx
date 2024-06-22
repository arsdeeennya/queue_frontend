'use client';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import 'react-credit-cards-2/es/styles-compiled.css';
import JobCard from '../components/JobCard';
import RecruitmentButton from '../components/RecruitmentButton'; // New import statement
import { CreditCardForm } from '@/app/components/CreditCardForm';
import useSWR from 'swr';
import { useGetJobs } from '@/app/hooks/useGetJobs';
import Image from 'next/image';
import {
  differenceInHours,
  differenceInMinutes,
  format,
  getDate,
  getMonth,
  getYear,
} from 'date-fns';
import Link from 'next/link';
import { useGetUser } from '@/app/hooks/useGetUser';
import LoginModal from '../components/Modal/LoginModal';
// import Modal from '@/components/Modal'; // モーダルコンポーネントのインポート
import axios from 'axios';
import { Job } from '@prisma/client';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { jobs, isError, isLoading, mutate } = useGetJobs();
  const { user, isLoading: isLoadingUser } = useGetUser();

  if (isError) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        aria-label="読み込み中"
      >
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  if (!jobs || isLoadingUser) return <>loading...</>;

  const handlePatchRequest = async (jobId: number, userId: number) => {
    if (user && user.data && user.data.id) {
      try {
        const res1 = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/job`,
          {
            jobId: jobId,
          }
        );
        const res2 = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/notice`,
          {
            jobId: jobId,
            userId: userId,
          }
        );

        console.log('成功:', res1);
        mutate();

        // const res2 = await axios.post('http://localhost:3001/notice', {
        //   jobId: jobId,
        // });
        // console.log('成功:', res2);
      } catch (error) {
        console.error('エラー:', error);
      }
    } else {
      console.log('ユーザーがログインしていません。');
    }
  };

  const handleDeleteRequest = async (jobId: number) => {
    console.log('jobId', jobId);
    if (user && user.data && user.data.id) {
      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/job`,
          {
            data: {
              jobId: jobId,
            },
          }
        );
        console.log('削除成功:', res);
        mutate();
      } catch (error) {
        console.error('削除エラー:', error);
      }
    } else {
      console.log('ユーザーがログインしていません。');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-4">
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
          {jobs.data.map((job: any, index: number) => (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white mt-8"
              key={index}
            >
              <div className="px-6 py-4">
                <div className="flex flex-row justify-between">
                  <div className="font-bold text-xl mb-2">{job.location}</div>
                  {/* https://ja.react.dev/learn/conditional-rendering
                  これはシンプルな条件分岐の場合にはうまく動きますが、使いすぎないようにしましょう。条件のためのマークアップが増えすぎてコンポーネントが見づらくなった場合は、見やすくするために子コンポーネントを抽出することを検討してください。React ではマークアップはプログラミングコードの一種ですので、変数や関数といった道具を利用して複雑な式を読みやすく整頓することができます。 */}
                  {user && (
                    <>
                      {user &&
                      user.data.id === job.userId &&
                      !job.acceptedId ? (
                        <div className="flex items-center">
                          <button
                            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                            onClick={() => handleDeleteRequest(job.id)}
                          >
                            削除する
                          </button>
                        </div>
                      ) : user &&
                        user.data.id === job.userId &&
                        job.acceptedId ? (
                        <Link
                          href="/chat"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer"
                        >
                          応募者とチャット
                        </Link>
                      ) : !user ? (
                        <div
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer"
                          onClick={() => setIsModalOpen(true)}
                        >
                          ここに並ぶ
                        </div>
                      ) : job.rejectedIds.includes(user.data.id) ? (
                        <div className="bg-gray-500 text-white font-bold py-2 px-4 border border-gray-700 rounded cursor-not-allowed">
                          不採用
                        </div>
                      ) : job.applicants.includes(user.data.id) &&
                        job.acceptedId === user.data.id ? (
                        <Link
                          href="/chat"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer"
                        >
                          募集者とチャット
                        </Link>
                      ) : job.applicants.includes(user.data.id) ? (
                        <div className="bg-gray-500 text-white font-bold py-2 px-4 border border-gray-700 rounded cursor-not-allowed">
                          応募済
                        </div>
                      ) : (
                        <div
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer"
                          onClick={() => handlePatchRequest(job.id, job.userId)}
                        >
                          ここに並ぶ
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="pb-2">
                  <div className="rounded-full py-1 text-sm font-semibold text-gray-700">
                    ・日付：{format(job.startDate, 'M月d日')}
                  </div>
                  <div className="rounded-full py-1 text-sm font-semibold text-gray-700">
                    ・時刻：{format(job.startDate, 'H時m分')}~
                    {format(job.endDate, 'H時m分')}(
                    {differenceInHours(job.endDate, job.startDate)}時間
                    {differenceInMinutes(job.endDate, job.startDate) % 60}分)
                  </div>
                  <div className="rounded-full py-1 text-sm font-semibold text-gray-700">
                    ・金額：{job.price.toLocaleString()}円
                  </div>
                </div>
                <p className="text-gray-700 text-base">
                  {job.description} from {job.user.nickName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LoginModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </main>
  );
}
