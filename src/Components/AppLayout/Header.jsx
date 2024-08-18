import React from 'react';
import Logo from '../Logo';
import { FaUserCircle, FaUsers, FaEnvelope, FaHome, FaSearch } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { getData } from '../../Functions/LocalStorage';
import Notifications from '../Notifications/Notifications';

const Header = () => {
  const location = useLocation();
  const user = getData('user')
  const name = user?.username
  const profile_logo = user?.profile_pic || 'https://tse4.mm.bing.net/th?id=OIP.SWjOyXq5-r0qKj7QFI44RQAAAA&pid=Api&P=0&h=180'
  const activeStyle = 'text-main font-bold decoration-4 underline-offset-8 flex flex-col justify-center items-center'
  const unActiveStyle = 'hover:scale-105 duration-200 decoration-4 underline-offset-8 flex flex-col justify-center items-center'
  const navItems = [
    {
      path: '/chats',
      icon: <FaEnvelope className={location.pathname.includes('/chats') ? 'text-pink-600' : 'text-gray-400'}/>,
      title: 'Messages',
    },
    {
      path: '/requests',
      icon: <FaUsers className={location.pathname.includes('/requests') ? 'text-pink-600' : 'text-gray-400'}/>,
      title: 'Requests',
    },
    {
      path: '/profile',
      icon: <img src={profile_logo} className={location.pathname.includes('/profile') ? 'text-pink-600 w-10' : 'text-gray-400 w-5 h-5 object-cover rounded-full'}/>,
      title: '@'+name,
    },
  ];

  return (
    <div className='h-14 md:h-20 flex justify-between items-center px-2 mt-1'>
      <div className='flex justify-evenly items-center'>
        <Logo/>
      </div>
      <div className="md:flex hidden items-baseline">
        <NavLink to={'/'}>
          <button className={`mx-5 ${unActiveStyle} ${location.pathname === '/' ? activeStyle : ''} `}>
            <center>
              {<FaSearch className={location.pathname === '/' ? 'text-pink-600' : 'text-gray-400'}/>}
                <span className="ml-1 font-mono">{'Explore'}</span>
            </center>
          </button>
        </NavLink>
        {navItems.map((item, index) => (
          item.path ?
          <button key={index} className={`mx-4 ${unActiveStyle} ${location.pathname.includes(item.path) ? activeStyle : ''} `}>
            <center>
              <NavLink to={item.path}>
                {item.icon}
                <span className="ml-1 font-mono truncate">{item.title}</span>
              </NavLink>
            </center>
          </button>
          :
          <span key={index}>
            {item.source}
          </span>
        ))}
      </div>
      <div className='flex items-center md:hidden'>
        <Notifications mobile = {true}/>
        <button className={`mx-2 flex items-center md:hidden ${unActiveStyle} ${location.pathname.includes('/profile') ? activeStyle : ''} `}>
          <center>
            <NavLink to={'/profile'}>
              <img src={profile_logo} alt='User Logo' className={`h-9 cp ml-3 mt-5 rounded-full`} />
              <span className="ml-1">{''}</span>
            </NavLink>
          </center>
        </button>
      </div>

    </div>
  );
};

export default Header;
