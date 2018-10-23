'use strict';

const repository = require('../repositories/ad');
const advertiserRepository = require('../repositories/advertiser');
const ValidationFields = require('../validators/validator-fields');
const authService = require('../services/auth');

exports.get = async (req, res, next) => {
    try {
        console.log("ad-controller: Listar Anúncios");
        
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        console.log("CATCH = ad-controller: Listar Anúncios\n", error);
        res.status(500).send({
            error: error
        });
    }
}

exports.getByTag = async (req, res, next) => {
    console.log("ad-controller: Pesquisar Anúncios pela TAG");
    try {
        var data = await repository.getByTag(req.params.tag);
        console.log("ad-controller: Pesquisar Anúncios pela TAG - Pesquisa finalizada");
    res.status(200).send(data);
    } catch (error) {
        console.log("CATCH = ad-controller: Pesquisar Anúncios pela TAG");
        res.status(500).send({
            error: error
        });
    }
}

exports.getById = async (req, res, next) => {
    console.log("ad-controller: Pesquisar Anúncio pelo ID");
    try {
        var data = await repository.getById(req.params.id);
        console.log("ad-controller: Pesquisar Anúncio pelo ID - Pesquisa finalizada");
        res.status(200).send(data);
    } catch (error) {
        console.log("CATCH = ad-controller: Pesquisar Anúncio pelo ID");
        res.status(500).send({
            error: error
        });
    }
}

exports.post = async (req, res, next) => {
    console.log("ad-controller: Cadastrar Anúncio");
    let contract = new ValidationFields();
    contract.title(req.body.title);
    
    if (!contract.isValid()) {
        console.log("ERROR = ad-controller: Título muito curto\n", contract.errors());
        res.status(400).send(contract.errors()).end();

        return;
    }
    
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dataToken = await authService.decodeToken(token);
        req.body.owner = dataToken._id;
        
        if(!advertiserRepository.getById(req.body.owner)){
            return;
        }

        const data = await repository.create(req.body);
        data.__v = undefined;

        console.log("ad-controller: Cadastrar Anúncio - Anúncio Cadastrado");
        
        res.status(201).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = ad-controller: Cadastrar Anúncio\n", error);
        res.status(500).send({
            error: error
        });
    }

};

exports.put = async (req, res, next) => {
    console.log("ad-controller: Atualizar Anúncio");
    let contract = new ValidationFields();
    contract.title(req.body.title);
    
    if (!contract.isValid()) {
        console.log("ERROR = ad-controller: Título muito curto\n", contract.errors());
        res.status(400).send(contract.errors()).end();

        return;
    }
    
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dataToken = await authService.decodeToken(token);
        req.body.owner = dataToken._id;
        
        const data = await repository.update(req.body);
        
        if(!data){
            console.log("ad-controller: Atualizar Anúncio - Anuncio não encontrado ou não pertence a este Usuário");
            res.status(404).send({
                error: "Anuncio não encontrado ou não pertence a este Usuário."
            });

            return;
        }

        console.log("ad-controller: Atualizar Anúncio - Atualização finalizada");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = ad-controller: Atualizar Anúncio");
        res.status(500).send({
            error: error
        });
    }
};

exports.delete = async (req, res, next) => {
    console.log("ad-controller: Apagar Anúncio");
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dataToken = await authService.decodeToken(token);
        req.body.owner = dataToken._id;
        
        const data = await repository.delete(req.body);
        
        if(!data){
            console.log("ad-controller: Apagar Anúncio - Anuncio não encontrado ou não pertence a este Usuário");
            res.status(404).send({
                error: "Anuncio não encontrado ou não pertence a este Usuário."
            });

            return;
        }

        console.log("ad-controller: Apagar Anúncio - Anúncio Apagado");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = ad-controller: Apagar Anúncio");
        res.status(500).send({
            error: error
        });
    }
};
