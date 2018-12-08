'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/event');
const authService = require('../services/auth');

//router.get('/', controller.get);
router.get('/', authService.authorize, controller.get);
router.get('/queries/', authService.authorize, controller.getByQuery);
router.post('/', authService.authorize, controller.post);
router.put('/', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
