/**
 * @file Фича выбора и создания комнаты. Список комнат и форма создания.
 */

import { useState } from 'react';
import { selectSetRoom, useRoomStore } from '@entities/room';
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
export function CreateRoom() {
  const setRoom = useRoomStore(selectSetRoom);
  const [newRoom, setNewRoom] = useState('');

  /**
   * Обработка создания новой комнаты
   * @param {React.FormEvent} e
   */
  function handleCreate(e) {
    e.preventDefault();

    roomService.joinRoom(newRoom);
    setNewRoom('');
    setRoom(newRoom);
  }

  return (
    <form className="createRoom" onSubmit={handleCreate}>
      <input
        className="createRoom__input"
        value={newRoom}
        onChange={(e) => setNewRoom(e.target.value)}
        placeholder="Новая комната"
      />

      <button className="createRoom__createBtn" type="submit">
        Создать
      </button>
    </form>
  );
}
