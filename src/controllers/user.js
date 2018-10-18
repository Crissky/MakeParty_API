'use strict';

const repository = require('../repositories/user');
const advertiserRepository = require('../repositories/advertiser');
const customerRepository = require('../repositories/customer');
const ValidationFields = require('../validators/validator-fields');
const md5 = require('md5');
const authService = require('../services/auth');
const authConfig = require('../config/auth');
const emailConfig = require('../config/email');
const emailService = require('../services/email');

exports.get = async (req, res, next) => {
    try {
        console.log("user-controller: Listar Usuários");
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        console.log("CATCH = user-controller: Listar Usuários\n", error);
        res.status(500).send({
            error: error
        });
    }
}

exports.post = async (req, res, next) => {
    console.log("user-controller: Cadastrar Usuário");
    let contract = new ValidationFields();
    contract.email(req.body.email);
    contract.password(req.body.password);
    
    if (!contract.isValid()) {
        console.log("ERROR = user-controller: Cadastrar Usuário\n", contract.errors());
        res.status(400).send(contract.errors()).end();

        return;
    }

    try {
        const data = await repository.create({
            email: req.body.email,
            password: md5(req.body.password + authConfig.secret + req.body.email)
        });
        console.log("user-controller: Cadastrar Usuário - Usuário Cadastrado");
        data.password = undefined;
        data.__v = undefined;

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

exports.signupAdvertiser = async (req, res, next) => {
    console.log("user-controller: Cadastrar Anunciante");
    let contract = new ValidationFields();
    contract.email(req.body.user.email);
    contract.password(req.body.user.password);
    contract.cnpj(req.body.cnpj);

    if (!contract.isValid()) {
        console.log("ERROR = user-controller: Cadastrar Anunciante\n", contract.errors());
        res.status(400).send(contract.errors()).end();

        return;
    }

    try {
        const user = await repository.create({
            email: req.body.user.email,
            password: md5(req.body.user.password + authConfig.secret + req.body.user.email)
        });
        req.body.user = user._id;
        console.log("user-controller: Cadastrar Anunciante - Usuário Cadastrado");
    } catch (error) {
        console.log("CATCH = user-controller: Cadastrar Anunciante - Erro ao cadastrar Usuário\n", error);
        res.status(500).send({
            error: error
        });
        
        return;
    }

    try {
        const advertiser = await advertiserRepository.create(req.body);
        console.log("user-controller: Cadastrar Anunciante - Anunciante Cadastrado");
        advertiser.__v = undefined;

        console.log("user-controller: Cadastrar Anunciante - Enviando E-mail de Boas Vindas");
        emailService.send(
            req.body.email,
            'Bem-vindo ao MakeParty!!!',
            emailConfig.template.replace('{0}', req.body.socialname)
        );

        res.status(201).send({
            data: advertiser
        });
    } catch (error) {
        console.log("CATCH = user-controller: Cadastrar Anunciante - Apagando Usuário\n", error);
        try {
            await repository.deleteRaw(req.body.user);
        } catch (error2) {
            res.status(500).send({
                error: error2
            });
        }
        res.status(500).send({
            error: error
        });
    }

};

exports.signupCustomer = async (req, res, next) => {
    console.log("user-controller: Cadastrar Cliente");
    let contract = new ValidationFields();
    contract.email(req.body.user.email);
    contract.password(req.body.user.password);
    contract.cpf(req.body.cpf);

    if (!contract.isValid()) {
        console.log("ERROR = user-controller: Cadastrar Cliente\n", contract.errors());
        res.status(400).send(contract.errors()).end();

        return;
    }

    try {
        const user = await repository.create({
            email: req.body.user.email,
            password: md5(req.body.user.password + authConfig.secret + req.body.user.email)
        });
        req.body.user = user._id;
        console.log("user-controller: Cadastrar Cliente - Usuário Cadastrado");
    } catch (error) {
        console.log("CATCH = user-controller: Cadastrar Cliente - Erro ao cadastrar Usuário\n", error);
        res.status(500).send({
            error: error
        });
        
        return;
    }

    try {
        const customer = await customerRepository.create(req.body);
        console.log("user-controller: Cadastrar Cliente - Cliente Cadastrado");
        customer.__v = undefined;

        console.log("user-controller: Cadastrar Cliente - Enviando E-mail de Boas Vindas");
        emailService.send(
            req.body.email,
            'Bem-vindo ao MakeParty!!!',
            emailConfig.template.replace('{0}', req.body.socialname)
        );

        res.status(201).send({
            data: customer
        });
    } catch (error) {
        console.log("CATCH = user-controller: Cadastrar Cliente - Apagando Usuário\n", error);
        try {
            await repository.deleteRaw(req.body.user);
        } catch (error2) {
            res.status(500).send({
                error: error2
            });
        }
        res.status(500).send({
            error: error
        });
    }

};

exports.authenticate = async (req, res, next) => {
    console.log("user-controller: Autenticar Usuário");
    let contract = new ValidationFields();
    contract.email(req.body.email);
    contract.password(req.body.password);
    
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