/**
 * @file Socket.IO обработчики событий
 */

const { allUsers } = require('@config/constants');
const { getAvailableUsers, getRoomsInfo } = require('@utils/roomUtils');
const userService = require('@services/userService');
const roomService = require('@services/roomService');

/**
 * Инициализация socket.io
 * @param {import('socket.io').Server} io
 */
function initSocket(io) {
  io.on('connection', (socket) => {
    // Отправляем актуальные данные сразу при подключении
    socket.emit('users:update', getAvailableUsers(allUsers, userService.getActiveUsers()));
    socket.emit('rooms:update', getRoomsInfo(roomService.getRooms()));

    /**
     * Пользователь выбирает имя
     */
    socket.on('user:join', (userName) => {
      if (userService.isUserActive(userName)) {
        socket.emit('user:join:error', 'Пользователь уже занят');
        return;
      }

      userService.addActiveUser(userName, socket.id);
      socket.data.userName = userName;
      io.emit('users:update', getAvailableUsers(allUsers, userService.getActiveUsers()));
    });

    /**
     * Пользователь заходит в комнату
     */
    socket.on('room:join', (roomName) => {
      const userName = socket.data.userName;
      if (!userName) return;
      roomService.addUserToRoom(roomName, userName);
      socket.join(roomName);
      io.emit('rooms:update', getRoomsInfo(roomService.getRooms()));
    });

    /**
     * Сообщение в комнате
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

    /**
     * Отключение пользователя
     */
    socket.on('disconnect', () => {
      const userName = socket.data.userName;
      if (userName) {
        userService.removeActiveUser(userName);
        roomService.removeUserFromRooms(userName);
        io.emit('users:update', getAvailableUsers(allUsers, userService.getActiveUsers()));
        io.emit('rooms:update', getRoomsInfo(roomService.getRooms()));
      }
    });
  });
}

module.exports = { initSocket };
