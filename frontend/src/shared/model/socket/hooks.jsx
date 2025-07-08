import { useEffect } from 'react';
import { socket } from './index';

export const useSocketConnect = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
};
