import React from 'react';
import { FaUserCircle, FaEnvelope, FaUsers, FaHome } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  // Define an array of navigation items
  
  const location = useLocation();
  const navItems = [
    {
      path: '/chats',
      icon: <FaEnvelope className={location.pathname.includes('/chats') ? 'text-pink-600' : 'text-gray-400'}/>,
      title: 'Chats',
    },
    {
      path: '/requests',
      icon: <FaUsers className={location.pathname.includes('/requests') ? 'text-pink-600' : 'text-gray-400'}/>,
      title: 'Requests',
    },
    {
      path: '/profile',
      icon: <FaUserCircle className={location.pathname.includes('/profile') ? 'text-pink-600' : 'text-gray-400'}/>,
      title: 'Profile',
    },
  ];
  const activeStyle = 'text-main font-bold'


  return (
    <div className="btm-nav bg-transparent">
      <button className={`${location.pathname === '/' ? activeStyle : ''}`}>
        <NavLink to={'/'}>
          <center>
            {<FaHome className={location.pathname === '/' ? 'text-pink-600' : 'text-gray-400'}/>}
            <span className="btm-nav-label font-mono">{'Home'}</span>
          </center>
        </NavLink>
      </button>
      {navItems.map((item, index) => (
        <button key={index} className={location.pathname.includes(item.path) ? activeStyle : ''}>
          <NavLink to={item.path}>
            <center>
              {item.icon}
              <span className="btm-nav-label font-mono">{item.title}</span>
            </center>
          </NavLink>
        </button>
      ))}
    </div>
  );
};

export default BottomNavBar;
