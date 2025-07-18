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
    // socket.emit('rooms:update', getRoomsInfo(roomService.getRooms()));

    /**
     * Пользователь выбирает имя
     */
    socket.on('user:join', (userName, callback) => {
      if (userService.isUserActive(userName)) {
        socket.emit('user:join:error', 'Пользователь уже занят');
        return;
      }

      userService.addActiveUser(userName, socket.id);
      socket.data.userName = userName;
      callback({ isSuccess: true });

      io.emit('users:update', getAvailableUsers(allUsers, userService.getActiveUsers()));
    });

    /**
     * Пользователь заходит в комнату
     */
    socket.on('room:fetch', (callback) => {
      callback(getRoomsInfo(roomService.getRooms()));
    });

    /**
     * Пользователь заходит в комнату
     */
    socket.on('room:join', (roomName, callback) => {
      const userName = socket.data.userName;
      if (!userName) return;

      roomService.addUserToRoom(roomName, userName);
      socket.join(roomName);
      callback({ isSuccess: true });

      io.emit('rooms:update', getRoomsInfo(roomService.getRooms()));
    });

    /**
     * Сообщение в комнате
     */
    socket.on('message', ({ roomName, message }) => {
      const userName = socket.data.userName;
      if (!userName || !roomName) return;

      const time = new Date().toISOString();
      roomService.addMessageToRoom(roomName, userName, message, time);

      io.to(roomName).emit('message', {
        user: userName,
        message,
        time,
      });
    });

    /**
     * Получение истории сообщений комнаты
     */
    socket.on('room:messages', (roomName, callback) => {
      /**
       * @param {string} roomName
       * @param {(messages: Array<{ user: string, message: string, time: string }>) => void} callback
       */
      const messages = roomService.getRoomMessages(roomName);
      callback(messages);
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
