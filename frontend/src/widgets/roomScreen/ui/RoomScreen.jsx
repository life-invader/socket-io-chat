import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CreateRoom } from '@features/room/createRoom';
import { roomActions, RoomCard, useRoomStore } from '@entities/room';
import { selectSetAppState, useAppStore } from '@shared/model/store';
import { roomService } from '@shared/model/socket';
import { selectRoomSliceData } from '../model/selectors';
import './style.css';

export const RoomScreen = () => {
  const setAppState = useAppStore(selectSetAppState);
  const { rooms, setRoom, setRooms } = useRoomStore(useShallow(selectRoomSliceData));

  /**
   * Обработка выбора комнаты
   * @param {string} roomName
   */
  const handleSelect = (roomName) => {
    return () => {
      roomService.joinRoom(roomName);
      setRoom(roomName);
      setAppState('chat');
    };
  };

  useEffect(() => {
    roomActions.fetchRooms().then(setRooms);
    const unsub = roomService.subscribeRoomsUpdate(setRooms);

    return () => {
      unsub();
    };
  }, [setRooms]);

  return (
    <div className="roomScreen">
      <CreateRoom />

      <ul className="roomScreen__list">
        {Object.entries(rooms).map(([room, users]) => (
          <li key={room} className="roomScreen__item">
            <RoomCard onClick={handleSelect(room)} roomName={room} users={users} />
          </li>
        ))}
      </ul>
    </div>
  );
};
