/**
 * @file Сервис для управления комнатами
 */

/**
 * Комнаты: { [roomName]: Set<userName> }
 * @type {Object.<string, Set<string>>}
 */
const rooms = {};

/**
 * Сообщения по комнатам: { [roomName]: Array<{ user: string, message: string, time: string }> }
 * @type {Object.<string, Array<{ user: string, message: string, time: string }>>}
 */
const roomMessages = {};

/**
 * Добавить пользователя в комнату
 * @param {string} roomName
 * @param {string} userName
 */
function addUserToRoom(roomName, userName) {
  if (!rooms[roomName]) rooms[roomName] = new Set();
  rooms[roomName].add(userName);
}

/**
 * Удалить пользователя из всех комнат
 * @param {string} userName
 */
function removeUserFromRooms(userName) {
  for (const users of Object.values(rooms)) {
    users.delete(userName);
  }
}

/**
 * Получить все комнаты
 * @returns {Object.<string, Set<string>>}
 */
function getRooms() {
  return rooms;
}

/**
 * Добавить сообщение в комнату
 * @param {string} roomName
 * @param {string} user
 * @param {string} message
 * @param {string} time
 */
function addMessageToRoom(roomName, user, message, time) {
  if (!roomMessages[roomName]) roomMessages[roomName] = [];
  roomMessages[roomName].push({ user, message, time });
}

/**
 * Получить сообщения комнаты
 * @param {string} roomName
 * @returns {Array<{ user: string, message: string, time: string }>}
 */
function getRoomMessages(roomName) {
  return roomMessages[roomName] || [];
}

module.exports = {
  addUserToRoom,
  removeUserFromRooms,
  getRooms,
  addMessageToRoom,
  getRoomMessages,
};
