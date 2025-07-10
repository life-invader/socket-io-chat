/**
 * @file Основной компонент приложения.
 */

import { MainPage } from '@pages/main/MainPage';
import { useSocketConnect } from '@shared/model/socket/hooks';
import { ConnectionStatus } from '@shared/ui/connectionStatus';
import './style/index.css';

/**
 * App — основной компонент приложения
 * @returns {JSX.Element}
 */
const App = () => {
  const isOnline = useSocketConnect();

  return (
    <>
      <MainPage />
      <ConnectionStatus isOnline={isOnline} />
    </>
  );
};

export default App;
