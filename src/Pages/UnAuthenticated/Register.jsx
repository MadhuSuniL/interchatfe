import React, { useState } from 'react';
import Logo from '../../Components/Logo';
import apiCall from '../../Functions/Axios';
import { storeData } from '../../Functions/LocalStorage';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confPassword: '',
    profile_pic: null,
    name: '',
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // To handle the error message

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setError(''); // Clear error message on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.confPassword) {
      setError('Passwords do not match!');
      return; // Prevent form submission
    }

    let url = '/users/register/';
    let body = new FormData();
    Object.keys(formData).forEach((key) => {
      body.append(key, formData[key]);
    });
    let method = 'post';
    let loadingState = setIsLoading;
    const onSuccess = (data) => {
      console.log(data);
      window.location.href = '/login';
    };
    apiCall(url, body, method, loadingState, onSuccess);
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen bg-white">
      <div className="flex items-center justify-center p-8 rounded-lg order-2 md:order-1">
        <div className="w-full shadow-lg shadow-gray-300 rounded-xl p-4">
          <h1 className="text-xl text-center py-2 font-bold text-main">Register</h1>
          <p className="text-center text-gray-600 mb-4">Create your account to get started.</p>
          <form onSubmit={handleSubmit}>
            <div className='grid lg:grid-cols-2 gap-3 items-baseline'>
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username or Phone
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="w-full px-3 py-2 bg-transparent border border-pink-600 rounded-lg outline-none focus:ring-pink-600 focus:ring-2 focus:border-pink-600"
                    placeholder="Enter your username or phone"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`w-full px-3 py-2 bg-transparent border rounded-lg outline-none focus:ring-pink-600 focus:ring-2 focus:border-pink-600 ${error ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : 'border-pink-600'}`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confPassword">
                    Confirm Password
                  </label>
                  <input
                    id="confPassword"
                    name="confPassword"
                    type="password"
                    className={`w-full px-3 py-2 bg-transparent border rounded-lg outline-none focus:ring-pink-600 focus:ring-2 focus:border-pink-600 ${error ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : 'border-pink-600'}`}
                    placeholder="Confirm your password"
                    value={formData.confPassword}
                    onChange={handleChange}
                  />
                  {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_pic">
                    Profile Picture
                  </label>
                  <input
                    id="profile_pic"
                    name="profile_pic"
                    type="file"
                    className="w-full px-3 py-2 bg-transparent border border-pink-600 rounded-lg outline-none focus:ring-pink-600 focus:ring-2 focus:border-pink-600"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full px-3 py-2 bg-transparent border border-pink-600 rounded-lg outline-none focus:ring-pink-600 focus:ring-2 focus:border-pink-600"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    className="w-full px-3 py-2 bg-transparent border border-pink-600 rounded-lg outline-none focus:ring-pink-600 focus:ring-2 focus:border-pink-600"
                    placeholder="Tell us about yourself"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              {
                isLoading ?
                <button
                  type="submit"
                  className="bg-main text-white font-bold py-2 px-4 rounded-lg hover:bg-main-dark focus:outline-none focus:ring flex items-center"
                >
                  <GiGraspingClaws className='mr-2 animate-spin'/> Registering in ...
                </button>
                :
                <button
                  type="submit"
                  className="bg-main text-white font-bold py-2 px-4 rounded-lg hover:bg-main-dark focus:outline-none focus:ring"
                >
                  Register
                </button>
              }
            </div>
          </form>
          <span className='text-sm float-right'>Already have an account <a href='/login' className='text-main font-bold mx-1 underline underline-offset-2'>Login</a> Now</span>
        </div>
      </div>
      <div className="flex items-center justify-center order-1 md:order-2">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo size={'text-5xl'} /> {/* Display the Logo component */}
          </div>
          <p className="text-gray-600 mt-4">Join us today and start your journey.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
