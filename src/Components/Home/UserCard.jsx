import React from 'react';

function UserCard({ user }) {
  return (
    <div className="flex items-center border p-4 rounded-md">
      <img src={user.profile_pic} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.bio}</p>
      </div>
      <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md">Request</button>
    </div>
  );
}

export default UserCard;
