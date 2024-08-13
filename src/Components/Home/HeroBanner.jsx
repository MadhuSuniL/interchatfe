import React from 'react';
import Logo from '../Logo';

const HeroBanner = ({ setSearchText, searchText, onSearch }) => {
  // Handle input change
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(); // Call the onSearch function passed as a prop
    }
  };

  return (
    <div className="max-w-[700px] mx-auto p-3">
      <Logo size={'text-5xl text-center'} />
      
      <div className="mt-6 flex flex-col items-center">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          className="w-full px-5 text-xl py-5 border border-gray-300 rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-pink-600"
          placeholder="Search..."
        />
        <button
          onClick={handleSearchClick}
          className="mt-4 bg-main text-white font-bold py-2 px-4 rounded-lg hover:bg-main-dark focus:outline-none focus:ring"
        >
          Explore People
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
