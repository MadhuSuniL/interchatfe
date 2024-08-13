import React, { useEffect, useState} from 'react'
import apiCall from '../../Functions/Axios';

const MightKnowUsers = () => {
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)


    const fetchUsers = () => {
        let url = `/users/search/?query=${searchText}`
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
        // fetchUsers()
    },[])


  return (
    <div className="shadow-sm shadow-gray-400 bg-gray-50 p-5 rounded-md mt-3">
        <h2 className="text-xl font-bold text-main">You Might Know People</h2>
        
    </div>
  )
}

export default MightKnowUsers