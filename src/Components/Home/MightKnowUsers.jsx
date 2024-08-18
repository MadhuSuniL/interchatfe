import React, { useEffect, useState} from 'react'
import apiCall from '../../Functions/Axios';
import UserCard from './UserCard';

const MightKnowUsers = () => {
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const skeleton = (
      <div className="w-full grid grid-cols-8 md:grid-cols-10 items-center rounded-md my-3 animate-pulse gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full col-span-1"></div>
        <div className="col-span-5 md:col-span-7 pl-3">
          <div className="h-5 bg-gray-300 rounded-md mb-2 w-1/4"></div>
          <div className="h-3 bg-gray-300 rounded-md"></div>
        </div>
        <div className='col-span-2 bg-gray-300 w-20 md:w-24 h-6 md:h-8 rounded-badge'></div>
      </div>
    );


    const fetchUsers = () => {
        let url = `/users/similar-bio-search`
        let body = {}
        let method = 'get'
        let loadingState = setIsLoading
        const onSuccess = (data) => {
          setFetchedUsers(data)
        }
        apiCall(url, body, method, loadingState, onSuccess)
      };

    useEffect(()=>{
        fetchUsers()
    },[])


  return (
    <div className="shadow-sm shadow-gray-400 bg-gray-50 p-5 rounded-md mt-3">
        <h2 className="text-xl font-bold text-main">You Might Know People</h2>
        <ul className='mt-5'>
            {
              isLoading ? (
                // Render loading skeletons when data is being fetched
                Array(10).fill(0).map((_, index) => (
                  <li key={index}>{skeleton}</li>
                ))
              ) : (
                // Render user cards when data is loaded
                fetchedUsers.map((user, index) => 
                  <UserCard key={index} user={user} />
                )
              )
            }
        </ul>
    </div>
  )
}

export default MightKnowUsers