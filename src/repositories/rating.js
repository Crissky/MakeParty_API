'use strict';

const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');

const COLUMNS = 'customer ad rating createdAt updatedAt active';
const CUSTOMER_COLUMNS = 'active user name cpf birthdate photo phone createdAt updatedAt';

exports.get = async () => {
    console.log("rating-repositories: get");
    const res = await Rating
        .find({
            active: true
        }, COLUMNS).populate('customer', CUSTOMER_COLUMNS);
    return res;
}

exports.getById = async (id) => {
    console.log("rating-repositories: getById");
    const res = await Rating.findById(id, COLUMNS).populate('customer', CUSTOMER_COLUMNS);

    return res;
}

exports.create = async (data) => {
    console.log("rating-repositories: create");
    var ad = new Rating(data);

    return await ad.save();
}

exports.update = async (data) => {
    console.log("rating-repositories: update");

    return await Rating
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
                mainphoto: data.mainphoto,
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
            }).populate('customer', CUSTOMER_COLUMNS);
}

exports.delete = async (data) => {
    console.log("rating-repositories: delete");

    return await Rating
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
            }).populate('customer', CUSTOMER_COLUMNS);
}