/**
 * @file Сервис для работы с пользователями (API + socket)
 */
import { socket } from '../api/socket';

/**
 * Получить список пользователей через REST
 * @returns {Promise<string[]>}
 */
export async function fetchAvailableUsers() {
  const res = await fetch('http://localhost:4000/users');
  const data = await res.json();
  return data.users;
}

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
