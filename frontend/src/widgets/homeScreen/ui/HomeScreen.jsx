import { useEffect } from 'react';
import { SelectUser } from '@features/user/selectUser';
import { userActions } from '@entities/user';
import { userStore } from '@shared/model/store';
import { userService } from '@shared/model/socket';
import './style.css';

export const HomeScreen = () => {
  const availableUsers = userStore.useUserStore(userStore.selectAvailableUsers);
  const setAvailableUsers = userStore.useUserStore(userStore.selectSetAvailableUsers);

  useEffect(() => {
    userActions.fetchAvailableUsers().then(setAvailableUsers);
    const unsubscribe = userService.subscribeUsersUpdate(setAvailableUsers);

    return () => {
      unsubscribe();
    };
  }, [setAvailableUsers]);

  return (
    <div className="homeScreen">
      <SelectUser availableUsers={availableUsers} />
    </div>
  );
};
