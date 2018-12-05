'use strict';

const repository = require('../repositories/ad');
const advertiserRepository = require('../repositories/advertiser');
const ValidationFields = require('../validators/validator-fields');
const authService = require('../services/auth');
const QueriesValidator = require('../validators/queries');

exports.get = async (req, res, next) => {
    try {
        console.log("ad-controller: Listar Anúncios");
        var options = getQueryLimitAndSkip(req.query);
        var data = await repository.get(options);
        console.log("ad-controller: Listar Anúncios - Pesquisa finalizada");
        if (!data) {
            console.log("ad-controller: Listar Anúncios - Anúncio não encontrado");
            res.status(404).send({
                error: "Anúncio não encontrado."
            });

            return;
        }

        res.status(200).send({
            ads: data
        });
    } catch (error) {
        console.log("CATCH = ad-controller: Listar Anúncios\n", error);
        res.status(500).send({
            error: error
        });
    }
}

exports.getByQuery = async (req, res, next) => {
    try {
        console.log("ad-controller: Listar Anúncios pela query");
        var myQuery = choiceQuery(req.query);
        var options = getQueryLimitAndSkip(req.query);
        
        var data = await repository.getByQuery(myQuery, options);
        console.log("ad-controller: Listar Anúncios pela query - Pesquisa finalizada");

        if (!data) {
            console.log("ad-controller: Listar Anúncios pela query - Anúncio não encontrado");
            res.status(404).send({
                error: "Anúncio não encontrado."
            });

            return;
        }

        res.status(200).send({
            ads: data
        });
    } catch (error) {
        console.log("CATCH = ad-controller: Listar Anúncios pela query\n", error);
        res.status(500).send({
            error: error
        });
    }
}

exports.getByTag = async (req, res, next) => {
    console.log("ad-controller: Pesquisar Anúncios pela TAG");
    try {
        var options = getQueryLimitAndSkip(req.query);
        var data = await repository.getByTag(req.params.tag, options);
        console.log("ad-controller: Pesquisar Anúncios pela TAG - Pesquisa finalizada");

        if (!data) {
            console.log("ad-controller: Listar Anúncios pela TAG - Anúncio não encontrado");
            res.status(404).send({
                error: "Anúncio não encontrado."
            });

            return;
        }

        res.status(200).send({
            ads: data
        });
    } catch (error) {
        console.log("CATCH = ad-controller: Pesquisar Anúncios pela TAG");
        res.status(500).send({
            error: error
        });
    }
}

exports.getByType = async (req, res, next) => {
    console.log("ad-controller: Pesquisar Anúncios pelo Tipo");
    try {
        var options = getQueryLimitAndSkip(req.query);
        var data = await repository.getByType(req.params.type, options);
        console.log("ad-controller: Pesquisar Anúncios pelo Tipo - Pesquisa finalizada");

        if (!data) {
            console.log("ad-controller: Listar Anúncios pelo Tipo - Anúncio não encontrado");
            res.status(404).send({
                error: "Anúncio não encontrado."
            });

            return;
        }

        res.status(200).send({
            ads: data
        });
    } catch (error) {
        console.log("CATCH = ad-controller: Pesquisar Anúncios pelo Tipo");
        res.status(500).send({
            error: error
        });
    }
}

exports.getByTitle = async (req, res, next) => {
    console.log("ad-controller: Pesquisar Anúncios pelo Título");
    try {
        var options = getQueryLimitAndSkip(req.query);
        var data = await repository.getByTitle(req.params.title, options);
        console.log("ad-controller: Pesquisar Anúncios pelo Título - Pesquisa finalizada");
        if (!data) {
            console.log("ad-controller: Listar Anúncios pelo Título - Anúncio não encontrado");
            res.status(404).send({
                error: "Anúncio não encontrado."
            });

            return;
        }

        res.status(200).send({
            ads: data
        });
    } catch (error) {
        console.log("CATCH = ad-controller: Pesquisar Anúncios pelo Título");
        res.status(500).send({
            error: error
        });
    }
}

