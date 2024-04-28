'use client';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import 'react-credit-cards-2/es/styles-compiled.css';
import JobCard from '../components/JobCard';
import RecruitmentButton from '../components/RecruitmentButton'; // New import statement
import { CreditCardForm } from '@/components/CreditCardForm';
import useSWR from 'swr';
import { useGetJobs } from '@/hooks/useGetJobs';
import Image from 'next/image';

export default function Home() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const { jobs, isError, isLoading } = useGetJobs();

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  // return <div>hello {data.name}!</div>;
  // console.log(jobs);
  // if (!jobs) return <>loading...</>;

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 sticky top-0">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <a href="/">
            <span className="font-semibold text-xl tracking-tight">
              並び代行マッチングサービス
            </span>
          </a>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {/* <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Docs
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Examples
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Blog
            </a> */}
          </div>
          <div>
            <a
              href="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              ログイン
            </a>
          </div>
        </div>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* {jobs.data} */}
          {/* {jobs.data.map((job: any, index: number) => (
          <div key={index}>
            <JobCard job={job} />
          </div>
        ))} */}
          <div>
            {/* <Image
            className="w-full"
            src="/img/card-top.jpg"
            alt="Sunset in the mountains"
            width={300}
            height={200}
          /> */}
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="flex flex-row justify-between">
                  <div className="font-bold text-xl mb-2">東京競馬場</div>
                  <a href="/chat">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                      応募
                    </button>
                  </a>
                </div>
                <div className="pb-2">
                  <div className="rounded-full py-1 text-sm font-semibold text-gray-700">
                    ・日付：2024年7月1日
                  </div>
                  <div className="rounded-full py-1 text-sm font-semibold text-gray-700">
                    ・時刻：9時~12時(3時間)
                  </div>
                  <div className="rounded-full py-1 text-sm font-semibold text-gray-700">
                    ・金額：8000円
                  </div>
                </div>
                <p className="text-gray-700 text-base">
                  有馬記念は、日本の競馬界における最高峰の競走の一つです。毎年12月に中山競馬場で行われ、日本国内外から多くの競走馬が参加します。賞金額も非常に高く、競馬ファンにとっては注目のレースの一つです。from
                  KanKobori
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <RecruitmentButton /> */}
        {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreditCardForm />
      </Modal> */}
      </main>
    </>
  );
}

// interface ModalProps {
//   isOpen: boolean;
//   children: React.ReactNode;
//   onClose: () => void;
// }

// const Modal = ({ isOpen, children, onClose }: ModalProps) => {
//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div className="modal-backdrop">
//       <div className="modal">
//         {children}
//         <button onClick={onClose}>閉じる</button>
//       </div>
//     </div>,
//     document.body
//   );
// };
