'use strict';

const repository = require('../repositories/event');
const advertiserRepository = require('../repositories/advertiser');
const authService = require('../services/auth');
const QueriesServices = require('../services/queries');
const ValidationFields = require('../validators/validator-fields');

exports.get = async (req, res, next) => {
    try {
        console.log("event-controller: Listar Eventos");

        const dataToken = await authService.decodeTokenREQ(req);
        const advertiser = await advertiserRepository.getByIdActive(dataToken._id);
        console.log("event-controller: Listar Eventos - Pesquisa dono finalizada");
        req.body.advertiser = dataToken._id;

        if (!advertiser) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado"
            });
            return;
        }

        var options = getQueryLimitAndSkip(req.query);
        var data = await repository.get(req.body, options);
        console.log("event-controller: Listar Eventos - Pesquisa finalizada");
        if (!data) {
            console.log("event-controller: Listar Eventos - Evento não encontrado");
            res.status(404).send({
                error: "Evento não encontrado."
            });

            return;
        }

        res.status(200).send({
            events: data
        });
    } catch (error) {
        console.log("CATCH = event-controller: Listar Eventos\n", error);
        res.status(500).send({
            error: error
        });
    }
}

exports.getByQuery = async (req, res, next) => {
    try {
        console.log("event-controller: Listar Eventos pela query");
        var myQuery = choiceQuery(req.query);
        const dataToken = await authService.decodeTokenREQ(req);
        const advertiser = await advertiserRepository.getByIdActive(dataToken._id);
        console.log("event-controller: Listar Eventos pela query - Pesquisa dono finalizada");
        
        myQuery.advertiser = dataToken._id;

        if (!advertiser) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado"
            });
            return;
        }

        var options = getQueryLimitAndSkip(req.query);
        var data = await repository.getByQuery(myQuery, options);
        console.log("event-controller: Listar Eventos pela query - Pesquisa finalizada");

        if (!data) {
            console.log("event-controller: Listar Eventos pela query - Evento não encontrado");
            res.status(404).send({
                error: "Evento não encontrado."
            });

            return;
        }

        res.status(200).send({
            events: data
        });
    } catch (error) {
        console.log("CATCH = event-controller: Listar Eventos pela query\n", error);
        res.status(500).send({
            error: error
        });
    }
}

exports.post = async (req, res, next) => {
    console.log("event-controller: Cadastrar Evento");
    let contract = new ValidationFields();
    contract.name(req.body.client);
    contract.type(req.body.type);

    if (!contract.isValid()) {
        console.log("ERROR = event-controller: Cadastrar Evento - Nome do cliente ou tipo muito curto\n", contract.errors());
        res.status(400).send({
            error: contract.errors()
        }).end();

        return;
    }

    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const advertiser = await advertiserRepository.getByIdActive(dataToken._id);
        console.log("event-controller: Cadastrar Evento - Pesquisa dono finalizada");
        req.body.advertiser = dataToken._id;

        if (!advertiser) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado"
            });
            return;
        }

        const data = await repository.create(req.body);
        data.__v = undefined;

        console.log("event-controller: Cadastrar Evento - Evento Cadastrado");

        res.status(201).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = event-controller: Cadastrar Evento\n", error);
        res.status(500).send({
            error: error
        });
    }

};

exports.put = async (req, res, next) => {
    console.log("event-controller: Atualizar Evento");
    let contract = new ValidationFields();
    contract.name(req.body.client);
    contract.type(req.body.type);

console.log(req.body.client, req.body.type)

    if (!contract.isValid()) {
        console.log("ERROR = event-controller: Cadastrar Evento - Nome do cliente ou tipo muito curto\n", contract.errors());
        res.status(400).send({
            error: contract.errors()
        }).end();

        return;
    }

    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const advertiser = await advertiserRepository.getByIdActive(dataToken._id);
        console.log("event-controller: Atualizar Evento - Pesquisa dono finalizada");
        req.body.advertiser = dataToken._id;

        if (!advertiser) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado"
            });
            return;
        }

        const data = await repository.update(req.body);

        if (!data) {
            console.log("event-controller: Atualizar Evento - Evento não encontrado ou não pertence a este Usuário");
            res.status(404).send({
                error: "Anuncio não encontrado ou não pertence a este Usuário."
            });

            return;
        }

        console.log("event-controller: Atualizar Evento - Atualização finalizada");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = event-controller: Atualizar Evento");
        res.status(500).send({
            error: error
        });
    }
};

exports.delete = async (req, res, next) => {
    console.log("event-controller: Apagar Evento");
    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const advertiser = await advertiserRepository.getByIdActive(dataToken._id);
        console.log("event-controller: Apagar Evento - Pesquisa dono finalizada");
        req.body.advertiser = dataToken._id;

        if (!advertiser) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado"
            });
            return;
        }

        const data = await repository.delete(req.body);

        if (!data) {
            console.log("event-controller: Apagar Evento - Evento não encontrado ou não pertence a este Usuário");
            res.status(404).send({
                error: "Anuncio não encontrado ou não pertence a este Usuário."
            });

            return;
        }

        console.log("event-controller: Apagar Evento - Evento Apagado");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = event-controller: Apagar Evento");
        res.status(500).send({
            error: error
        });
    }
};

function choiceQuery(query) {
    console.log("event-controller: inner function = choiceQuery");
    var myQuery = { active: true }

    if (query.advertiser) {
        myQuery.advertiser = query.advertiser;
    }

    if (query.client) {
        myQuery.client = { $regex: new RegExp(query.client, "i") };
    }

    if (query.type) {
        myQuery.type = { $regex: new RegExp(query.type, "i") };
    }

    return myQuery;
}

function getQueryLimitAndSkip(query) {
    console.log("event-controller: inner function = getQueryLimitAndSkip");
    const queriesServices = new QueriesServices();

    return queriesServices.getQueryLimitAndSkip(query);

}
