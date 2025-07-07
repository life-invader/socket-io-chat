/**
 * @file Сервис для управления комнатами
 */

/**
 * Комнаты: { [roomName]: Set<userName> }
 * @type {Object.<string, Set<string>>}
 */
const rooms = {};

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

module.exports = {
  addUserToRoom,
  removeUserFromRooms,
  getRooms,
};
