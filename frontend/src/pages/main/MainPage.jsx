/**
 * @file Главная страница с выбором пользователя.
 */

import React, { useEffect } from 'react';
import { UserSelect } from '../../features/user-select/UserSelect';
import { RoomList } from '../../features/roomList/RoomList';
import { Chat } from '../../features/chat/Chat';
import { useUserStore } from '../../shared/store/userSlice';
import { useRoomStore } from '../../shared/store/roomSlice';
import { fetchAvailableUsers, subscribeUsersUpdate } from '../../shared/services/userService';
import { socket } from '../../shared/api/socket';

/**
 * MainPage — главная страница приложения
 * @returns {JSX.Element}
 */
export function MainPage() {
  const user = useUserStore((s) => s.user);
  const setAvailableUsers = useUserStore((s) => s.setAvailableUsers);
  const room = useRoomStore((s) => s.room);

  useEffect(() => {
    socket.connect();
    fetchAvailableUsers().then(setAvailableUsers);
    const unsub = subscribeUsersUpdate(setAvailableUsers);

    return () => {
      socket.disconnect();
      unsub();
    };
  }, [setAvailableUsers]);

  return (
    <div>
      {!user && <UserSelect />}
      {user && !room && <RoomList user={user} />}
      {user && room && <Chat user={user} room={room} />}
    </div>
  );
}
