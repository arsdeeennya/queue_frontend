'use client';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import 'react-credit-cards-2/es/styles-compiled.css';
import JobCard from '../components/JobCard';
import RecruitmentButton from '../components/RecruitmentButton'; // New import statement
import { CreditCardForm } from '@/components/CreditCardForm';
import useSWR from 'swr';
import { useGetJobs } from '@/hooks/useGetJobs';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { jobs, isError, isLoading } = useGetJobs();
  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  // return <div>hello {data.name}!</div>;
  if (!jobs) return <>loading...</>;
  console.log(jobs.data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        {jobs.data.map((job: any, index: number) => (
          <div key={index}>
            <JobCard job={job} />
          </div>
        ))}
      </div>
      <RecruitmentButton />
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreditCardForm />
      </Modal> */}
    </main>
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
