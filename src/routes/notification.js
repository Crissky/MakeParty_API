'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/notification');
const authService = require('../services/auth');

//router.get('/', controller.get);
router.get('/users', authService.authorize, controller.getByUserIdActive);
router.post('/', authService.authorize, controller.post);
router.put('/', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
