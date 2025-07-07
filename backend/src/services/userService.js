/**
 * @file Сервис для управления пользователями
 */

/**
 * Активные пользователи: { [userName]: socketId }
 * @type {Object.<string, string>}
 */
const activeUsers = {};

/**
 * Добавить активного пользователя
 * @param {string} userName
 * @param {string} socketId
 */
function addActiveUser(userName, socketId) {
  activeUsers[userName] = socketId;
}

/**
 * Удалить активного пользователя
 * @param {string} userName
 */
function removeActiveUser(userName) {
  delete activeUsers[userName];
}

/**
 * Проверить, активен ли пользователь
 * @param {string} userName
 * @returns {boolean}
 */
function isUserActive(userName) {
  return Boolean(activeUsers[userName]);
}

/**
 * Получить всех активных пользователей
 * @returns {Object.<string, string>}
 */
function getActiveUsers() {
  return activeUsers;
}

module.exports = {
  addActiveUser,
  removeActiveUser,
  isUserActive,
  getActiveUsers,
};
