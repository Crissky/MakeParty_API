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
const QueriesValidator = require('../validators/queries');


exports.get = async (req, res, next) => {
    try {
        console.log("user-controller: Listar Usuários");
        var queriesValidator = new QueriesValidator();
        var options = queriesValidator.getQueryLimitAndSkip(req.query);
        var data = await repository.get(options);
        console.log("user-controller: Listar Usuários - Pesquisa finalizada");
        if (!data) {
            console.log("user-controller: Listar Usuários - Usuário não encontrado");
            res.status(404).send({
                error: "Usuário não encontrado."
            });

            return;
        }

        res.status(200).send({
            users: data
        });
    } catch (error) {
        console.log("CATCH = user-controller: Listar Usuários\n", error);
        res.status(500).send({
            error: error
        });
    }
}

exports.post = async (req, res, next) => {
    res.status(303).send({
        message: "A criação de Usuário não é mais realizada nesta rota. Para criar um anunciante use a rota: /user/signup/advertiser Para criar um consumidor use a rota: /user/signup/customer"
    });
    return;

    console.log("user-controller: Cadastrar Usuário");
    let contract = validationUser(req.body);

    if (!contract.isValid()) {
        console.log("ERROR = user-controller: Cadastrar Usuário\n", contract.errors());
        res.status(400).send({
            error: contract.errors()
        }).end();

        return;
    }

    try {
        const data = await repository.create({
            email: req.body.email,
            password: encryptPassword(req.body.user)
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

    if (!req.body.user) {
        console.log("ERROR = user-controller: Cadastrar Anunciante\n");
        res.status(400).send({ error: "Email e Senha são obrigatórios." }).end();

        return;
    }

    let contract = validationAdvertiser(req.body);

    if (!contract.isValid()) {
        console.log("ERROR = user-controller: Cadastrar Anunciante\n", contract.errors());
        res.status(400).send({
            error: contract.errors()
        }).end();

        return;
    }

    try {
        const user = await repository.create({
            email: req.body.user.email,
            password: encryptPassword(req.body.user)
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
        sendEmail(req.body);

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

    if (!req.body.user) {
        console.log("ERROR = user-controller: Cadastrar Cliente\n");
        res.status(400).send({ error: "Email e Senha são obrigatórios." }).end();

        return;
    }

    let contract = validationCustomer(req.body);

    if (!contract.isValid()) {
        console.log("ERROR = user-controller: Cadastrar Cliente\n", contract.errors());
        res.status(400).send({
            error: contract.errors()
        }).end();

        return;
    }

    try {
        const user = await repository.create({
            email: req.body.user.email,
            password: encryptPassword(req.body.user)
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
        sendEmail(req.body);

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
    let contract = validationUser(req.body);

    if (!contract.isValid()) {
        console.log("ERROR = user-controller: Autenticar Usuário\n", contract.errors());
        res.status(400).send({
            error: contract.errors()
        }).end();

        return;
    }

    try {
        console.log("user-controller: Autenticar Usuário - Autenticando...");
        const user = await repository.authenticate({
            email: req.body.email,
            password: encryptPassword(req.body)
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

        console.log("user-controller: Autenticar Usuário - Buscando Anunciante ou Cliente vinculado ao Usuário");
        var client = await getCustomerOrAdvertiserByUserId(user._id);

        if (!client) {
            console.log("user-controller: Autenticar Usuário - Cliente desativado");
            res.status(404).send({
                error: 'Usuário Ativo, mas cliente desativado, favor entrar em contato com o administrador.'
            });

            return;
        }

        console.log(client);
        const token = await authService.generateToken({
            _id: client._id,
            user: {
                _id: client.user._id,
                email: client.user.email
            }
        });

        console.log("user-controller: Autenticar Usuário - Usuário Autenticado");
        res.status(201).send({
            token: token,
            type: client.type
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
        const data = await authService.decodeTokenREQ(req);

        const client = await getCustomerOrAdvertiserByUserId(data.user._id);

        if (!client) {
            console.log("ERROR = user-controller: Refresh Token - Usuário não encontrado");
            res.status(404).send({
                error: 'Usuário não encontrado.'
            });

            return;
        }

        console.log("user-controller: Refresh Token - Criando novo Token");
        const newToken = await authService.generateToken({
            _id: client._id,
            user: {
                _id: client.user._id,
                email: client.user.email
            }
        });

        console.log("user-controller: Refresh Token - Token Atualizado");
        res.status(201).send({
            token: newToken,
            type: client.type
        });
    } catch (error) {
        console.log("CATCH = user-controller: Refresh Token\n", error);
        res.status(500).send({
            error: error
        });
    }

};

async function getCustomerOrAdvertiserByUserId(userId) {
    console.log("user-controller: inner function = getCustomerOrAdvertiserByUserId");
    var client = await advertiserRepository.getByUserId(userId);

    if (!client) {
        client = await customerRepository.getByUserId(userId);
        client.type = "customer";
    } else {
        client.type = "advertiser";
    }

    return client;
}

function encryptPassword(user) {
    console.log("user-controller: inner function = encryptPassword");
    return md5(user.password + authConfig.secret + user.email);
}

function validationAdvertiser(body) {
    console.log("user-controller: inner function = validationAdvertiser");
    var contract = validationUser(body.user);
    contract.cnpj(body.cnpj);

    return contract;
}

function validationCustomer(body) {
    console.log("user-controller: inner function = validationCustomer");
    var contract = validationUser(body.user);
    contract.cpf(body.cpf);

    return contract;
}

function validationUser(user) {
    console.log("user-controller: inner function = validationUser");
    var contract = new ValidationFields();
    contract.email(user.email);
    contract.password(user.password);

    return contract;
}

function sendEmail(body) {
    console.log("user-controller: inner function = sendEmail");
    var userName = body.name || body.socialname;
    emailService.send(
        body.email,
        'Bem-vindo ao MakeParty!!!',
        emailConfig.template.replace('{0}', userName)
    );
}