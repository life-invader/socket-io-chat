/**
 * @file Главная страница с выбором пользователя.
 */

import React, { useEffect, useState } from 'react';
import { UserSelect } from '../../features/user-select/UserSelect';
import { RoomList } from '../../features/room-list';
import { Chat } from '../../features/chat';
import { socket } from '../../shared/api/socket';
import { usersList } from '../../entities/user';

/**
 * MainPage — главная страница приложения
 * @returns {JSX.Element}
 */
export function MainPage() {
  const [availableUsers, setAvailableUsers] = useState(usersList.map((u) => u.name));
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    socket.connect();

    fetch('http://localhost:4000/users')
      .then((res) => res.json())
      .then((data) => setAvailableUsers(data.users));

    socket.on('users:update', setAvailableUsers);

    return () => {
      socket.disconnect();
      socket.off('users:update', setAvailableUsers);
    };
  }, []);

  return (
    <div>
      {!user && <UserSelect onSelect={setUser} availableUsers={availableUsers} />}
      {user && !room && <RoomList user={user} onSelect={setRoom} />}
      {user && room && <Chat user={user} room={room} />}
    </div>
  );
}
