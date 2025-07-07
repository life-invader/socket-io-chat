/**
 * @file Модуль для подключения к Socket.IO серверу.
 */

import { io } from 'socket.io-client';

/**
 * @type {import('socket.io-client').Socket}
 */
export const socket = io('http://localhost:4000', {
  autoConnect: false,
});
