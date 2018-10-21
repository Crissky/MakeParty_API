'use strict';

const repository = require('../repositories/advertiser');
const ValidationFields = require('../validators/validator-fields');
const authService = require('../services/auth');


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

exports.put = async (req, res, next) => {
    console.log("advertiser-controller: Atualizar Anunciante");
    let contract = new ValidationFields();
    contract.cnpj(req.body.cnpj);
    
    if (!contract.isValid()) {
        console.log("ERROR = advertiser-controller: Atualizar Anunciante\n", contract.errors());
        res.status(400).send(contract.errors()).end();

        return;
    }
    
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dataToken = await authService.decodeToken(token);
        req.body._id = dataToken._id;
        req.body.user = dataToken.user._id;
        
        const data = await repository.update(req.body);

        if(!data){
            console.log("advertiser-controller: Atualizar Anunciante - Anunciante não encontrado ou inativo.");
            res.status(404).send({
                error: "Anunciante não encontrado ou inativo."
            });

            return;
        }

        console.log("advertiser-controller: Atualizar Anunciante - Atualização finalizada");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = advertiser-controller: Atualizar Anunciante");
        res.status(500).send({
            error: error
        });
    }
};

exports.delete = async (req, res, next) => {
    console.log("advertiser-controller: Apagar Anunciante");
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dataToken = await authService.decodeToken(token);
        req.body._id = dataToken._id;
        req.body.user = dataToken.user._id;
        
        const data = await repository.delete(req.body);
        
        if(!data){
            console.log("advertiser-controller: Apagar Anunciante - Anunciante não encontrado ou inativo.");
            res.status(404).send({
                error: "Anunciante não encontrado ou inativo."
            });

            return;
        }

        console.log("advertiser-controller: Apagar Anunciante - Anunciante Apagado");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = advertiser-controller: Apagar Anunciante");
        res.status(500).send({
            error: error
        });
    }
};