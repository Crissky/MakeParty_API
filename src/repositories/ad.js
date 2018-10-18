'use strict';

const mongoose = require('mongoose');
const Ad = mongoose.model('Ad');

exports.get = async () => {
    console.log("ad-repositories: get");
    const res = await Ad
        .find({
            active: true
        }, 'owner title description price tags createdAt updatedAt active').populate('owner', 'name email');
    return res;
}

exports.getByTag = async (tag) => {
    console.log("ad-repositories: getByTag");
    const res = await Ad
        .find({
            tags: tag,
            active: true
        }, 'owner title description price tags createdAt updatedAt active').populate('owner', 'name email');
    return res;
}

exports.getById = async (id) => {
    console.log("ad-repositories: getById");
    const res = await Ad.findById(id, 'owner title description price tags createAt').populate('owner', 'name email');

    return res;
}

exports.create = async (data) => {
    console.log("ad-repositories: create");
    var ad = new Ad();
    if (data.owner) {
        ad.owner = data.owner;
    }
    if (data.title) {
        ad.title = data.title;
    }
    if (data.description) {
        ad.description = data.description;
    }
    if (data.price) {
        ad.price = data.price;
    }
    ad.tags = data.tags;

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
                tags: data.tags
            },
            {
                runValidators: true,
                new: true,
                fields: 'owner title description price tags createdAt updatedAt active'
            });
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
                fields: 'owner title description price tags createdAt updatedAt active'
            });
}