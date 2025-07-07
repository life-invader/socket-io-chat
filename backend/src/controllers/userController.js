/**
 * @file Контроллер пользователей
 */

const { allUsers } = require('@config/constants');
const { getActiveUsers } = require('@services/userService');
const { getAvailableUsers } = require('@utils/roomUtils');

/**
 * Получить список свободных пользователей
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function getUsers(req, res) {
  const users = getAvailableUsers(allUsers, getActiveUsers());
  res.json({ users });
}

module.exports = {
  getUsers,
};
