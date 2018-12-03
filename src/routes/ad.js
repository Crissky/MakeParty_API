'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ad');
const authService = require('../services/auth');

router.get('/', controller.get);
router.get('/tags/:tag', controller.getByTag);
router.get('/types/:type', controller.getByType);
router.get('/titles/:title', controller.getByTitle);
router.get('/prices/:price', controller.getByPrice);
router.get('/owners/', controller.getByOwnerId);
router.get('/owners/:owner', controller.getByOwnerId);
router.get('/:id', controller.getById);
router.post('/', authService.authorize, controller.post);
router.put('/', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
