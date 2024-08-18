import React, { useState } from 'react';
import apiCall from '../../Functions/Axios';

function UserCard({ user }) {

  const [isLoding, setIsLoading] = useState(false)
  const [userX, setuserX] = useState(user)

  const reqeustToggle = () => {
    let url = 'requests/friend-request-toggle'
    let body = {
      to_user : user.user.username
    }
    let method = 'post'
    let loadingState = setIsLoading
    const onSuccess = (data) => {
      setuserX(data)
    }
    apiCall(url, body, method, loadingState, onSuccess)
  }


  return (
    <div className="grid grid-cols-8 items-center rounded-md my-3">
      <img 
        src={userX.profile_pic} 
        alt={userX.name} 
        className="w-12 h-12 rounded-full object-cover mr-4 col-span-1"
      />
      <div className={userX.is_friend ? 'col-span-7 pl-3' : 'col-span-5 pl-3'}>
        <h2 className="text-lg text-main font-semibold">{userX.name}</h2>
        <p className="text-xs text-gray-500">{userX.bio}</p>
      </div>
      {
        !userX.is_friend &&
        (
          userX.is_requested ? 
          <button onClick={reqeustToggle} className="col-span-2 ml-auto bg-pink-100 text-main font-semibold px-2 py-1 rounded-md">Undo</button> 
          : 
          <button onClick={reqeustToggle} className="col-span-2 ml-auto bg-main text-sm text-pink-100 font-semibold px-4 py-1 rounded-badge transition duration-200 hover:bg-pink-300 hover:text-pink-600">Request</button>
        )
      }
    </div>
  );
}

export default UserCard;
