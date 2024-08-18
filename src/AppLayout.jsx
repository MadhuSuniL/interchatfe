import React, { useEffect } from 'react';
import Header from './Components/AppLayout/Header';
import BottomNavBar from './Components/AppLayout/BottomNavBar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppLayout = () => {
  return (
    <div className='max-w-[1200px] px-2 h-screen mx-auto flex flex-col'>
      <div className='flex-0 bg-white shadow rounded-md'>
        <Header />
      </div>
      <div className='flex-1 overflow-auto p-1 pb-20'>
        <Outlet />
      </div>
      <div className='flex-0 md:hidden'>
        <BottomNavBar />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppLayout;
