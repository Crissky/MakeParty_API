'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ad');
const authService = require('../services/auth');

router.get('/', controller.get);
router.get('/tags/:tag', controller.getByTag);
router.get('/:id', controller.getById);
router.post('/', authService.authorize, controller.post);
router.put('/', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
