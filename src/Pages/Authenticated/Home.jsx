import React, { useEffect, useState } from 'react';
import Header from '../../Components/Home/Header';
import HeroBanner from '../../Components/Home/HeroBanner';
import apiCall from '../../Functions/Axios'; // Adjust the import according to your project structure
import SearchResults from '../../Components/Home/SearchResults';
import UserCard from '../../Components/Home/UserCard';
import SimilartBioUsers from '../../Components/Home/SimilartBioUsers';
import MightKnowUsers from '../../Components/Home/MightKnowUsers';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  // Handle input change in HeroBanner
  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  // Handle search button click in HeroBanner
  const handleSearch = () => {
    if (searchText.trim()) {
      fetchUsers(searchText);
    }
  };

  // Fetch users from the API
  const fetchUsers = () => {
    let url = `/users/search?query=${searchText}`
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
  }, [searchText])

  return (
    <div>
      {/* <Header /> */}
      <HeroBanner
        setSearchText={handleSearchTextChange}
        searchText={searchText}       
      />
      {/* Display fetched users */}
        <div className='max-w-[600px] mx-auto'>
        {
          searchText ?
            <SearchResults fetchedUsers={fetchedUsers} isLoading = {isLoading}/>
            :
            <MightKnowUsers/>
        }
        </div>
    </div>
  );
};

export default Home;
