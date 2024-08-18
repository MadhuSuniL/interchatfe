import React from 'react';
import UserCard from './UserCard';

const SearchResults = ({
  isLoading,
  fetchedUsers
}) => {

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

  return (
    <div className="shadow-sm shadow-gray-400 bg-gray-50 p-5 rounded-md mt-3">
      <h2 className="text-xl font-bold text-main">Search Results</h2>
      <ul className='mt-5'>
        {
          isLoading ? (
            // Render loading skeletons when data is being fetched
            Array(10).fill(0).map((_, index) => (
              <li key={index}>{skeleton}</li>
            ))
          ) : (
            fetchedUsers.length > 0 ? (
              // Render user cards when data is loaded
              fetchedUsers.map(user => 
                <UserCard key={user.id} user={user} />
              )
            ) : (
              // Display message if no users are found
              <li className="text-center text-gray-500">No users found.</li>
            )
          )
        }
      </ul>
    </div>
  );
};

export default SearchResults;
