'use strict';

const mongoose = require('mongoose');
const Advertiser = mongoose.model('Advertiser');
const CONSTANTS_REPOSITORIES = require('../constants/repositories');
const RepositoriesValidator = require('../validators/repositories');

exports.get = async (query) => {
    console.log("advertiser-repositories: get");
    var repositoriesValidator = new RepositoriesValidator();
    var options = repositoriesValidator.getQueryLimitAndSkip(query);
    console.log("OPÇÕES:", options);

    const res = await Advertiser
        .find({ active: true }, CONSTANTS_REPOSITORIES.ADVERTISER_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.USER_POPULATE)
        .setOptions(options);

    return res;
}

exports.getById = async (id) => {
    console.log("advertiser-repositories: getById");
    const res = await Advertiser
        .findById(id, CONSTANTS_REPOSITORIES.ADVERTISER_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.USER_POPULATE);

    return res;
}

exports.getByIdActive = async (id) => {
    console.log("advertiser-repositories: getByIdActive");
    const res = await Advertiser
        .findOne({
            _id: id,
            active: true
        }, CONSTANTS_REPOSITORIES.ADVERTISER_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.USER_POPULATE);

    return res;
}

exports.getByUserId = async (userId) => {
    console.log("advertiser-repositories: getByUserId");
    const res = await Advertiser
        .findOne({
            user: userId,
            active: true
        }, CONSTANTS_REPOSITORIES.ADVERTISER_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.USER_POPULATE);

    return res;
}

exports.create = async (data) => {
    console.log("advertiser-repositories: create");
    var user = new Advertiser(data);

    return await user.save();
}

exports.update = async (data) => {
    console.log("advertiser-repositories: update");

    return await Advertiser
        .findOneAndUpdate(
            {
                _id: data._id,
                user: data.user,
                active: true
            },
            {
                socialname: data.socialname,
                cnpj: data.cnpj,
                authorization: data.authorization,
                plan: data.plan,
                photo: data.photo
            },
            {
                runValidators: true,
                new: true,
                fields: CONSTANTS_REPOSITORIES.ADVERTISER_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.USER_POPULATE);
}

exports.delete = async (data) => {
    console.log("advertiser-repositories: delete");

    return await Advertiser
        .findOneAndUpdate(
            {
                _id: data._id,
                user: data.user,
                active: true
            },
            {
                active: false
            },
            {
                runValidators: true,
                new: true,
                fields: CONSTANTS_REPOSITORIES.ADVERTISER_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.USER_POPULATE);
}
