'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const configDB = require('./config/database');

const app = express();

console.log("app: Carregando Banco de Dados...");
//Load Database
mongoose.connect(configDB.connectionString, { useNewUrlParser: true, useCreateIndex: true });

console.log("app: Carregando Modelos...");
//Load Models
const User = require('./models/user');

console.log("app: Carregando Rotas...");
//Load routes
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("app: Indexando Rotas...");
app.use('/', indexRoute);
app.use('/users', userRoute);

console.log("app: Exportando APP...");
module.exports = app;