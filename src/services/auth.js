'use strict';

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const repository = require('../repositories/user');

exports.generateToken = async (data) => {
    console.log("auth-services: Gerando Token");
    return jwt.sign(data, authConfig.secret, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    console.log("auth-services: Decriptando Token");
    var data = await jwt.verify(token, authConfig.secret);
    return data;
}

exports.authorize = function (req, res, next) {
    console.log("auth-services: Validando Token");
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        console.log("auth-services: Usuário não enviou um Token");
        res.status(401).json({
            error: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, authConfig.secret, async function (error, decoded) {
            const user = await repository.getByIdActive(decoded._id);
            if (error) {
                console.log("ERRO = auth-services: Token Inválido\n", error);
                res.status(401).json({
                    error: 'Token Inválido'
                });
            } else if (!user) {
                console.log("ERRO = auth-services: Usuário desativado");
                res.status(401).json({
                    error: 'Usuário desativado'
                });
            } else {
                console.log("auth-services: Acesso Autorizado");
                next();
            }
        });
    }
}