'use client';
import React from 'react';
import { useGetApplicants } from '@/app/hooks/useGetApplicants';
import axios from 'axios';
import { format } from 'date-fns';
import { useGetUser } from '../hooks/useGetUser';
import { Applicants, Job, User } from '@prisma/client';

export type ApplicantsWithJob = Applicants & {
  job: Job & {
    user: User;
  };
};

const NoticePage = () => {
  const { applicants, isError, isLoading, mutate } = useGetApplicants();

  const updateApplicantStatus = async (
    applicantId: number,
    status: boolean
  ) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/applicant/updateStatus`,
        {
          applicantId: applicantId,
          status: status,
        }
      );
      mutate();
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const addRejectedId = async (
    userId: number,
    jobId: number,
    noticeId: number
  ) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/job/addRejectedId`,
        {
          rejectedId: userId,
          jobId: jobId,
          noticeId: noticeId,
        }
      );
      mutate();
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const { user } = useGetUser();
  // console.log(11111111);
  // console.log(11111111);
  // console.log(11111111);
  // console.log(11111111);
  // console.log(applicants);

  if (isLoading)
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        aria-label="読み込み中"
      >
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );

  if (!applicants || applicants.length === 0)
    return (
      <div className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8">
        <div className="text-sm">
          <h1 className="text-xl font-bold text-center">通知がありません。</h1>
        </div>
      </div>
    );

  // 自分の申請ならupdatedAt, 自分の申請でないならcreatedAtを取得して、降順ソートする
  const sortedApplicants = applicants.sort((a, b) => {
    const dateA = a.userId === user?.id ? a.updatedAt : a.createdAt;
    const dateB = b.userId === user?.id ? b.updatedAt : b.createdAt;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return (
    <main className="flex min-h-screen flex-col items-center px-4">
      {sortedApplicants.length > 0 &&
        sortedApplicants.map((applicant: ApplicantsWithJob, index: number) =>
          applicant.userId === user?.id && applicant.status !== null ? (
            <div
              className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8"
              key={index}
            >
              <div className="text-sm pb-2">
                <h1 className="text-xl font-bold text-center mb-4">お知らせ</h1>
              </div>
              <p className="text-md mb-6 font-medium">
                {format(applicant.job.startDate, 'M月d日')}の
                {applicant.job.location}に応募した結果、承諾
                {applicant.status ? 'されました。' : 'されませんでした'}
                <br />
                {applicant.status &&
                  `こちらから${applicant.job.user.nickName}さんへ、メッセージを送信してください。`}
              </p>
              <div className="text-right mt-3">
                {format(applicant.updatedAt, 'yyyy年MM月dd日HH時mm分ss秒')}
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
                {format(applicant.job.startDate, 'M月d日')}に
                {applicant.job.location}
                で並ぶことができるユーザー({applicant.job.user.nickName}
                さん)が見つかりました。
                このユーザーに依頼する場合は「はい」を選択、
                依頼しない場合は「いいえ」を選択してください。
              </p>

              {applicant.status ? (
                <div className="text-left">
                  <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded">
                    はい
                  </button>
                  を選択済み
                </div>
              ) : applicant.status === false ? (
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
                    onClick={() => updateApplicantStatus(applicant.id, true)}
                  >
                    はい
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded"
                    onClick={() => updateApplicantStatus(applicant.id, false)}
                  >
                    いいえ
                  </button>
                </div>
              )}
              <div className="text-right mt-3">
                {format(applicant.createdAt, 'yyyy年MM月dd日HH時mm分ss秒')}
              </div>
            </div>
          )
        )}
    </main>
  );
};

export default NoticePage;
