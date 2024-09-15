import React from 'react';

const NoNotifications = () => (
  <div className="h-screen flex flex-col">
    <div className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box max-w-md mt-8">
      <h1 className="text-xl font-bold text-center">通知がありません。</h1>
    </div>
  </div>
);

export default NoNotifications;