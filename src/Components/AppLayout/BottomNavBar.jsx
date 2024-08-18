import React from 'react';
import { FaUserCircle, FaEnvelope, FaUsers, FaSearch } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { getData } from '../../Functions/LocalStorage';

const BottomNavBar = () => {
  // Define an array of navigation items
  
  const location = useLocation();
  const user = getData('user')
  const name = user?.username
  const profile_logo = user?.profile_pic || 'https://tse4.mm.bing.net/th?id=OIP.SWjOyXq5-r0qKj7QFI44RQAAAA&pid=Api&P=0&h=180'
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
      icon: <img src={profile_logo} className={location.pathname.includes('/profile') ? 'text-gray-400 w-5 h-5 object-cover rounded-full border-pink-600 border-2' : 'text-gray-400 w-5 h-5 object-cover rounded-full'}/>,
      title: '@'+name,
    },
  ];
  const activeStyle = 'text-main font-bold'


  return (
    <div className="btm-nav bg-gray-100">
      <button className={`${location.pathname === '/' ? activeStyle : ''}`}>
        <NavLink to={'/'}>
          <center>
            {<FaSearch className={location.pathname === '/' ? 'text-pink-600' : 'text-gray-400'}/>}
            <span className="btm-nav-label font-mono">{'Explore'}</span>
          </center>
        </NavLink>
      </button>
      {navItems.map((item, index) => (
        <button key={index} className={location.pathname.includes(item.path) ? activeStyle : ''}>
          <NavLink to={item.path}>
            <center>
              {item.icon}
              <span className="btm-nav-label font-mono truncate">{item.title}</span>
            </center>
          </NavLink>
        </button>
      ))}
    </div>
  );
};

export default BottomNavBar;
