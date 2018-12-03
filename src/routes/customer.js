'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer');
const authService = require('../services/auth');

router.get('/', authService.authorize, controller.get);
router.get('/token', controller.getByToken);
router.get('/:id', controller.getById);
router.put('/', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;