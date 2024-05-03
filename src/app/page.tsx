'use client';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import 'react-credit-cards-2/es/styles-compiled.css';
import JobCard from './components/JobCard';
import RecruitmentButton from './components/RecruitmentButton'; // New import statement
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
// import Modal from '@/components/Modal'; // モーダルコンポーネントのインポート

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { jobs, isError, isLoading } = useGetJobs();
  const { user } = useGetUser();

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
        {isModalOpen && (
          <div
            id="authentication-modal"
            aria-hidden="true"
            className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-75"
            onClick={() => setIsModalOpen(false)} // モーダルの外側をクリックしたときにモーダルを閉じる
          >
            <div
              className="relative w-full max-w-md p-4 h-auto"
              onClick={e => e.stopPropagation()} // モーダルの内容部分のクリックイベントが外側に伝播しないようにする
            >
              <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                <div className="flex justify-end p-2">
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="authentication-modal"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <form
                  className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
                  action="#"
                >
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    ログインして応募する
                  </h3>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required={true}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                      パスワード
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required={true}
                    />
                  </div>
                  {/* <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                          required={true}
                        />
                      </div>
                      <div className="text-sm ml-3">
                        <label
                          htmlFor="remember"
                          className="font-medium text-gray-900 dark:text-gray-300"
                        >
                          パスワードを記憶
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                    >
                      パスワードを忘れた方はこちら
                    </a>
                  </div> */}
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    ログインする
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    <a
                      href="#"
                      className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                      会員登録はこちら
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
