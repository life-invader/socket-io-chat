/**
 * @file Фича выбора и создания комнаты. Список комнат и форма создания.
 */

import React, { useEffect, useState } from 'react';
import { useRoomStore } from '../../shared/store/roomSlice';
import { fetchRooms, subscribeRoomsUpdate, joinRoom } from '../../shared/services/roomService';
import './roomList.css';

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
  const rooms = useRoomStore((s) => s.rooms);
  const setRooms = useRoomStore((s) => s.setRooms);
  const setRoom = useRoomStore((s) => s.setRoom);

  const [newRoom, setNewRoom] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRooms().then(setRooms);
    const unsub = subscribeRoomsUpdate(setRooms);

    return () => {
      unsub();
    };
  }, [setRooms]);

  /**
   * Обработка выбора комнаты
   * @param {string} roomName
   */
  function handleSelect(roomName) {
    joinRoom(roomName);
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
    joinRoom(newRoom);
    setNewRoom('');
    setError('');
    setRoom(newRoom);
  }

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
