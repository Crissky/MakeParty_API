'use strict';

const repository = require('../repositories/advertiser');

exports.get = async (req, res, next) => {
    try {
        console.log("advertiser-controller: Listar Anunciantes");
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        console.log("CATCH = advertiser-controller: Listar Anunciantes\n", error);
        res.status(500).send({
            error: error
        });
    }
}

exports.getById = async (req, res, next) => {
    console.log("advertiser-controller: Pesquisar Anunciante pelo ID");
    try {
        var data = await repository.getById(req.params.id);
        console.log("advertiser-controller: Pesquisar Anunciante pelo ID - Pesquisa finalizada");
        res.status(200).send(data);
    } catch (error) {
        console.log("CATCH = advertiser-controller: Pesquisar Anunciante pelo ID");
        res.status(500).send({
            error: error
        });
    }
}
