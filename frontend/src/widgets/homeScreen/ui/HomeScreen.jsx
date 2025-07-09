import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { SelectUser } from '@features/user/selectUser';
import { useUserStore } from '@entities/user';
import { userService } from '@shared/model/socket';
import { selectUserSliceData } from '../model/selectors';
import './style.css';

export const HomeScreen = () => {
  const { availableUsers, setAvailableUsers } = useUserStore(useShallow(selectUserSliceData));

  useEffect(() => {
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
