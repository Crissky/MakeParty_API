'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/rating');
const authService = require('../services/auth');

//router.get('/', controller.get);
router.get('/:ad', controller.getByAd);
router.post('/', authService.authorize, controller.post);
router.put('/', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
