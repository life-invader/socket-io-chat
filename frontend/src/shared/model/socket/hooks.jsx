import { useEffect, useState } from 'react';
import { socket } from './index';

export const useSocketConnect = () => {
  const [isOnline, setIsOnline] = useState(false);

  const setActiveSocketStatus = () => {
    setIsOnline(true);
  };

  const setInactiveSocketStatus = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    socket.connect();
    socket.on('connect', setActiveSocketStatus);
    socket.on('disconnect', setInactiveSocketStatus);

    return () => {
      socket.disconnect();
      socket.off('connect', setActiveSocketStatus);
      socket.off('disconnect', setInactiveSocketStatus);
    };
  }, []);

  return isOnline;
};
