/**
 * @file Сущность комнаты. Типы и утилиты для работы с комнатами.
 */

/**
 * @typedef {Object} Room
 * @property {string} name - Название комнаты
 * @property {string[]} users - Список пользователей в комнате
 */

/**
 * Получить список комнат из API
 * @returns {Promise<Object<string, string[]>>}
 */
export async function fetchRooms() {
  const res = await fetch('http://localhost:4000/rooms');
  const data = await res.json();
  return data.rooms;
}
