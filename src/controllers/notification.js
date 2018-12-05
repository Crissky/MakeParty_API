'use strict';

const repository = require('../repositories/notification');
const userRepository = require("../repositories/user");
const authService = require('../services/auth');
const QueriesValidator = require('../validators/queries');

exports.getByUserIdActive = async (req, res, next) => {
    try {
        console.log("notification-controller: Listar Notificações pelo ID de Usuário Ativo");

        const dataToken = await authService.decodeTokenREQ(req);
        const user = await userRepository.getByIdActive(dataToken.user._id);
        req.body.user = dataToken.user._id;

        if (!user) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado."
            });
            return;
        }

        var queriesValidator = new QueriesValidator();
        var options = queriesValidator.getQueryLimitAndSkip(req.query);
        var data = await repository.getByUserIdActive(req.body.user, options);
        console.log("notification-controller: Listar Notificações pelo ID de Usuário Ativo - Pesquisa Finalizada");

        res.status(200).send({
            notifications: data
        });
    } catch (error) {
        console.log("CATCH = notification-controller: Listar Notificações pelo ID de Usuário Ativo\n", error);
        res.status(500).send({
            error: error
        });
    }
}

exports.post = async (req, res, next) => {
    console.log("notification-controller: Cadastrar Notificação");

    if (!req.body.message) {
        console.log("ERROR = notification-controller: campo 'message' não informado\n");
        res.status(400).send({ error: "Campo 'message' não informado." }).end();

        return;
    }

    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const user = await userRepository.getByIdActive(dataToken.user._id);
        req.body.user = dataToken.user._id;

        if (!user) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado."
            });
            return;
        }

        const data = await repository.create(req.body);
        data.__v = undefined;

        console.log("notification-controller: Cadastrar Notificação - Notificação Cadastrada");
        res.status(201).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = notification-controller: Cadastrar Notificação\n", error);
        res.status(500).send({
            error: error
        });
    }
};

exports.put = async (req, res, next) => {
    console.log("notification-controller: Atualizar Notificação");

    if (!req.body.message) {
        console.log("ERROR = notification-controller: campo 'message' não informado\n");
        res.status(400).send({ error: "Campo 'message' não informado." }).end();

        return;
    }

    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const user = await userRepository.getByIdActive(dataToken.user._id);
        req.body.user = dataToken.user._id;

        if (!user) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado."
            });
            return;
        }

        const data = await repository.update(req.body);

        if (!data) {
            console.log("notification-controller: Atualizar Notificação - Avaliação não encontrada ou não pertence a este Usuário");
            res.status(404).send({
                error: "Avaliação não encontrada."
            });

            return;
        }

        console.log("notification-controller: Atualizar Notificação - Atualização finalizada");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = notification-controller: Atualizar Notificação");
        res.status(500).send({
            error: error
        });
    }
};

exports.delete = async (req, res, next) => {
    console.log("notification-controller: Apagar Notificação");

    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const user = await userRepository.getByIdActive(dataToken.user._id);
        req.body.user = dataToken.user._id;

        if (!user) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado."
            });
            return;
        }

        const data = await repository.delete(req.body);

        if (!data) {
            console.log("notification-controller: Apagar Notificação - Notificação não encontrada ou não pertence a este Usuário");
            res.status(404).send({
                error: "Notificação não encontrada ou não pertence a este Usuário."
            });

            return;
        }

        console.log("notification-controller: Apagar Notificação - Notificação Apagada");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = notification-controller: Apagar Notificação");
        res.status(500).send({
            error: error
        });
    }
};
