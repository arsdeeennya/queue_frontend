import React from 'react';

const NoticePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="shadow-lg rounded-lg bg-white mx-auto p-8 border border-gray-300">
        <h1 className="text-xl font-bold text-center mb-4">
          マッチングのお知らせ
        </h1>
        <p className="text-md mb-6 font-medium">
          5月10日に東京競馬場で並ぶことができるユーザーとマッチングしました。
          このユーザーに依頼する場合は「はい」を選択、
          依頼しない場合は「いいえ」を選択してください。
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded">
            はい
          </button>
          <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded">
            いいえ
          </button>
        </div>
      </div>
    </main>
  );
};

export default NoticePage;

