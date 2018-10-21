'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

const COLUMNS = 'active user name cpf birthdate photo phone createdAt updatedAt';

exports.get = async () => {
    console.log("customer-repositories: get");
    const res = await Customer.find({active:true}, COLUMNS).populate('user', 'email');
   
    return res;
}

exports.getById = async (id) => {
    console.log("customer-repositories: getById");
    const res = await Customer.findById(id, COLUMNS).populate('user', 'email');

    return res;
}

exports.getByUserId = async (userId) => {
    console.log("customer-repositories: getByUserId");
    const res = await Customer.findOne({
        user: userId,
        active: true
    }, COLUMNS).populate('user', 'email');

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
                fields: COLUMNS
            }).populate('user', 'email');
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
                fields: COLUMNS
            }).populate('user', 'email');
}