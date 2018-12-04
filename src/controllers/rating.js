'use strict';

const repository = require('../repositories/rating');
const customerRepository = require('../repositories/customer');
const adRepository = require("../repositories/ad")
const authService = require('../services/auth');
const MIN = 0;
const MAX = 5;

exports.get = async (req, res, next) => {
    try {
        console.log("rating-controller: Listar Avaliação de Anúncios");

        var data = await repository.get();
        console.log("rating-controller: Listar Avaliação de Anúncios - Pesquisa Finalizada");

        res.status(200).send({
            ratings: data
        });
    } catch (error) {
        console.log("CATCH = rating-controller: Listar Avaliação de Anúncios\n", error);
        res.status(500).send({
            error: error
        });
    }
}

exports.getByAdAndCustomer = async (req, res, next) => {
    console.log("rating-controller: Pesquisar Avaliação pelo ID do Anúncio e Cliente");
    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const customer = await customerRepository.getByIdActive(dataToken._id);
        req.body.customer = dataToken._id;
        req.body.ad = req.params.ad;
        
        if (!customer) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado."
            });
            return;
        }

        const ad = await adRepository.getByIdActive(req.body.ad);

        if (!ad) {
            console.log("Anúncio desativado ou não existe");
            res.status(401).send({
                error: "Avaliação não encontrada ou não pertence a este Usuário."
            });
            return;
        }

        var data = await repository.getByAdAndCustomer(req.body);

        if (!data) {
            console.log("rating-controller: Pesquisar Avaliação pelo ID do Anúncio e Cliente - Avaliação não encontrada ou não pertence a este Usuário");
            res.status(404).send({
                error: "Avaliação não encontrada."
            });

            return;
        }

        console.log("rating-controller: Pesquisar Avaliação pelo ID do Anúncio e Cliente - Pesquisa finalizada");
        res.status(200).send({
            ratings: data
        });
    } catch (error) {
        console.log("CATCH = rating-controller: Pesquisar Avaliação pelo ID do Anúncio e Cliente");
        res.status(500).send({
            error: error
        });
    }
}

exports.post = async (req, res, next) => {
    console.log("rating-controller: Cadastrar Avaliação de Anúncio");

    if (!isRating(req.body.rating)) {
        console.log("ERROR = rating-controller: campo 'rating' não informado ou incorreto\n");
        res.status(400).send({ error: "Campo 'rating' não informado ou está incorreto. rating deve ter um valor entre (" + MIN + " e " + MAX + ")" }).end();

        return;
    }

    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const customer = await customerRepository.getByIdActive(dataToken._id);
        req.body.customer = dataToken._id;

        if (!customer) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado."
            });
            return;
        }

        const ad = await adRepository.getByIdActive(req.body.ad);

        if (!ad) {
            console.log("Anúncio desativado ou não existe");
            res.status(401).send({
                error: "Anúncio desativado ou não existe."
            });
            return;
        }

        const data = await repository.create(req.body);
        data.__v = undefined;

        console.log("rating-controller: Cadastrar Avaliação de Anúncio - Avaliação Cadastrada");

        res.status(201).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = rating-controller: Cadastrar Avaliação de Anúncio\n", error);
        res.status(500).send({
            error: error
        });
    }

};

exports.put = async (req, res, next) => {
    console.log("rating-controller: Atualizar Avaliação de Anúncio");
    
    if (!isRating(req.body.rating)) {
        console.log("ERROR = rating-controller: campo 'rating' não informado ou incorreto\n");
        res.status(400).send({ error: "Campo 'rating' não informado ou está incorreto. rating deve ter um valor entre (" + MIN + " e " + MAX + ")." }).end();

        return;
    }

    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const customer = await customerRepository.getByIdActive(dataToken._id);
        req.body.customer = dataToken._id;

        if (!customer) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado."
            });
            return;
        }

        const ad = await adRepository.getByIdActive(req.body.ad);

        if (!ad) {
            console.log("Anúncio desativado ou não existe");
            res.status(401).send({
                error: "Anúncio desativado ou não existe."
            });
            return;
        }

        const data = await repository.update(req.body);

        if (!data) {
            console.log("rating-controller: Atualizar Avaliação de Anúncio - Avaliação não encontrada ou não pertence a este Usuário");
            res.status(404).send({
                error: "Avaliação não encontrada."
            });

            return;
        }

        console.log("rating-controller: Atualizar Avaliação de Anúncio - Atualização finalizada");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = rating-controller: Atualizar Avaliação de Anúncio");
        res.status(500).send({
            error: error
        });
    }
};

exports.delete = async (req, res, next) => {
    console.log("rating-controller: Apagar Avaliação do Anúncio");
    
    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const customer = await customerRepository.getByIdActive(dataToken._id);
        req.body.customer = dataToken._id;

        if (!customer) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado."
            });
            return;
        }

        const ad = await adRepository.getByIdActive(req.body.ad);

        if (!ad) {
            console.log("Anúncio desativado ou não existe");
            res.status(401).send({
                error: "Anúncio desativado ou não existe."
            });
            return;
        }

        const data = await repository.delete(req.body);

        if (!data) {
            console.log("rating-controller: Apagar Avaliação do Anúncio - Avaliação não encontrada ou não pertence a este Usuário");
            res.status(404).send({
                error: "Avaliação não encontrada ou não pertence a este Usuário."
            });

            return;
        }

        console.log("rating-controller: Apagar Avaliação do Anúncio - Anúncio Apagado");
        res.status(200).send({
            data: data
        });
    } catch (error) {
        console.log("CATCH = rating-controller: Apagar Avaliação do Anúncio");
        res.status(500).send({
            error: error
        });
    }
};

function isRating(rating) {
    console.log("rating-controller: inner function = isRating")
    return (rating <= MAX && rating >= MIN && Number.isFinite(rating));
}