import { useEffect } from 'react';
import { SelectUser } from '@features/user/selectUser';
import {
  selectAvailableUsers,
  selectGetAvailableUsers,
  selectSetAvailableUsers,
  useUserStore,
} from '@entities/user';
import { userService } from '@shared/model/socket';
import './style.css';

export const HomeScreen = () => {
  const getAvailableUsers = useUserStore(selectGetAvailableUsers);
  const availableUsers = useUserStore(selectAvailableUsers);
  const setAvailableUsers = useUserStore(selectSetAvailableUsers);

  useEffect(() => {
    getAvailableUsers();
    const unsubscribe = userService.subscribeUsersUpdate(setAvailableUsers);

    return () => {
      unsubscribe();
    };
  }, [getAvailableUsers, setAvailableUsers]);

  return (
    <div className="homeScreen">
      <SelectUser availableUsers={availableUsers} />
    </div>
  );
};
