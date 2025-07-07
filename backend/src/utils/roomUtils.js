/**
 * @file Утилиты для работы с комнатами и пользователями
 */

/**
 * Получить список свободных пользователей
 * @param {string[]} allUsers
 * @param {Object.<string, string>} activeUsers
 * @returns {string[]}
 */
function getAvailableUsers(allUsers, activeUsers) {
  return allUsers.filter((user) => !activeUsers[user]);
}

/**
 * Получить список комнат с пользователями
 * @param {Object.<string, Set<string>>} rooms
 * @returns {Object.<string, string[]>}
 */
function getRoomsInfo(rooms) {
  const info = {};
  for (const [room, users] of Object.entries(rooms)) {
    info[room] = Array.from(users);
  }
  return info;
}

module.exports = {
  getAvailableUsers,
  getRoomsInfo,
};
