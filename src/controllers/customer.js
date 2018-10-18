'use strict';

const repository = require('../repositories/customer');

exports.get = async (req, res, next) => {
    try {
        console.log("customer-controller: Listar Clientes");
        var data = await repository.get();
        res.status(200).send(data);
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
        res.status(200).send(data);
    } catch (error) {
        console.log("CATCH = customer-controller: Pesquisar Cliente pelo ID");
        res.status(500).send({
            error: error
        });
    }
}
