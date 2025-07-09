/**
 * @file Фича выбора и создания комнаты. Список комнат и форма создания.
 */

import { useState } from 'react';
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
export function CreateRoom({ onRoomCreate }) {
  const [newRoom, setNewRoom] = useState('');

  const onInputChange = (evt) => {
    setNewRoom(evt.target.value);
  };

  /**
   * Обработка создания новой комнаты
   * @param {React.FormEvent} e
   */
  const handleCreate = (evt) => {
    evt.preventDefault();

    onRoomCreate(newRoom);
    setNewRoom('');
  };

  return (
    <form className="createRoom" onSubmit={handleCreate}>
      <input
        className="createRoom__input"
        value={newRoom}
        onChange={onInputChange}
        placeholder="Новая комната"
      />

      <button className="createRoom__createBtn" type="submit">
        Создать
      </button>
    </form>
  );
}
