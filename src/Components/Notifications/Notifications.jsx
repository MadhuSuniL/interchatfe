import React from 'react';
import { FaBell } from 'react-icons/fa';

const Notifications = () => {
  const notificationCount = 3; // Example number for the badge

  return (
    <div className="relative inline-block">
      <FaBell className="text-lg text-main" />
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-pink-600 rounded-full">
          {notificationCount}
        </span>
      )}
    </div>
  );
};

export default Notifications;
