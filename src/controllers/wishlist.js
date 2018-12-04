'use strict';

const repository = require('../repositories/wishlist');
const customerRepository = require('../repositories/customer');
const ValidationFields = require('../validators/validator-fields');
const authService = require('../services/auth');

exports.get = async (req, res, next) => {
    console.log("wishlist-controller: Pesquisar Lista de Desejo pelo TOKEN");
    try {
        const dataToken = await authService.decodeTokenREQ(req);

        var data = await repository.getByCustomerId(dataToken._id, req.query);
        console.log("wishlist-controller: Pesquisar Lista de Desejo pelo TOKEN - Pesquisa finalizada");
        if (!data) {
            console.log("wishlist-controller: Pesquisar Lista de Desejo pelo TOKEN - Lista de Desejo não encontrada");
            res.status(404).send({
                error: "Lista de Desejo não encontrada."
            });

            return;
        }

        res.status(200).send({
            wishlists: data
        });
    } catch (error) {
        console.log("CATCH = wishlist-controller: Lista de Desejo Anúncio pelo TOKEN");
        res.status(500).send({
            error: error
        });
    }
}

exports.post = async (req, res, next) => {
    console.log("wishlist-controller: Cadastrar Anúncio na Lista de Desejo");
    
    if (!req.body.ad) {
        console.log("ERROR = wishlist-controller: ID do Anúncio não informado\n");
        res.status(400).send({error:"ID do Anúncio é obrigatório."});

        return;
    }
    
    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const customer = await customerRepository.getByIdActive(dataToken._id);
        req.body.customer = dataToken._id;
        
        if(!customer){
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado"
            });
            return;
        }

        const data = await repository.create(req.body);
        data.__v = undefined;

        console.log("wishlist-controller: Cadastrar Anúncio na Lista de Desejo - Anúncio Cadastrado");
        
        res.status(201).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = wishlist-controller: Cadastrar Anúncio na Lista de Desejo\n", error);
        res.status(500).send({
            error: error
        });
    }

};

exports.delete = async (req, res, next) => {
    console.log("wishlist-controller: Apagar Anúncio da Lista de Desejo");
    if (!req.body.ad) {
        console.log("ERROR = wishlist-controller: ID do Anúncio não informado\n");
        res.status(400).send({error:"ID do Anúncio é obrigatório."});

        return;
    }
    
    try {
        const dataToken = await authService.decodeTokenREQ(req);
        req.body.customer = dataToken._id;
        
        const data = await repository.delete(req.body);
        
        if(!data){
            console.log("wishlist-controller: Apagar Anúncio da Lista de Desejo - Anuncio não encontrado ou não pertence a este Usuário");
            res.status(404).send({
                error: "Anuncio não encontrado ou não pertence a este Usuário."
            });

            return;
        }

        console.log("wishlist-controller: Apagar Anúncio da Lista de Desejo - Anúncio Apagado da Lista de Desejo");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = wishlist-controller: Apagar Anúncio da Lista de Desejo");
        res.status(500).send({
            error: error
        });
    }
};
