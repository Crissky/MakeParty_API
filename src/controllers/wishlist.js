'use strict';

const repository = require('../repositories/wishlist');
const customerRepository = require('../repositories/customer');
const ValidationFields = require('../validators/validator-fields');
const authService = require('../services/auth');

exports.get = async (req, res, next) => {
    console.log("wishlist-controller: Pesquisar Lista de Desejo pelo TOKEN");
    try {
        const dataToken = await authService.decodeTokenREQ(req);

        var data = await repository.getByOwnerId(dataToken._id);
        console.log("wishlist-controller: Pesquisar Lista de Desejo pelo TOKEN - Pesquisa finalizada");
        res.status(200).send(data);
    } catch (error) {
        console.log("CATCH = wishlist-controller: Lista de Desejo Anúncio pelo TOKEN");
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
        const dataToken = await authService.decodeTokenREQ(req);
        const owner = await customerRepository.getByIdActive(dataToken._id);
        req.body.owner = dataToken._id;
        
        if(!owner){
            res.status(401).send({
                error: "Usuário não autorizado ou desativado"
            });
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
        const dataToken = await authService.decodeTokenREQ(req);
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
        const dataToken = await authService.decodeTokenREQ(req);
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
