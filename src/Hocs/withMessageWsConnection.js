import React, { useEffect, useState } from 'react';
import { getData } from '../Functions/LocalStorage';



const withMessageWsConnection = (WrappedComponent, currentChat) => {
  
  return () => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [accessToken] = useState(getData('accessToken'));

    const endPoint = `messages/${currentChat?.uiid}`
    const url = process.env.REACT_APP_WS_URL + endPoint + '?token=' + (accessToken)
    
    useEffect(() => {
      if (currentChat){
        if (socket) {
          socket.close();
        }
        const newSocket = new WebSocket(url)
        newSocket.onopen = () => {
          setSocket(prev => newSocket);
          setIsConnected(true);
          // console.log('Connected to message');
        };
        newSocket.onclose = function(event) {
          // console.log('Message Connection closed with code: ' + event.code);
        };
      
      }
      return () => {
        if (socket) {
          socket.close();
          setSocket(prev => null)
        }
      };
    },[accessToken, currentChat?.uiid])

    return <WrappedComponent socket={socket} isConnected={isConnected} />;
  };
};

// Usage
export default withMessageWsConnection