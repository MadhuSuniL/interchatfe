import React, { useEffect } from 'react';
import Header from './Components/AppLayout/Header';
import BottomNavBar from './Components/AppLayout/BottomNavBar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  
  return (
    <div className='max-w-[1200px] px-2 h-screen mx-auto flex flex-col'>
      <div className='flex-0 bg-white shadow rounded'>
        <Header />
      </div>
      <div className='flex-1 overflow-hidden '>
        <Outlet />
      </div>
      <div className='flex-0 lg:hidden'>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default AppLayout
