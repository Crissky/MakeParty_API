'use strict';

const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');
const CONSTANTS_REPOSITORIES = require('../constants/repositories');

exports.get = async () => {
    console.log("rating-repositories: get");
    const res = await Rating
        .find({
            active: true
        }, CONSTANTS_REPOSITORIES.RATING_COLUMNS).populate(CONSTANTS_REPOSITORIES.AD_CUSTOMER_POPULATE);

    return res;
}

exports.getByAdAndCustomer = async (data) => {
    console.log("rating-repositories: getByAdAndCustomer");
    const res = await Rating.findOne({
        ad: data.ad,
        customer: data.customer,
        active: true
    }, CONSTANTS_REPOSITORIES.RATING_COLUMNS).populate(CONSTANTS_REPOSITORIES.AD_CUSTOMER_POPULATE);

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
                ad: data.ad,
                customer: data.customer,
                comment: comment,
                active: true
            },
            {
                rating: data.rating
            },
            {
                runValidators: true,
                new: true,
                fields: CONSTANTS_REPOSITORIES.RATING_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.AD_CUSTOMER_POPULATE);
}

exports.delete = async (data) => {
    console.log("rating-repositories: delete");

    return await Rating
        .findOneAndUpdate(
            {
                _id: data._id,
                ad: data.ad,
                customer: data.customer,
                active: true
            },
            {
                active: false
            },
            {
                runValidators: true,
                new: true,
                fields: CONSTANTS_REPOSITORIES.RATING_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.AD_CUSTOMER_POPULATE);
}