import { useEffect } from 'react';
import { CreateRoom } from '@features/room/createRoom/ui/CreateRoom';
import { roomActions, RoomCard } from '@entities/room';
import { appStore, roomStore } from '@shared/model/store';
import { roomService } from '@shared/model/socket';
import './style.css';

export const RoomScreen = () => {
  const rooms = roomStore.useRoomStore(roomStore.selectRooms);
  const setRoom = roomStore.useRoomStore(roomStore.selectSetRoom);
  const setRooms = roomStore.useRoomStore(roomStore.selectSetRooms);
  const setAppState = appStore.useAppStore(appStore.selectSetAppState);

  /**
   * Обработка выбора комнаты
   * @param {string} roomName
   */
  function handleSelect(roomName) {
    roomService.joinRoom(roomName);
    setRoom(roomName);
    setAppState('chat');
  }

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
          <li className="roomScreen__item">
            <RoomCard onClick={() => handleSelect(room)} users={users} />
          </li>
        ))}
      </ul>
    </div>
  );
};
