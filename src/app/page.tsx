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
import {
  differenceInHours,
  differenceInMinutes,
  format,
  getDate,
  getMonth,
  getYear,
} from 'date-fns';
import Link from 'next/link';

export default function Home() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { jobs, isError, isLoading } = useGetJobs();

  if (isError) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex justify-center" aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  // return <div>hello {jobs.name}!</div>;
  console.log(jobs.data);
  if (!jobs) return <>loading...</>;

  return (
    <>
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
            {jobs.data.map((job: any, index: number) => (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg"
                key={index}
              >
                <div className="px-6 py-4">
                  <div className="flex flex-row justify-between">
                    <div className="font-bold text-xl mb-2">{job.location}</div>
                    <Link href="/chat">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        応募
                      </button>
                    </Link>
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
                    {job.description}from KanKobori
                  </p>
                </div>
              </div>
            ))}
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
