/**
 * @file Главная страница с выбором пользователя.
 */

import React, { useEffect } from 'react';
import { UserSelect } from '@features/user-select/UserSelect';
import { RoomList } from '@features/roomList/RoomList';
import { Chat } from '@features/chat/Chat';
import { roomStore, userStore } from '@shared/model/store';
import { socket, userService } from '@shared/model/socket';
import { userActions } from '@entities/user';
import './style.css';

/**
 * MainPage — главная страница приложения
 * @returns {JSX.Element}
 */
export function MainPage() {
  const user = userStore.useUserStore(userStore.selectUser);
  const setAvailableUsers = userStore.useUserStore(userStore.selectSetAvailableUsers);
  const room = roomStore.useRoomStore(roomStore.selectRoom);

  useEffect(() => {
    socket.connect();
    userActions.fetchAvailableUsers().then(setAvailableUsers);
    const unsub = userService.subscribeUsersUpdate(setAvailableUsers);

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
