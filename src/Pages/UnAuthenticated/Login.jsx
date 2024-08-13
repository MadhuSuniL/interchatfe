import React, { useState } from 'react';
import Logo from '../../Components/Logo';
import apiCall from '../../Functions/Axios';
import { storeData } from '../../Functions/LocalStorage';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = '/users/login/'
    let body = formData
    let method = 'post'
    let loadingState = setIsLoading
    const onSuccess = (data) => {
      console.log(data);
      storeData('accessToken', data.access)
      storeData('refreshToken', data.refresh)
      delete data.access
      delete data.refresh
      storeData('user', data)
      window.location.href = '/'
    }
    apiCall(url, body, method, loadingState, onSuccess)
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen bg-white">
      <div className="flex items-center justify-center p-8 rounded-lg order-2 md:order-1">
        <div className="w-full max-w-md shadow-lg shadow-gray-300 rounded-xl p-4">
          <h1 className="text-xl text-center py-2 font-bold text-main">Login</h1>
          <p className="text-center text-gray-600 mb-4">Welcome back! Please log in to your account.</p>
          <form onSubmit={handleSubmit}>
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
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-3 py-2 bg-transparent border border-pink-600 rounded-lg outline-none focus:ring-pink-600 focus:ring-2 focus:border-pink-600"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-main text-white font-bold py-2 px-4 rounded-lg hover:bg-main-dark focus:outline-none focus:ring"
              >
                Login
              </button>
            </div>
            <span className='text-sm float-right'>Don't have an account <a href='/register' className='text-main font-bold mx-1 underline underline-offset-2'>Create</a> Now</span>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center order-1 md:order-2">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo size={'text-5xl'} /> {/* Display the Logo component */}
          </div>
          <p className="text-gray-600 mt-4">Experience the best with us. Please log in to continue.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
