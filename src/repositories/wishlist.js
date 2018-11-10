'use strict';

const mongoose = require('mongoose');
const WishList = mongoose.model('WishList');

const COLUMNS = 'owner ad createdAt updatedAt active';
const AD_COLUMNS = 'owner title description price type phone tags mainphoto photos createdAt updatedAt active address';
const OWNER_COLUMNS = 'active user socialname cnpj authorization photo createdAt updatedAt';

exports.getByOwnerId = async (id) => {
    console.log("wishlist-repositories: getById");
    const res = await WishList.find({
        owner: id,
        active: true
    }, COLUMNS).populate('ad', AD_COLUMNS);

    return res;
}

exports.create = async (data) => {
    console.log("ad-repositories: create");
    var wishlist = new WishList(data);
    
    return await wishlist.save();
}

exports.update = async (data) => {
    console.log("wishlist-repositories: update");

    return await WishList
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
            }).populate('owner', OWNER_COLUMNS);
}

exports.delete = async (data) => {
    console.log("wishlist-repositories: delete");

    return await WishList
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