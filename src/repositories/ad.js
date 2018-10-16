'use strict';

const mongoose = require('mongoose');
const Ad = mongoose.model('Ad');

exports.get = async () => {
    console.log("ad-repositories: get");
    const res = await Ad
        .find({
            active: true
        }, 'owner title description price tags createAt').populate('owner', 'name email');
    return res;
}

exports.getByTag = async (tag) => {
    console.log("ad-repositories: getByTag");
    const res = await Ad
        .find({
            tags: tag,
            active: true
        }, 'owner title description price tags createAt').populate('owner', 'name email');
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

    await Ad
        .findByIdAndUpdate(data._id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                tags: data.tags
            }
        });

    return this.getById(data._id);
}

exports.delete = async (id) => {
    console.log("ad-repositories: delete");

    await Ad
        .findByIdAndUpdate(id, {
            $set: {
                active: false
            }
        });

    return this.getById(id);
}