/**
 * @file Роуты пользователей
 */

const express = require('express');
const { getUsers } = require('@controllers/userController');

const router = express.Router();

/**
 * GET /users — получить список свободных пользователей
 */
router.get('/', getUsers);

module.exports = router;
