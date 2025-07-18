/**
 * @file Сервис для работы с сообщениями (socket)
 */
import { socket } from './index';

/**
 * Подписаться на новые сообщения в комнате
 * @param {(msg: object) => void} cb
 */
export function subscribeMessages(cb) {
  socket.on('message', cb);
  return () => socket.off('message', cb);
}

/**
 * Отправить сообщение в комнату
 * @param {string} roomName
 * @param {string} message
 */
export function sendMessage(roomName, message) {
  socket.emit('message', { roomName, message });
}

export function getRoomMessages(roomName, cb = () => {}) {
  socket.emit('room:messages', roomName, cb);
}
