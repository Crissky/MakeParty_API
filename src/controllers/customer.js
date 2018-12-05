'use strict';

const repository = require('../repositories/customer');
const ValidationFields = require('../validators/validator-fields');
const authService = require('../services/auth');
const QueriesValidator = require('../validators/queries');

exports.get = async (req, res, next) => {
    try {
        console.log("customer-controller: Listar Clientes");
        var queriesValidator = new QueriesValidator();
        var options = queriesValidator.getQueryLimitAndSkip(req.query);
        var data = await repository.get(options);
        console.log("customer-controller: Listar Clientes - Pesquisa finalizada");
        if (!data) {
            console.log("customer-controller: Listar Clientes - Cliente não encontrado");
            res.status(404).send({
                error: "Cliente não encontrado."
            });

            return;
        }

        res.status(200).send({
            customers: data
        });
    } catch (error) {
        console.log("CATCH = customer-controller: Listar Clientes\n", error);
        res.status(500).send({
            error: error
        });
    }
}

exports.getById = async (req, res, next) => {
    console.log("customer-controller: Pesquisar Cliente pelo ID");
    try {
        var data = await repository.getById(req.params.id);
        console.log("customer-controller: Pesquisar Cliente pelo ID - Pesquisa finalizada");
        if (!data) {
            console.log("customer-controller: Pesquisar Cliente pelo ID - Cliente não encontrado");
            res.status(404).send({
                error: "Cliente não encontrado."
            });

            return;
        }

        res.status(200).send(data);
    } catch (error) {
        console.log("CATCH = customer-controller: Pesquisar Cliente pelo ID");
        res.status(500).send({
            error: error
        });
    }
}

exports.getByToken = async (req, res, next) => {
    console.log("customer-controller: Pesquisar Cliente pelo Token");
    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const data = await repository.getByIdActive(dataToken._id);

        console.log("customer-controller: Pesquisar Cliente pelo Token - Pesquisa finalizada");
        if (!data) {
            console.log("customer-controller: Pesquisar Cliente pelo Token - Cliente não encontrado");
            res.status(404).send({
                error: "Cliente não encontrado ou desativado."
            });

            return;
        }

        res.status(200).send(data);
    } catch (error) {
        console.log("CATCH = customer-controller: Pesquisar Cliente pelo Token");
        res.status(500).send({
            error: error
        });
    }
}

exports.put = async (req, res, next) => {
    console.log("customer-controller: Atualizar Cliente");
    let contract = new ValidationFields();
    contract.cpf(req.body.cpf);

    if (!contract.isValid()) {
        console.log("ERROR = customer-controller: Atualizar Cliente\n", contract.errors());
        res.status(400).send({
            error: contract.errors()
        }).end();

        return;
    }

    try {
        const dataToken = await authService.decodeTokenREQ(req);
        req.body._id = dataToken._id;
        req.body.user = dataToken.user._id;

        console.log(req.body);
        const data = await repository.update(req.body);

        if (!data) {
            console.log("customer-controller: Atualizar Cliente - Cliente não encontrado ou inativo.");
            res.status(404).send({
                error: "Cliente não encontrado ou inativo."
            });

            return;
        }

        console.log("customer-controller: Atualizar Cliente - Atualização finalizada");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = customer-controller: Atualizar Cliente");
        res.status(500).send({
            error: error
        });
    }
};

exports.delete = async (req, res, next) => {
    console.log("customer-controller: Apagar Cliente");
    try {
        const dataToken = await authService.decodeTokenREQ(req);
        req.body._id = dataToken._id;
        req.body.user = dataToken.user._id;

        const data = await repository.delete(req.body);

        if (!data) {
            console.log("customer-controller: Apagar Cliente - Cliente não encontrado ou inativo.");
            res.status(404).send({
                error: "Cliente não encontrado ou inativo."
            });

            return;
        }

        console.log("customer-controller: Apagar Cliente - Cliente Apagado");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = customer-controller: Apagar Cliente");
        res.status(500).send({
            error: error
        });
    }
};