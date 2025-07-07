/**
 * @file Фича выбора и создания комнаты. Список комнат и форма создания.
 */

import React, { useEffect, useState } from 'react';
import { fetchRooms } from '../../entities/room';
import { socket } from '../../shared/api/socket';
import './roomList.css';

/**
 * @typedef {Object} RoomListProps
 * @property {string} user - Имя текущего пользователя
 * @property {(roomName: string) => void} onSelect
 */

/**
 * Список комнат и форма создания
 * @param {RoomListProps} props
 * @returns {JSX.Element}
 */
export function RoomList({ user, onSelect }) {
  const [rooms, setRooms] = useState({});
  const [newRoom, setNewRoom] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRooms().then(setRooms);
    socket.on('rooms:update', setRooms);
    return () => {
      socket.off('rooms:update', setRooms);
    };
  }, []);

  /**
   * Обработка выбора комнаты
   * @param {string} roomName
   */
  function handleSelect(roomName) {
    socket.emit('room:join', roomName);
    onSelect(roomName);
  }

  /**
   * Обработка создания новой комнаты
   * @param {React.FormEvent} e
   */
  function handleCreate(e) {
    e.preventDefault();
    if (!newRoom.trim()) return setError('Введите название комнаты');
    if (rooms[newRoom]) return setError('Комната уже существует');
    socket.emit('room:join', newRoom);
    setNewRoom('');
    setError('');
    onSelect(newRoom);
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
