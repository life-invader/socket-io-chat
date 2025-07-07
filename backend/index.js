/**
 * @file Точка входа backend-приложения. Инициализация express, routes, socket.io
 */

require('module-alias/register');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { PORT } = require('@config/constants');
const userRoutes = require('@routes/userRoutes');
const roomRoutes = require('@routes/roomRoutes');
const { initSocket } = require('@socket');

/**
 * @typedef {Object} User
 * @property {string} name - Имя пользователя
 * @property {string} room - Название комнаты
 */

const app = express();
app.use(cors());

// REST API routes
app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

/**
 * Список всех возможных пользователей (можно расширить по желанию)
 * @type {string[]}
 */
const allUsers = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];

/**
 * Активные пользователи: { [userName]: socketId }
 * @type {Object.<string, string>}
 */
const activeUsers = {};

/**
 * Комнаты: { [roomName]: Set<userName> }
 * @type {Object.<string, Set<string>>}
 */
const rooms = {};

/**
 * Получить список свободных пользователей
 * @returns {string[]}
 */
function getAvailableUsers() {
  return allUsers.filter((user) => !activeUsers[user]);
}

/**
 * Получить список комнат с пользователями
 * @returns {Object.<string, string[]>}
 */
function getRoomsInfo() {
  const info = {};
  for (const [room, users] of Object.entries(rooms)) {
    info[room] = Array.from(users);
  }
  return info;
}

// Socket.IO
initSocket(io);

io.on('connection', (socket) => {
  // Отправляем актуальные данные сразу при подключении
  socket.emit('users:update', getAvailableUsers());
  socket.emit('rooms:update', getRoomsInfo());
  /**
   * @param {string} userName
   */
  socket.on('user:join', (userName) => {
    if (activeUsers[userName]) {
      socket.emit('user:join:error', 'Пользователь уже занят');
      return;
    }
    activeUsers[userName] = socket.id;
    socket.data.userName = userName;
    io.emit('users:update', getAvailableUsers());
  });

  /**
   * @param {string} roomName
   */
  socket.on('room:join', (roomName) => {
    const userName = socket.data.userName;
    if (!userName) return;
    if (!rooms[roomName]) rooms[roomName] = new Set();
    rooms[roomName].add(userName);
    socket.join(roomName);
    io.emit('rooms:update', getRoomsInfo());
  });

  /**
   * @param {string} roomName
   * @param {string} message
   */
  socket.on('message', ({ roomName, message }) => {
    const userName = socket.data.userName;
    if (!userName || !roomName) return;
    io.to(roomName).emit('message', {
      user: userName,
      message,
      time: new Date().toISOString(),
    });
  });

  socket.on('disconnect', () => {
    const userName = socket.data.userName;
    if (userName) {
      delete activeUsers[userName];
      for (const users of Object.values(rooms)) {
        users.delete(userName);
      }
      io.emit('users:update', getAvailableUsers());
      io.emit('rooms:update', getRoomsInfo());
    }
  });
});

app.get('/users', (req, res) => {
  res.json({ users: getAvailableUsers() });
});

app.get('/rooms', (req, res) => {
  res.json({ rooms: getRoomsInfo() });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
