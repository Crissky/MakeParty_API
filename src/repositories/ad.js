'use strict';

const mongoose = require('mongoose');
const Ad = mongoose.model('Ad');

const COLUMNS = 'owner title description price type phone tags photos createdAt updatedAt active address';
const OWNER_COLUMNS = 'active user socialname cnpj authorization photo createdAt updatedAt';

exports.get = async () => {
    console.log("ad-repositories: get");
    const res = await Ad
        .find({
            active: true
        }, COLUMNS).populate('owner', OWNER_COLUMNS);
    return res;
}

exports.getByTag = async (tag) => {
    console.log("ad-repositories: getByTag");
    const res = await Ad
        .find({
            tags: { $regex : new RegExp(tag, "i") },
            active: true
        }, COLUMNS).populate('owner', OWNER_COLUMNS);
    return res;
}

exports.getByType = async (type) => {
    console.log("ad-repositories: getByType");
    const res = await Ad
        .find({
            type: { $regex : new RegExp(type, "i") },
            active: true
        }, COLUMNS).populate('owner', OWNER_COLUMNS);
    return res;
}

exports.getById = async (id) => {
    console.log("ad-repositories: getById");
    const res = await Ad.findById(id, COLUMNS).populate('owner', OWNER_COLUMNS);

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
                fields: COLUMNS
            }).populate('owner', OWNER_COLUMNS);
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
                fields: COLUMNS
            }).populate('owner', OWNER_COLUMNS);
}