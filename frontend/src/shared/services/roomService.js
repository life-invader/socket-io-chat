/**
 * @file Сервис для работы с комнатами (API + socket)
 */
import { socket } from '@shared/api/socket';

/**
 * Получить список комнат через REST
 * @returns {Promise<Object<string, string[]>>}
 */
export async function fetchRooms() {
  const res = await fetch('http://localhost:4000/rooms');
  const data = await res.json();
  return data.rooms;
}

/**
 * Подписаться на обновления комнат через socket
 * @param {(rooms: Object<string, string[]>) => void} cb
 */
export function subscribeRoomsUpdate(cb) {
  socket.on('rooms:update', cb);
  return () => socket.off('rooms:update', cb);
}

/**
 * Войти в комнату (или создать новую)
 * @param {string} roomName
 */
export function joinRoom(roomName) {
  socket.emit('room:join', roomName);
}
