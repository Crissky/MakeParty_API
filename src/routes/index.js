'use strict';

const express = require('express');
const router = express.Router();

console.log("Index: Versão do App");
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "MakeParty API",
        version: "0.0.5"
    });
});

module.exports = router;
