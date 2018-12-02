'use strict';

const mongoose = require('mongoose');
const WishList = mongoose.model('WishList');
const CONSTANTS_REPOSITORIES = require('../constants/repositories');

exports.getByCustomerId = async (id) => {
    console.log("wishlist-repositories: getByCustomerId");
    const res = await WishList.find({
        customer: id,
        active: true
    }, CONSTANTS_REPOSITORIES.WISHLIST_COLUMNS).populate(CONSTANTS_REPOSITORIES.AD_CUSTOMER_POPULATE);

    return res;
}

exports.create = async (data) => {
    console.log("wishlist-repositories-repositories: create");
    var wishlist = new WishList(data);

    return await wishlist.save();
}

exports.delete = async (data) => {
    console.log("wishlist-repositories: delete");

    return await WishList
        .findOneAndDelete(
            {
                ad: data.ad,
                customer: data.customer,
                active: true
            }).populate(CONSTANTS_REPOSITORIES.AD_CUSTOMER_POPULATE);
}