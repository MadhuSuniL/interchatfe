import React, { useEffect, useState } from 'react'
import apiCall from '../../Functions/Axios';
import UserCard from './UserCard';

const SimilartBioUsers = () => {

    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)


    const fetchUsers = () => {
        let url = `/users/similar-bio-search`
        let body = {}
        let method = 'get'
        let loadingState = setIsLoading
        const onSuccess = (data) => {
          console.log(data);
          setFetchedUsers(data)
        }
        apiCall(url, body, method, loadingState, onSuccess)
      };

    useEffect(()=>{
        fetchUsers()
    },[])

  return (
    <div className="shadow-sm shadow-gray-400 bg-gray-50 p-5 rounded-md mt-3">
        <h2 className="text-xl font-bold text-main">Similar Bio People</h2>
        <ul>
            {
                fetchedUsers.map(user => 
                    <UserCard user={user} />
                )
            }
        </ul>
    </div>
  )
}

export default SimilartBioUsers