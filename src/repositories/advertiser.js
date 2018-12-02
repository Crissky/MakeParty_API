'use strict';

const mongoose = require('mongoose');
const Advertiser = mongoose.model('Advertiser');
const CONSTANTS_REPOSITORIES = require('../constants/repositories');

exports.get = async () => {
    console.log("advertiser-repositories: get");
    const res = await Advertiser
        .find({ active: true }, CONSTANTS_REPOSITORIES.ADVERTISER_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.USER_POPULATE);

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
        });

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
