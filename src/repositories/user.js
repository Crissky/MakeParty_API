'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const RepositoriesValidator = require('../validators/repositories');

exports.get = async (query) => {
    console.log("user-repositories: get");
    var repositoriesValidator = new RepositoriesValidator();
    var options = repositoriesValidator.getQueryLimitAndSkip(query);
    console.log("OPÇÕES:", options);

    const res = await User.find({
        active: true
    }, 'email')
    .setOptions(options);

    return res;
}

exports.create = async (data) => {
    console.log("user-repositories: create");
    var user = new User(data);

    return await user.save();
}

exports.authenticate = async (data) => {
    console.log("user-repositories: authenticate");
    const res = await User.findOne({
        email: { $regex: new RegExp(data.email, "i") }, //RegExp for case insensitive
        password: data.password,
        active: true
    }).select('+password');
    return res;
}

exports.getById = async (id) => {
    console.log("user-repositories: getById");
    const res = await User.findById(id);
    return res;
}

exports.getByIdActive = async (id) => {
    console.log("user-repositories: getByIdActive");
    const res = await User.findOne({
        _id: id,
        active: true
    });

    return res;
}

exports.deleteRaw = async (id) => {
    console.log("user-repositories: deleteRaw");
    const res = await User.findByIdAndDelete({
        _id: id,
        active: true
    });

    return res;
}