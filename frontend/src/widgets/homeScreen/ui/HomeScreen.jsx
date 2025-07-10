import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { SelectUser } from '@features/user/selectUser';
import { useUserStore } from '@entities/user';
import { userService } from '@shared/model/socket';
import { selectSetAppState, useAppStore } from '@shared/model/store';
import { APP_STATE } from '@shared/constants';
import { selectUserSliceData } from '../model/selectors';
import './style.css';

export const HomeScreen = () => {
  const setAppState = useAppStore(selectSetAppState);
  const { availableUsers, setAvailableUsers, setUser } = useUserStore(
    useShallow(selectUserSliceData),
  );

  const userChangeHandler = (user) => {
    userService.joinUser(user, ({ isSuccess }) => {
      if (isSuccess) {
        setUser(user);
        setAppState(APP_STATE.room);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = userService.subscribeUsersUpdate(setAvailableUsers);

    return () => {
      unsubscribe();
    };
  }, [setAvailableUsers]);

  return (
    <div className="homeScreen">
      <SelectUser availableUsers={availableUsers} onUserChange={userChangeHandler} />
    </div>
  );
};