exports.getByPrice = async (req, res, next) => {
    console.log("ad-controller: Pesquisar Anúncios pelo Preço");

    try {
        const arrayPrice = getArrayPrice(req.params.price);

        if (!arrayPrice) {
            console.log("ERROR = ad-controller: Pesquisar Anúncios pelo Preço - Preço não está no formato correto (100-550)");
            res.status(400).send({
                error: "O parametro preço deve estar no formato de 100-500, O primeiro valor deve ser igual ou menor que o segundo ou o segundo tem que ser zero.",
                value: arrayPrice
            }).end();

            return;
        }

        var priceArgs = getPriceArgs(arrayPrice);
        var options = getQueryLimitAndSkip(req.query);
        var data = await repository.getByPrice(priceArgs, options);
        console.log("ad-controller: Pesquisar Anúncios pelo Preço - Pesquisa finalizada");
        if (!data) {
            console.log("ad-controller: Listar Anúncios pelo Preço - Anúncio não encontrado");
            res.status(404).send({
                error: "Anúncio não encontrado."
            });

            return;
        }

        res.status(200).send({
            ads: data
        });
    } catch (error) {
        console.log("CATCH = ad-controller: Pesquisar Anúncios pelo Preço");
        res.status(500).send({
            error: error
        });
    }
}

exports.getByOwnerId = async (req, res, next) => {
    console.log("ad-controller: Pesquisar Anúncios pelo ID do Anunciante");

    try {
        var dataToken = await authService.decodeTokenREQ(req);
    } catch (error) {
        console.log("ad-controller: Pesquisar Anúncios pelo ID do Anunciante - Token não fornecido");
        var dataToken = undefined;
    }

    try {

        if (!req.body.owner && req.params.owner) {
            console.log("ad-controller: Pesquisar Anúncios pelo ID do Anunciante - IF");
            req.body.owner = req.params.owner;
        } else if (dataToken) {
            console.log("ad-controller: Pesquisar Anúncios pelo ID do Anunciante - ELSE IF");
            req.body.owner = dataToken._id;
        }

        var options = getQueryLimitAndSkip(req.query);
        var data = await repository.getByOwnerId(req.body.owner, options);
        console.log("ad-controller: Pesquisar Anúncios pelo ID do Anunciante - Pesquisa finalizada");
        if (!data) {
            console.log("ad-controller: Pesquisar Anúncios pelo ID do Anunciante - Anúncio não encontrado");
            res.status(404).send({
                error: "Anúncio não encontrado."
            });

            return;
        }

        res.status(200).send({
            ads: data
        });
    } catch (error) {
        console.log("CATCH = ad-controller: Pesquisar Anúncios pelo ID do Anunciante");
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
        if (!data) {
            console.log("ad-controller: Listar Anúncios pelo ID - Anúncio não encontrado");
            res.status(404).send({
                error: "Anúncio não encontrado."
            });

            return;
        }

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
        console.log("ERROR = ad-controller: Cadastrar Anúncio - Título muito curto\n", contract.errors());
        res.status(400).send({
            error: contract.errors()
        }).end();

        return;
    }

    try {
        const dataToken = await authService.decodeTokenREQ(req);
        const owner = await advertiserRepository.getByIdActive(dataToken._id);
        console.log("ad-controller: Cadastrar Anúncio - Pesquisa dono finalizada");
        req.body.owner = dataToken._id;

        if (!owner) {
            console.log("Usuário não autorizado ou desativado");
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
        console.log("ERROR = ad-controller: Cadastrar Anúncio - Título muito curto\n", contract.errors());
        res.status(400).send({
            error: contract.errors()
        }).end();

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

function choiceQuery(query) {
    console.log("ad-controller: inner function = choiceQuery");
    var myQuery = { active: true }

    if (query.tags) {
        myQuery.tags = { $regex: new RegExp(query.tags, "i") };
    }

    if (query.type) {
        myQuery.type = { $regex: new RegExp(query.type, "i") };
    }

    if (query.title) {
        myQuery.title = { $regex: new RegExp(query.title, "i") };
    }

    if (query.price) {
        myQuery.price = getArrayPrice(query.price);
        myQuery.price = getPriceArgs(myQuery.price);
    }

    if (query.owner) {
        myQuery.owner = query.owner;
    }

    return myQuery;
}

function getArrayPrice(price) {
    console.log("ad-controller: inner function = getArrayPrice");
    const regexp = /^(\d+)\-(\d+)/;

    if (!regexp.test(price)) {
        return undefined;
    }

    var arrayPrice = price.split("-").map(Number);

    if (arrayPrice[0] > arrayPrice[1] && arrayPrice[1] != 0) {
        return undefined;
    }

    console.log("ad-controller: inner function = getArrayPrice - Price", arrayPrice);
    return arrayPrice;
}

function getQueryLimitAndSkip(query) {
    console.log("ad-controller: inner function = getQueryLimitAndSkip");
    const queriesValidator = new QueriesValidator();

    return queriesValidator.getQueryLimitAndSkip(query);

}

function getPriceArgs(price) {
    console.log("ad-controller: inner function = getPriceArgs");
    const queriesValidator = new QueriesValidator();

    return queriesValidator.getPriceArgs(price);

}
