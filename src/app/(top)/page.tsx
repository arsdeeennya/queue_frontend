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

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { jobs, isError, isLoading } = useGetJobs();
  const { user } = useGetUser();
  const [isRegister, setIsRegister] = useState(false);

  if (isError) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex justify-center" aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  if (!jobs) return <>loading...</>;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div>
            {jobs.data.map((job: any, index: number) => (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg"
                key={index}
              >
                <div className="px-6 py-4">
                  <div className="flex flex-row justify-between">
                    <div className="font-bold text-xl mb-2">{job.location}</div>
                    {!user || user.data.id === job.userId ? (
                      <div
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                      >
                        応募する
                      </div>
                    ) : (
                      <div className="text-black font-bold italic">
                        あなたの投稿
                      </div>
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
    </>
  );
}
