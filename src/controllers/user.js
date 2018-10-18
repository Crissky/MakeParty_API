'use strict';

const repository = require('../repositories/user');
const ValidationContract = require('../validators/fluent-validator');
const md5 = require('md5');
const authService = require('../services/auth');
const authConfig = require('../config/auth');
const emailConfig = require('../config/email');
const emailService = require('../services/email');

exports.get = async (req, res, next) => {
    try {
        console.log("user-controller: Listar Usuário");

        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        console.log("CATCH = user-controller: Listar Usuário\n", error);

        res.status(500).send({
            error: error
        });
    }
}

exports.post = async (req, res, next) => {
    console.log("user-controller: Cadastrar Usuário");

    let contract = new ValidationContract();
    contract.isEmail(req.body.email, "E-mail inválido.");
    contract.hasMinLen(req.body.password, 6, "Senha deve ter no mínimo 6 caracteres.");
    contract.hasMinLen(req.body.name, 3, "Nome deve ter no mínimo 3 caracteres.");

    if (!contract.isValid()) {
        console.log("ERROR = user-controller: Cadastrar Usuário\n", contract.errors());

        res.status(400).send(contract.errors()).end();

        return;
    }

    try {
        const data = await repository.create({
            email: req.body.email,
            name: req.body.name,
            password: md5(req.body.password + authConfig.secret + req.body.email)
        });
        console.log("user-controller: Cadastrar Usuário - Usuário Cadastrado");
        data.password = undefined;

        console.log("user-controller: Cadastrar Usuário - Enviando E-mail de Boas Vindas");
        emailService.send(
            req.body.email,
            'Bem-vindo ao MakeParty!!!',
            emailConfig.template.replace('{0}', req.body.name)
        );

        res.status(201).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = user-controller: Cadastrar Usuário\n", error);
        res.status(500).send({
            error: error
        });
    }

};

exports.authenticate = async (req, res, next) => {
    console.log("user-controller: Autenticar Usuário");
    let contract = new ValidationContract();
    contract.isEmail(req.body.email, "E-mail inválido.");
    contract.hasMinLen(req.body.password, 6, "Senha deve ter no mínimo 6 caracteres.")

    if (!contract.isValid()) {
        console.log("ERROR = user-controller: Autenticar Usuário\n", contract.errors());
        res.status(400).send(contract.errors()).end();

        return;
    }

    try {
        console.log("user-controller: Autenticar Usuário - Autenticando...");
        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + authConfig.secret + req.body.email)
        });

        if (!user) {
            console.log("user-controller: Autenticar Usuário - E-mail ou senha errados");
            res.status(404).send({
                error: 'E-mail ou senha incorretos.'
            });

            return;
        } else if (!user.active) {
            console.log("user-controller: Autenticar Usuário - Usuário desativado");
            res.status(404).send({
                error: 'Usuário desativado.'
            });

            return;
        }

        const token = await authService.generateToken({
            _id: user._id,
            email: user.email
        });

        console.log("user-controller: Autenticar Usuário - Usuário Autenticado");
        res.status(201).send({
            token: token,
            data: {
                email: user.email
            }
        });
    } catch (error) {
        console.log("CATCH = user-controller: Autenticar Usuário\n", error);
        res.status(500).send({
            error: error
        });
    }

};

exports.refreshToken = async (req, res, next) => {
    try {
        console.log("user-controller: Refresh Token");
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await repository.getById(data._id);

        if (!user) {
            console.log("ERROR = user-controller: Refresh Token - Usuário não encontrado");
            res.status(404).send({
                error: 'Usuário não encontrado.'
            });

            return;
        }

        console.log("user-controller: Refresh Token - Criando novo Token");
        const newToken = await authService.generateToken({
            _id: user._id,
            email: user.email
        });

        console.log("user-controller: Refresh Token - Token Atualizado");
        res.status(201).send({
            token: newToken,
            data: {
                email: user.email
            }
        });
    } catch (error) {
        console.log("CATCH = user-controller: Refresh Token\n", error);
        res.status(500).send({
            error: error
        });
    }

};