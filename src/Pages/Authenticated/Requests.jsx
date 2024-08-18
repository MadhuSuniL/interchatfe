import React, { useState, useEffect } from 'react';
import Header from '../../Components/Requests/Header';
import RequestCard from '../../Components/Requests/RequestCard';
import apiCall from '../../Functions/Axios';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = () => {
      const url = 'requests/friend-requests/?self=true';
      const method = 'get';
      const onSuccess = (data) => {
        setRequests(data);
      };
      apiCall(url, null, method, setIsLoading, onSuccess)
    };
    fetchRequests();
  }, []);

  const skeleton = (
    <div className="w-full grid grid-cols-8 md:grid-cols-10 items-center rounded-md animate-pulse gap-4 my-5">
      <div className="w-12 h-12 bg-gray-300 rounded-full col-span-1"></div>
      <div className="col-span md:col-span-5 pl-3">
        <div className="h-5 bg-gray-300 rounded-md mb-2 w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded-md"></div>
      </div>
      <div className='col-span-2 bg-gray-300 w-20 md:w-24 h-6 md:h-8 rounded-badge'></div>
      <div className='col-span-2 bg-gray-300 w-20 md:w-24 h-6 md:h-8 rounded-badge'></div>
    </div>
  );

  return (
    <div>
      {/* <Header /> */}
      {
          isLoading ? (
          <div className='max-w-[700px] mx-auto shadow-sm shadow-gray-400 bg-gray-50 md:p-6 rounded-md mt-3'>
            {
              Array(10).fill(0).map((_, index) => (
                <div key={index}>{skeleton}</div>
              ))
            }
          </div>
          ) :
          requests.length ?
          <div className='max-w-[700px] mx-auto shadow-sm shadow-gray-400 bg-gray-50 md:p-6 rounded-md mt-3'>
            <div className='flex justify-end'>
              <span className='text-right text-xs p-2'>Total {requests.length} requests received</span>
            </div>
            {
              requests.map(request => (
                <RequestCard key={request.uiid} request={request} />
              ))
            }
          </div>
          :
          <div className='text-center py-10'>
            <p className='text-gray-500'>No requests found</p>
          </div>
      }
    </div>
  );
}

export default Requests;
