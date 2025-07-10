import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CreateRoom } from '@features/room/createRoom';
import { RoomCard, useRoomStore } from '@entities/room';
import { selectSetAppState, useAppStore } from '@shared/model/store';
import { roomService } from '@shared/model/socket';
import { APP_STATE } from '@shared/constants';
import { selectRoomSliceData } from '../model/selectors';
import './style.css';

export const RoomScreen = () => {
  const setAppState = useAppStore(selectSetAppState);
  const { rooms, setRoom, setRooms } = useRoomStore(useShallow(selectRoomSliceData));

  const joinRoom = (roomName) => {
    roomService.joinRoom(roomName, ({ isSuccess }) => {
      if (isSuccess) {
        setRoom(roomName);
        setAppState(APP_STATE.chat);
      }
    });
  };

  const createRoomHandler = (roomName) => {
    joinRoom(roomName);
  };

  /**
   * Обработка выбора комнаты
   * @param {string} roomName
   */
  const handleRoomSelect = (roomName) => {
    return () => {
      joinRoom(roomName);
    };
  };

  useEffect(() => {
    roomService.fetchRooms((rooms) => {
      setRooms(rooms);
    });

    const unsub = roomService.subscribeRoomsUpdate(setRooms);

    return () => {
      unsub();
    };
  }, [setRooms]);

  return (
    <div className="roomScreen">
      <CreateRoom onRoomCreate={createRoomHandler} />

      <ul className="roomScreen__list">
        {Object.entries(rooms).map(([room, users]) => (
          <li key={room} className="roomScreen__item">
            <RoomCard onClick={handleRoomSelect(room)} roomName={room} users={users} />
          </li>
        ))}
      </ul>
    </div>
  );
};
