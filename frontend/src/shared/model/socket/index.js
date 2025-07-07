/**
 * @file Модуль для подключения к Socket.IO серверу.
 */

import { io } from 'socket.io-client';

export const socket = io('http://localhost:4000', {
  autoConnect: false,
});

export * as userService from './userService';
export * as messageService from './messageService';
export * as roomService from './roomService';
