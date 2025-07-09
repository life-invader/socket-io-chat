import { ChatScreen } from '@widgets/chatScreen';
import { HomeScreen } from '@widgets/homeScreen';
import { RoomScreen } from '@widgets/roomScreen';
import { selectAppState, useAppStore } from '@shared/model/store';
import { APP_STATE } from '@shared/constants';

export const AppScreen = () => {
  const appState = useAppStore(selectAppState);

  const components = {
    [APP_STATE.home]: HomeScreen,
    [APP_STATE.room]: RoomScreen,
    [APP_STATE.chat]: ChatScreen,
  };

  const CurrentScreen = components[appState];

  return <CurrentScreen />;
};
