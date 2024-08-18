import React from 'react';

const FakeUserStatus = ({
  online
}) => {
  // Function to generate a random status

  const status = online

  return (
    <div className={`flex items-center space-y-2 ${status === true ? 'text-green-500' : 'text-gray-400'}`}>
      <span>{status ? 'online' : 'offline'}</span>
    </div>
  );
};

export default FakeUserStatus;
