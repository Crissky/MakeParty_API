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
const Ad = require('./models/ad');
const Advertiser = require('./models/advertiser');
const Customer = require('./models/customer');
const User = require('./models/user');
const WishList = require('./models/wishlist');

console.log("app: Carregando Rotas...");
//Load routes
const indexRoute = require('./routes/index');
const adRoute = require('./routes/ad');
const advertiserRoute = require('./routes/advertiser');
const customerRoute = require('./routes/customer');
const userRoute = require('./routes/user');
const wishlistRoute = require('./routes/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("app: Indexando Rotas...");
app.use('/', indexRoute);
app.use('/ads', adRoute);
app.use('/advertisers', advertiserRoute);
app.use('/customers', customerRoute);
app.use('/users', userRoute);
app.use('/wishlist', wishlistRoute);

console.log("app: Exportando APP...");
module.exports = app;