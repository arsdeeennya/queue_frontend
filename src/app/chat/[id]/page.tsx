/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client';

import { useGetChats } from '@/app/hooks/useGetChats';
import { useGetUser } from '@/app/hooks/useGetUser';
import { Chats } from '@prisma/client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useParams();
  const id = router.id as string;
  const { chats, isError, isLoading, mutate } = useGetChats(id);
  const { user } = useGetUser();
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextRouter = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async data => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        roomId: chats.data[0].roomId,
        jobId: chats.data[0].jobId,
        text: data.text,
      });
      // 募集成功後の処理をここに記述
      mutate();
      reset(); // フォームを空にする
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isError) {
      // エラーが発生した場合（アクセス権がない場合など）、ホームページにリダイレクト
      nextRouter.push('/');
    }
  }, [isError, nextRouter]);

  if (isError) return null; // エラー時は何も表示せずにリダイレクト

  if (isLoading)
    return (
      <div className="flex justify-center" aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );

  if (!chats) return <>loading...</>;
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-200 flex-1 overflow-y-scroll pb-20">
        <div className="px-4 py-2">
          {chats.data.map((chat: Chats, index: number) => (
            <div key={chat.id}>
              {chat.userId !== user?.id ? (
                <div className="bg-white rounded-lg p-2 shadow mb-2 inline-block">
                  {chat.text}
                </div>
              ) : (
                <div className="flex items-center justify-end">
                  <div className="bg-blue-500 text-white rounded-lg p-2 shadow mr-2 inline-block">
                    {chat.text}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>
      </div>
      <form
        className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex space-x-2 fixed bottom-0 left-0 right-0 p-4 bg-white">
          <textarea
            {...register('text', { required: true })}
            name="text"
            id="text"
            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="メッセージを入力してください"
            required={true}
            onKeyDown={e => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          ></textarea>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">
            送信
          </button>
        </div>
      </form>
    </div>
  );
}
