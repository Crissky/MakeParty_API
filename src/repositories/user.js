'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.get = async (options) => {
    console.log("user-repositories: get");
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