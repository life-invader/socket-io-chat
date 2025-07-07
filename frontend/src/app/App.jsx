/**
 * @file Основной компонент приложения.
 */

import { useEffect } from 'react';
import { MainPage } from '@pages/main/MainPage';
import { socket } from '@shared/model/socket';
import './style/index.css';

/**
 * App — основной компонент приложения
 * @returns {JSX.Element}
 */
const App = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return <MainPage />;
};

export default App;
