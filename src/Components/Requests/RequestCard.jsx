import React, { useState } from 'react';
import apiCall from '../../Functions/Axios';

const RequestCard = ({ request }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState(request.status);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleAccept = () => {
    const url = `requests/accept-or-reject/${request.uiid}?accept=true`;
    const body = { to_user: request.to_user.user.id };
    const method = 'post';
    const loadingState = setIsLoading;
    const onSuccess = (data) => {
      setRequestStatus('accepted');
      setMessage('Accepted');
      setShowMessage(true);
    };

    apiCall(url, body, method, loadingState, onSuccess);
  };

  const handleDecline = () => {
    const url = `requests/accept-or-reject/${request.uiid}?accept=false`;
    const body = { to_user: request.to_user.user.id };
    const method = 'post';
    const loadingState = setIsLoading;
    const onSuccess = (data) => {
      setRequestStatus('declined');
      setMessage('Declined');
      setShowMessage(true);
    };

    apiCall(url, body, method, loadingState, onSuccess);
  };

  return (
    <div className="flex flex-col items-center p-3 rounded-md mb-3 bg-white">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center">
          <img 
            src={request.from_user.profile_pic} 
            alt={request.from_user.name} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold text-main">{request.from_user.name}</h2>
            <p className="text-sm text-gray-500 truncate">sent you a friend request</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {
            showMessage ? 
            <p 
              className={`mt-2 text-sm message font-bold ${message === 'Accepted' ? 'text-pink-600' : 'text-gray-500'}`}
            >
              {message}
            </p>
            :
            <>
              <div className="flex space-x-3 py-2">
                <button 
                  onClick={handleAccept} 
                  disabled={isLoading}
                  className="bg-main text-white px-3 py-1 rounded-md hover:bg-pink-700 transition duration-200"
                >
                  Accept
                </button>
                <button 
                  onClick={handleDecline} 
                  disabled={isLoading}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300 transition duration-200"
                >
                  Decline
                </button>
              </div>
              <p className="text-xs text-gray-500">{request.created_at}</p>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
