import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaUserFriends } from 'react-icons/fa';
import apiCall from '../../Functions/Axios'; // Adjust the import path as necessary

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = () => {
      const url = 'users/profile/self';
      const method = 'get';
      const body = null; 
      
      const onSuccess = (data) => {
        setProfile(data);
        setLoading(false);
      };
      
      apiCall(url, body, method, setLoading, onSuccess);
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; // Redirect to /login after logout
  };

  return (
    <div className='flex items-center justify-center h-full bg-gray-100'>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <div className="flex flex-col items-center">
          {loading ? (
            <div className="flex flex-col items-center w-full">
              <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse mb-4"></div>
              <div className="w-1/2 h-6 bg-gray-300 animate-pulse mb-2"></div>
              <div className="w-full h-4 bg-gray-300 animate-pulse mb-4"></div>
              <div className="w-1/2 h-6 bg-gray-300 animate-pulse"></div>
            </div>
          ) : (
            <>
              <img 
                src={profile.profile_pic} 
                alt={`${profile.name}'s profile`} 
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200" 
              />
              <h2 className="text-2xl font-bold mt-2 text-main">{profile.name}</h2>
              <p className="text-gray-600 mt-2 text-center">{profile.bio}</p>
              <div className="flex items-center justify-center mt-4 text-lg">
                <FaUserFriends className="text-2xl text-main mr-2" />
                <p className="text-gray-500">Total Friends: {profile.total_friends}</p>
              </div>
            </>
          )}
        </div>
        
        <div className="flex flex-col items-center mt-6 space-y-4">
          <button 
            className="btn btn-outline w-full flex items-center justify-center py-3 text-lg font-semibold"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
