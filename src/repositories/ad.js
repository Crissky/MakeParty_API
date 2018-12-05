'use strict';

const mongoose = require('mongoose');
const Ad = mongoose.model('Ad');
const CONSTANTS_REPOSITORIES = require('../constants/repositories');

exports.get = async (options) => {
    console.log("ad-repositories: get");
    console.log("OPÇÕES: ", options);

    const res = await Ad
        .find({
            active: true
        }, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort({ createdAt: -1 })
        .setOptions(options);

    return res;
}

exports.getByQuery = async (query, options) => {
    console.log("ad-repositories: getByQuery");
    console.log("OPÇÕES: ", options);
    console.log("QUERY:", query);

    const res = await Ad
        .find(query, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort({ createdAt: -1 })
        .setOptions(options);

    return res;
}

exports.getByPrice = async (priceArgs, options) => {
    console.log("ad-repositories: getByPrice");
    console.log("OPÇÕES: ", options);

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

exports.getByTag = async (tag, options) => {
    console.log("ad-repositories: getByTag");
    console.log("OPÇÕES: ", options);

    const res = await Ad
        .find({
            tags: { $regex: new RegExp(tag, "i") },
            active: true
        }, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort({ createdAt: -1 })
        .setOptions(options);

    return res;
}

exports.getByType = async (type, options) => {
    console.log("ad-repositories: getByType");
    console.log("OPÇÕES: ", options);

    const res = await Ad
        .find({
            type: { $regex: new RegExp(type, "i") },
            active: true
        }, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort({ createdAt: -1 })
        .setOptions(options);

    return res;
}

exports.getByTitle = async (title, options) => {
    console.log("ad-repositories: getAllByTitle");
    console.log("OPÇÕES: ", options);

    const res = await Ad
        .find({
            title: { $regex: new RegExp(title, "i") },
            active: true
        }, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort({ createdAt: -1 })
        .setOptions(options);

    return res;
}

exports.getByOwnerId = async (owner, options) => {
    console.log("ad-repositories: getByOwnerId");
    console.log("OPÇÕES: ", options);

    const res = await Ad
        .find({
            owner: owner,
            active: true
        }, CONSTANTS_REPOSITORIES.AD_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.OWNER_POPULATE)
        .sort({ createdAt: -1 })
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
