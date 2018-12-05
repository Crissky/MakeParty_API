'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const CONSTANTS_REPOSITORIES = require('../constants/repositories');

exports.get = async (options) => {
    console.log("customer-repositories: get");
    console.log("OPÇÕES:", options);

    const res = await Customer
        .find({ active: true }, CONSTANTS_REPOSITORIES.CUSTOMER_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.USER_POPULATE)
        .setOptions(options);

    return res;
}

exports.getById = async (id) => {
    console.log("customer-repositories: getById");
    const res = await Customer
        .findById(id, CONSTANTS_REPOSITORIES.CUSTOMER_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.USER_POPULATE);

    return res;
}

exports.getByIdActive = async (id) => {
    console.log("customer-repositories: getByIdActive");
    const res = await Customer.findOne({
        _id: id,
        active: true
    }, CONSTANTS_REPOSITORIES.CUSTOMER_COLUMNS).populate(CONSTANTS_REPOSITORIES.USER_POPULATE);;

    return res;
}

exports.getByUserId = async (userId) => {
    console.log("customer-repositories: getByUserId");
    const res = await Customer.findOne({
        user: userId,
        active: true
    }, CONSTANTS_REPOSITORIES.CUSTOMER_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.USER_POPULATE);

    return res;
}

exports.create = async (data) => {
    console.log("customer-repositories: create");
    var user = new Customer(data);

    return await user.save();
}

exports.update = async (data) => {
    console.log("customer-repositories: update");

    return await Customer
        .findOneAndUpdate(
            {
                _id: data._id,
                user: data.user,
                active: true
            },
            {
                name: data.name,
                birthdate: data.birthdate,
                cpf: data.cpf,
                phone: data.phone,
                photo: data.photo
            },
            {
                runValidators: true,
                new: true,
                fields: CONSTANTS_REPOSITORIES.CUSTOMER_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.USER_POPULATE);
}

exports.delete = async (data) => {
    console.log("customer-repositories: delete");

    return await Customer
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
                fields: CONSTANTS_REPOSITORIES.CUSTOMER_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.USER_POPULATE);
}