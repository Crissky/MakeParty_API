'use strict';

const mongoose = require('mongoose');
const Advertiser = mongoose.model('Advertiser');

const COLUMNS = 'active user socialname cnpj authorization photo createdAt updatedAt';

exports.get = async () => {
    console.log("advertiser-repositories: get");
    const res = await Advertiser.find({active:true}, COLUMNS).populate('user', 'email');
    
    return res;
}

exports.getById = async (id) => {
    console.log("advertiser-repositories: getById");
    const res = await Advertiser.findById(id, COLUMNS).populate('owner', 'email');

    return res;
}

exports.create = async (data) => {
    console.log("advertiser-repositories: create");
    var user = new Advertiser(data);

    return await user.save();
}
