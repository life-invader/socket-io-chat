/**
 * @file Сервис для работы с комнатами (API + socket)
 */

import { socket } from './index';

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
