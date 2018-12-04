'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Index: Versão do App");
    res.status(200).send({
        title: "MakeParty API",
        version: "0.1.2"
    });
});

module.exports = router;
