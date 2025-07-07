/**
 * @file Главная страница с выбором пользователя.
 */

import { HomeScreen } from '@widgets/homeScreen';
import { RoomList } from '@features/roomList/RoomList';
import { Chat } from '@features/chat/Chat';
import { appStore } from '@shared/model/store';
import './style.css';

/**
 * MainPage — главная страница приложения
 * @returns {JSX.Element}
 */
export const MainPage = () => {
  const appState = appStore.useAppStore(appStore.selectAppState);

  const components = {
    home: HomeScreen,
    room: RoomList,
    chat: Chat,
  };

  const CurrentScreen = components[appState];

  return (
    <>
      <CurrentScreen />
    </>
  );
};
