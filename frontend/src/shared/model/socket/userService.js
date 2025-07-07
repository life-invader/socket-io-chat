/**
 * @file Сервис для работы с пользователями (API + socket)
 */
import { socket } from './index';

/**
 * Подписаться на обновления пользователей через socket
 * @param {(users: string[]) => void} cb
 */
export function subscribeUsersUpdate(cb) {
  socket.on('users:update', cb);
  return () => socket.off('users:update', cb);
}

/**
 * Сообщить серверу о выборе пользователя
 * @param {string} userName
 */
export function joinUser(userName) {
  socket.emit('user:join', userName);
}
