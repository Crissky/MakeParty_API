'use strict';

const mongoose = require('mongoose');
const WishList = mongoose.model('WishList');

const COLUMNS = 'owner ad createdAt updatedAt active';
const AD_COLUMNS = 'owner title description price type phone tags mainphoto photos createdAt updatedAt active address';

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

exports.delete = async (data) => {
    console.log("wishlist-repositories: delete");

    return await WishList
        .findOneAndDelete(
            {
                ad: data.ad,
                owner: data.owner,
                active: true
            }).populate('ad', AD_COLUMNS);
}