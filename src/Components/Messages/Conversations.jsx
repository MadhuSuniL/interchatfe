import React, { useState, useEffect } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import FakeUserStatus from './FakeUserStatus';

const Conversations = ({
  chats,
  setChats,
  currentChat,
  setCurrentChat
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter chats based on the search query
  const filteredChats = chats.filter(chat =>
    chat.friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='h-full flex flex-col '>
      <div className='mb-3'>
        <div className='my-1 mt-3 flex justify-between items-center px-2'>
          <h1 className='text-main font-bold flex items-center'><FaUserFriends className='mr-2 text-lg'/> Friends ({filteredChats.length})</h1> 
        </div>
        <div className='px-1'>
          <input 
            type='search' 
            className='my-2 p-2 input-bordered bg-transparent border border-pink-600 rounded-lg outline-none focus:ring-pink-600 focus:ring-2 focus:border-pink-600 w-full'
            placeholder='Search Chats ..'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Conversations  */}
      <div className='overflow-auto flex-auto'>
        {
          filteredChats.map(chat =>
            <ConversationBox 
              key={chat.uiid} 
              chat={chat} 
              currentChat={currentChat} 
              onClick={() => setCurrentChat(prev => ({
                ...chat,
                status : true
              }))}
            />
          )
        }
      </div>
    </div>
  );
}

export default Conversations;

const ConversationBox = ({ chat, currentChat, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`cp group flex justify-between items-center my-1 rounded-lg p-1 hover:bg-opacity-40 ${currentChat?.uiid === chat?.uiid ? 'bg-main text-white hover:text-main' : 'text-main hover:bg-pink-200'}`}
    >
      <div className="flex items-center p-1">
        <img 
          className='w-10 h-10 object-cover rounded-full mr-2' 
          src={chat.friend.profile_pic} 
          alt={chat.friend.name}
        />
        <div>
          <div className='font-semibold text-sm'>{chat.friend.name}</div>
          <FakeUserStatus online = {chat.status}/>
          {/* Uncomment if you want to show the last message */}
          {/* <div className="text-[10px] text-gray-700 truncate">
            {chat?.last_message?.is_self_message ? 'you' : chat?.last_message?.user_name} :&nbsp;
            {chat?.last_message?.message}
          </div> */}
        </div>
      </div>
      
    </div>
  );
}
