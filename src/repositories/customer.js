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
    const res = await Customer.findById(id, COLUMNS).populate('owner', 'email');

    return res;
}

exports.create = async (data) => {
    console.log("customer-repositories: create");
    var user = new Customer(data);

    return await user.save();
}
