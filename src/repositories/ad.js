'use strict';

const mongoose = require('mongoose');
const Ad = mongoose.model('Ad');
const CONSTANTS_REPOSITORIES = require('../constants/repositories');
const RepositoriesValidator = require('../validators/repositories');

exports.get = async (query) => {
    console.log("ad-repositories: get");
    var options = getQueryLimitAndSkip(query);
    console.log("OPÇÕES:", options);

    const res = await Ad
        .find({
            active: true
        }, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort('-createdAt')
        .setOptions(options);

    return res;
}

exports.getByQuery = async (query) => {
    console.log("ad-repositories: getByQuery");
    var options = getQueryLimitAndSkip(query);
    //Tirando o limit e o page da query
    query.limit = query.page = undefined;

    if (query.price) {
        query.price = getPriceArgs(query.price);
    }

    console.log("OPÇÕES:", options);
    console.log("QUERY:", query);

    const res = await Ad
        .find(query, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort('-createdAt')
        .setOptions(options);

    return res;
}

exports.getByPrice = async (arrayPrice, query) => {
    console.log("ad-repositories: getByPrice");
    var priceArgs = getPriceArgs(arrayPrice);
    var options = getQueryLimitAndSkip(query);
    console.log("OPÇÕES:", options);

    const res = await Ad
        .find({
            price: priceArgs,
            active: true
        }, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .sort('price')
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .setOptions(options);

    return res;
}

exports.getByTag = async (tag, query) => {
    console.log("ad-repositories: getByTag");
    var options = getQueryLimitAndSkip(query);
    console.log("OPÇÕES:", options);

    const res = await Ad
        .find({
            tags: { $regex: new RegExp(tag, "i") },
            active: true
        }, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort('-createdAt')
        .setOptions(options);

    return res;
}

exports.getByType = async (type, query) => {
    console.log("ad-repositories: getByType");
    var options = getQueryLimitAndSkip(query);
    console.log("OPÇÕES:", options);

    const res = await Ad
        .find({
            type: { $regex: new RegExp(type, "i") },
            active: true
        }, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort('-createdAt')
        .setOptions(options);

    return res;
}

exports.getByTitle = async (title, query) => {
    console.log("ad-repositories: getAllByTitle");
    var options = getQueryLimitAndSkip(query);
    console.log("OPÇÕES:", options);

    const res = await Ad
        .find({
            title: { $regex: new RegExp(title, "i") },
            active: true
        }, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort('-createdAt')
        .setOptions(options);

    return res;
}

exports.getByOwnerId = async (owner, query) => {
    console.log("ad-repositories: getByOwnerId");
    var options = getQueryLimitAndSkip(query);
    console.log("OPÇÕES:", options);

    const res = await Ad
        .find({
            owner: owner,
            active: true
        }, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort('-createdAt')
        .setOptions(options);

    return res;
}

exports.getById = async (id) => {
    console.log("ad-repositories: getById");
    const res = await Ad
        .findById(id, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE);

    return res;
}

exports.getByIdActive = async (id) => {
    console.log("ad-repositories: getByIdActive");
    const res = await Ad
        .findOne({
            _id: id,
            active: true
        }).populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE);

    return res;
}

exports.create = async (data) => {
    console.log("ad-repositories: create");
    var ad = new Ad(data);

    return await ad.save();
}

exports.update = async (data) => {
    console.log("ad-repositories: update");

    return await Ad
        .findOneAndUpdate(
            {
                _id: data._id,
                owner: data.owner,
                active: true
            },
            {
                title: data.title,
                description: data.description,
                price: data.price,
                tags: data.tags,
                type: data.type,
                phone: data.phone,
                mainphoto: data.mainphoto,
                photos: data.photos,
                address: {
                    street: data.address.street,
                    number: data.address.number,
                    neighborhood: data.address.neighborhood,
                    city: data.address.city,
                    zipcode: data.address.zipcode,
                    state: data.address.state
                }
            },
            {
                runValidators: true,
                new: true,
                fields: CONSTANTS_REPOSITORIES.AD_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE);
}

exports.delete = async (data) => {
    console.log("ad-repositories: delete");

    return await Ad
        .findOneAndUpdate(
            {
                _id: data._id,
                owner: data.owner,
                active: true
            },
            {
                active: false
            },
            {
                runValidators: true,
                new: true,
                fields: CONSTANTS_REPOSITORIES.AD_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE);
}

function getQueryLimitAndSkip(query) {
    const repositoriesValidator = new RepositoriesValidator();

    return repositoriesValidator.getQueryLimitAndSkip(query);

}

function getPriceArgs(price) {
    const repositoriesValidator = new RepositoriesValidator();

    return repositoriesValidator.getPriceArgs(price);

}

