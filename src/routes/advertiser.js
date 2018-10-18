'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/advertiser');
const authService = require('../services/auth');

router.get('/', authService.authorize, controller.get);
router.get('/:id', controller.getById);

module.exports = router;