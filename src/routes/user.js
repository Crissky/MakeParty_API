'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const authService = require('../services/auth');

router.get('/', authService.authorize, controller.get);
router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;