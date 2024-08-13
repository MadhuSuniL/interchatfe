import React, { useState } from 'react';
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
    let url = `/users/search/?query=${searchText}`
    let body = {}
    let method = 'get'
    let loadingState = setIsLoading
    const onSuccess = (data) => {
      console.log(data);
    }
    apiCall(url, body, method, loadingState, onSuccess)
  };

  return (
    <div>
      {/* <Header /> */}
      <HeroBanner
        setSearchText={handleSearchTextChange}
        searchText={searchText}
        onSearch={handleSearch}
      />
      {/* Display fetched users */}
      {
        searchText &&
        <SearchResults resutls={fetchedUsers}/>
      }
      <div className='grid md:grid-cols-2 gap-2'>
        <SimilartBioUsers/>
        <MightKnowUsers/>
      </div>
    </div>
  );
};

export default Home;
