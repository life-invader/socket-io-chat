/**
 * @file Контроллер комнат
 */

const { getRooms } = require('@services/roomService');
const { getRoomsInfo } = require('@utils/roomUtils');

/**
 * Получить список комнат
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function getRoomsList(req, res) {
  const rooms = getRoomsInfo(getRooms());
  res.json({ rooms });
}

module.exports = {
  getRoomsList,
};
