/**
 * @file Константы приложения backend
 */

/**
 * Список всех возможных пользователей
 * @type {string[]}
 */
const allUsers = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];

/**
 * Порт сервера
 * @type {number}
 */
const PORT = process.env.PORT || 4000;

module.exports = {
  allUsers,
  PORT,
};
