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

export default function Example() {
  const { chats, isError, isLoading } = useGetChats();

  if (isError) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex justify-center" aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  // return <div>hello {jobs.name}!</div>;
  if (!chats) return <>loading...</>;
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="bg-gray-200 flex-1 overflow-y-scroll">
          <div className="px-4 py-2">
            {chats.data.map((chat: any, index: number) => (
              <>
                {chat.userId === 1 ? (
                  <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
                    {chat.text}
                  </div>
                ) : (
                  <div className="flex items-center justify-end">
                    <div className="bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
                      {chat.text}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-2 sticky bottom-0">
          <div className="flex items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
