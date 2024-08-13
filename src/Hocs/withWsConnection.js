import React, { useEffect, useState } from 'react';
import { getData } from '../Functions/LocalStorage';



const withWsConnection = (WrappedComponent, endPoint) => {
  return () => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [accessToken] = useState(getData('accessToken'));
    const url = process.env.REACT_APP_WS_URL + endPoint + '?token=' + (accessToken)

    useEffect(() => {
      const newSocket = new WebSocket(url)
      
      newSocket.onopen = () => {
        setSocket(prev => newSocket);
        setIsConnected(true);
        // console.log('Connected');
      };

      
      newSocket.onclose = function(event) {
        // console.log('Connection closed with code: ' + event.code);
      };

      return () => {
        if (socket) {
          socket.close();
        }
      };
    },[accessToken])

    return <WrappedComponent socket={socket} isConnected={isConnected} />;
  };
};

// Usage
export default withWsConnection