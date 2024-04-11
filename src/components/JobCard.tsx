// queue-frontend/src/components/EventCard.tsx

import React from 'react';

const JobCard = ({
  key,
  job,
}: {
  key: number;
  job: {
    date: number;
    place: string;
    price: number;
    location: string;
    time: number;
  };
}) => {
  return (
    <div className="w-full p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-lg font-semibold text-blue-600">
        イベント日程： {job.date}
      </h3>
      <p className="text-sm text-gray-600">イベント名： {job.place}</p>
      <p className="text-sm text-gray-600">金額: {job.price}円</p>
      <p className="text-sm text-gray-600">
        場所：{job.location}（最寄駅や会場名、お店の名前をご記入ください）
      </p>
      <p className="text-sm text-gray-600">
        並び代行時間：{job.time}
        時間（何時間ほど並ぶのか、目安をご記入ください。）
      </p>
    </div>
  );
};

export default JobCard;
