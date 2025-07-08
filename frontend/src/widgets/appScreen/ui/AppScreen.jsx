import { appStore } from '@shared/model/store';
import { ChatScreen } from '@widgets/chatScreen';
import { HomeScreen } from '@widgets/homeScreen';
import { RoomScreen } from '@widgets/roomScreen';

export const AppScreen = () => {
  const appState = appStore.useAppStore(appStore.selectAppState);

  const components = {
    home: HomeScreen,
    room: RoomScreen,
    chat: ChatScreen,
  };

  const CurrentScreen = components[appState];

  return <CurrentScreen />;
};
