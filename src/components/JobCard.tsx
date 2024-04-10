// queue-frontend/src/components/EventCard.tsx

import React from 'react';

const JobCard = ({
  index,
  setIsModalOpen,
}: {
  index: number;
  setIsModalOpen: Function;
}) => {
  return (
    <div className="w-full p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-lg font-semibold text-blue-600">
        イベント#{index + 1}
      </h3>
      <p className="text-sm text-gray-600" onClick={() => setIsModalOpen(true)}>
        日時場所: 例
      </p>
      <p className="text-sm text-gray-600">金額: 例</p>
      <p className="text-sm text-gray-600">その他: 例</p>
    </div>
  );
};

export default EventCard;
