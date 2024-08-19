import React, { useEffect, useRef, useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineReplyAll, MdEdit , MdDelete  } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import FakeUserStatus from './FakeUserStatus';

const ChatWindow = ({socket, isConnected, currentChat, setCurrentChat}) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null); 
  const typingBoxRef = useRef(null); 

  const categorizeMessage = (data, currentChat) => {
    if (Array.isArray(data)) {
      return data.map((message) => {  
        message.is_self_message = message.user !== currentChat?.friend.user.id;
        return message;
      });
    } else {
      const message = data;  
      message.is_self_message = message.user !== currentChat?.friend.user.id;
      return message;
    }
  };
  

  const sendMessage = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      event_type : 'create',
      event_data : {message}
    });
    socket.send(data)
    setMessage('')
  }

  useEffect(() => {                  
    if (socket && isConnected) {
      socket.onmessage = (event) => {
          let data = JSON.parse(event.data);
          if (Array.isArray(data)){
            setMessages(categorizeMessage(data, currentChat))
          }
          else{
            let message = {...data}
            message = categorizeMessage(message)
            setMessages(messages => [...messages, categorizeMessage(message, currentChat)])
          }
      };
    }

    return () => socket?.close()
  }, [socket, isConnected]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat, messages]);

  const handlereSetCurrentChat = () => {
    setCurrentChat(null)
    if(socket){
      socket.close()
    }
  }

  return (
    <>
        <div className='flex flex-col h-full text-sm'>
          {/* Header */}
          <div className='flex-0 flex justify-between items-center p-2 px-3 md:px-5 bg-main rounded-lg'>
            <div className='flex items-center'>
              <IoArrowBack onClick={handlereSetCurrentChat} className='mr-2 md:hidden text-white' size={25}/>
              <img 
                  className='w-8 h-8 object-cover rounded-full mr-2' 
                  src={currentChat.friend.profile_pic} 
                  alt={currentChat.friend.name}
              />
              <div className='flex items-center'>
                  <div className="text-white font-semibold text-md">
                    <div>{currentChat?.friend.name}</div>
                    <FakeUserStatus online={currentChat.status}/>
                  </div>
              </div>
            </div>
            <ProfileMenu/>
          </div>
          {/* <div className='divider m-0'/> */}
          <div className='overflow-auto flex-1 px-2 pb-2 py-3'>
            {
              messages.map(message =>
                <ChatMessageBox 
                  key={message.uiid} 
                  message = {message} 
                />
              )
            }
            <div ref={messagesEndRef} /> 
          </div>
          <div className='flex-0 pb-16 md:p-0'>
            <form onSubmit={sendMessage} className='flex items-center rounded-lg p-2 pt-0 gap-2'>
                <input id = 'send_message' ref={typingBoxRef} value={message} onChange={(e)=>setMessage(prev => e.target.value)} className='flex-1 p-3 bg-transparent border border-pink-600 rounded-lg outline-none focus:ring-pink-600 focus:ring-2 focus:border-pink-600' placeholder='Type a message'/>
                {
                  message &&
                  <button type='submit'>
                    <IoMdSend className='mx-3 text-main cp' size={25}/>
                  </button>
                }
            </form>
          </div>
        </div>
    </>
  )
}

export default ChatWindow

const ChatMessageBox = ({
  message, 
 }) => {

  
  
  return (
      <div className={`chat ${!message.is_self_message ? 'chat-start' : 'chat-end'}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="user" src={message?.profile_pic} />
            </div>
          </div>
          <div className={`chat-bubble ${!message.is_self_message ? 'bg-gray-200 text-gray-800' : 'bg-main text-white'}`}>{message.message}</div>
          <div className="chat-footer opacity-80 text-gray-700">
            <time className="text-xs opacity-80 mx-2 ">{message.created_at}</time>
          </div>
      </div>
  )
}


const ProfileMenu = () => {
  return (
    <CiMenuKebab className='cp text-white' size={20}/>
  )
}

const MessageMenu = ({
  children, 
  message, 
  setIsReplying, 
  setReplyRef, 
  setIsEditing,
  setEditRef,
  setMessage,
  deleteMessage
}) => {

  const handleReplyOn =() => {
    setReplyRef(message)
    setIsReplying(true)
    document.getElementById('send_message').focus()
  }

  const handleEditOn =() => {
    setEditRef(message)
    setIsEditing(true)
    setMessage(message?.message)
    document.getElementById('send_message').focus()
  }

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.message)
  }

  

  const content = <ul className="menu p-0 text-white rounded-box">
  <li>
    <span onClick={handleReplyOn} className='hover:text-main'>
      <MdOutlineReplyAll/>
      Reply
    </span>
  </li>
  <li>
    <span onClick={handleCopyMessage} className='hover:text-main'>
      <IoCopy/>
      Copy
    </span>
  </li>
  {
    message.is_self_message &&
    <li>
      <span onClick={handleEditOn} className='hover:text-main'>
        <MdEdit/>
        Edit
      </span>
    </li>
  }
  <li >
    <span onClick={()=> deleteMessage(message?.uiid)} className='hover:text-red-500'>
      <MdDelete/>
      Delete
    </span>
  </li>
</ul>

  return (
    <Popover
      content={content}
      trigger={'click'}
      color='#374151'
      placement='left'
    >
      {children}
    </Popover>
  )
}
