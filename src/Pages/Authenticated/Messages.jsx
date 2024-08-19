import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Conversations from '../../Components/Messages/Conversations';
import ChatWindow from '../../Components/Messages/ChatWindow';
import apiCall from '../../Functions/Axios';
import { getData } from '../../Functions/LocalStorage';
import { toast } from 'react-toastify';

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const accessToken = getData('accessToken');

  useEffect(() => {
    const fetchChats = () => {
      const url = 'chats/friends?self=true';
      const method = 'get';
      const body = null;

      const onSuccess = (data) => {
        setChats(data);
      };

      apiCall(url, body, method, setIsLoading, onSuccess);
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (currentChat) {
      const endPoint = `messages/${currentChat.uiid}`;
      const url = 'ws://localhost:8000/ws/' + endPoint + '?token=' + accessToken;

      // Cleanup existing socket connection if any
      if (socket) {
        socket.close();
      }

      // Establish new WebSocket connection
      const newSocket = new WebSocket(url);

      newSocket.onopen = () => {
        setSocket(newSocket);
        setIsConnected(true);
        console.log('Connected to message WebSocket');
      };

      newSocket.onclose = (event) => {
        setIsConnected(false);
        setSocket(null);
        console.log('Message WebSocket connection closed with code:', event.code);
      };

      newSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast.error('WebSocket error: ' + error.message);
      };

      // Cleanup on unmount or when dependencies change
      return () => {
        if (newSocket) {
          newSocket.close();
          setSocket(null);
          setIsConnected(false);
        }
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [currentChat]);

  const handleExploreFriends = () => {
    navigate('/');
  };

  const skeletonLoader = (
    <div className="animate-pulse flex flex-col space-y-3">
      {[1, 2, 3].map((_, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-300 rounded-md w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full grid grid-rows-1 md:grid-cols-10 md:gap-2 rounded-lg pt-1">
      {
        chats.length && !isLoading ?
        <>
          <div className={`${currentChat ? 'hidden' : ''} duration-200 md:inline md:col-span-3 overflow-y-auto rounded-md h-full px-1 bg-white shadow-sm shadow-black`}>
            {isLoading ? (
              skeletonLoader
            ) : (
            <Conversations chats={chats} setChats={setChats} currentChat={currentChat} setCurrentChat={setCurrentChat} />
            )}
          </div>
          {
            currentChat ?
            <div className={`${currentChat ? '' : 'hidden'} duration-200 md:inline md:col-span-7 h-full bg-white shadow-sm shadow-black rounded-lg`}>
                <ChatWindow currentChat={currentChat} setCurrentChat={setCurrentChat} socket={socket} isConnected={isConnected} />
            </div>
            :
            <div className="w-full md:col-span-7 flex justify-center items-center rounded-lg">
                <p className="text-lg text-gray-300 mt-2">
                  No active chat. Start a chat by selecting a friend from your list.
                </p>
            </div>
          } 
        </>
        :
        <div className="col-span-full flex flex-col items-center justify-center h-full">
          <p className="text-gray-500 mb-4">It looks like you don't have any friends yet.</p>
          <button
            onClick={handleExploreFriends}
            className="bg-main text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-200"
          >
            Explore Friends and Share Interests
          </button>
        </div>
      }
    </div>
  );
};

export default Messages;
