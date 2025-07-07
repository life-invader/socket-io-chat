/**
 * @file Фича выбора и создания комнаты. Список комнат и форма создания.
 */

import React, { useEffect, useState } from 'react';
import { roomStore } from '@shared/model/store';
import { roomActions } from '@entities/room';
import { roomService } from '@shared/model/socket';
import './style.css';

/**
 * @typedef {Object} RoomListProps
 * @property {string} user - Имя текущего пользователя
 */

/**
 * Список комнат и форма создания
 * @param {RoomListProps} props
 * @returns {JSX.Element}
 */
export function RoomList({ user }) {
  const rooms = roomStore.useRoomStore(roomStore.selectRooms);
  const setRoom = roomStore.useRoomStore(roomStore.selectSetRoom);
  const setRooms = roomStore.useRoomStore(roomStore.selectSetRooms);

  const [newRoom, setNewRoom] = useState('');
  const [error, setError] = useState('');

  /**
   * Обработка выбора комнаты
   * @param {string} roomName
   */
  function handleSelect(roomName) {
    roomService.joinRoom(roomName);
    setRoom(roomName);
  }

  /**
   * Обработка создания новой комнаты
   * @param {React.FormEvent} e
   */
  function handleCreate(e) {
    e.preventDefault();
    if (!newRoom.trim()) return setError('Введите название комнаты');
    if (rooms[newRoom]) return setError('Комната уже существует');

    roomService.joinRoom(newRoom);
    setNewRoom('');
    setError('');
    setRoom(newRoom);
  }

  useEffect(() => {
    roomActions.fetchRooms().then(setRooms);
    const unsub = roomService.subscribeRoomsUpdate(setRooms);

    return () => {
      unsub();
    };
  }, [setRooms]);

  return (
    <div className="roomList">
      <form className="roomList__form" onSubmit={handleCreate}>
        <input
          className="roomList__input"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          placeholder="Новая комната"
        />

        <button className="roomList__createBtn" type="submit">
          Создать
        </button>
      </form>

      {error && <div className="roomList__error">{error}</div>}

      <ul className="roomList__list">
        {Object.entries(rooms).map(([room, users]) => (
          <li key={room} className="roomList__item">
            <button
              className="roomList__btn"
              onClick={() => handleSelect(room)}
              disabled={users.includes(user)}>
              {room} <span className="roomList__users">({users.length} чел.)</span>
            </button>

            <div className="roomList__usersList">
              {users.map((u) => (
                <span key={u} className="roomList__user">
                  {u}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
