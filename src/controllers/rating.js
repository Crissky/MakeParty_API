'use strict';

const repository = require('../repositories/rating');
const customerRepository = require('../repositories/customer');
const ValidationFields = require('../validators/validator-fields');
const authService = require('../services/auth');
const MIN = 0;
const MAX = 5;

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
    console.log("rating-controller: Cadastrar Avaliação de Anúncio");

    if (!isRating(req.body.rating)) {
        console.log("ERROR = rating-controller: campo 'rating' não informado ou incorreto\n");
        res.status(400).send({ error: "Campo 'rating' não informado ou está incorreto. rating deve ser um valor entre (" + MIN + " e " + MAX + ")" }).end();

        return;
    }

    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const customer = await customerRepository.getByIdActive(dataToken._id);
        req.body.customer = dataToken._id;

        if (!customer) {
            console.log("Usuário não autorizado ou desativado");
            res.status(401).send({
                error: "Usuário não autorizado ou desativado"
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

        if (!data) {
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

        if (!data) {
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

function isRating(rating) {
    return (rating <= MAX && rating >= MIN && Number.isFinite(rating));
}