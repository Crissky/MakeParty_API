'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/wishlist');
const authService = require('../services/auth');

router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post);
router.put('/', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
