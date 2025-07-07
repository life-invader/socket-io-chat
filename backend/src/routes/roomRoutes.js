/**
 * @file Роуты комнат
 */

const express = require('express');
const { getRoomsList } = require('@controllers/roomController');

const router = express.Router();

/**
 * GET /rooms — получить список комнат
 */
router.get('/', getRoomsList);

module.exports = router;
