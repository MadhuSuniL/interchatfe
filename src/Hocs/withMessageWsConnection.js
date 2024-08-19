import React, { useEffect, useState } from 'react';
import { getData } from '../Functions/LocalStorage';

const withMessageWsConnection = (WrappedComponent) => {
  
  return (props) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [accessToken] = useState(getData('accessToken'));

    useEffect(() => {
      const endPoint = `messages/${props.currentChat?.uiid}`;
      const url = 'ws://localhost:8000/ws/' + endPoint + '?token=' + accessToken;

      if (props.currentChat) {
        // Cleanup the existing socket connection if any
        if (socket) {
          socket.close();
        }

        // Establish a new WebSocket connection
        const newSocket = new WebSocket(url);

        newSocket.onopen = () => {
          setSocket(newSocket);
          setIsConnected(true);
          console.log('Connected to message WebSocket');
        };

        newSocket.onclose = function(event) {
          setIsConnected(false);
          setSocket(null);
          console.log('Message WebSocket connection closed with code:', event.code);
        };

        newSocket.onerror = function(error) {
          console.error('WebSocket error:', error);
        };

      } else {
        // Close the WebSocket if no chat is selected
        if (socket) {
          socket.close();
          setSocket(null);
        }
      }

      // Cleanup on unmount or when dependencies change
      return () => {
        if (socket) {
          socket.close();
          setSocket(null);
          setIsConnected(false);
        }
      };
    }, [accessToken, props.currentChat, socket]);

    return <WrappedComponent socket={socket} isConnected={isConnected} {...props} />;
  };
};

export default withMessageWsConnection;
