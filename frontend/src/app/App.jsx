/**
 * @file Основной компонент приложения.
 */

import { MainPage } from '@pages/main/MainPage';
import './style/index.css';
import { useSocketConnect } from '@shared/model/socket/hooks';

/**
 * App — основной компонент приложения
 * @returns {JSX.Element}
 */
const App = () => {
  useSocketConnect();
  return <MainPage />;
};

export default App;
