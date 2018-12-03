'use strict';

const mongoose = require('mongoose');
const Notification = mongoose.model('Notification');
const CONSTANTS_REPOSITORIES = require('../constants/repositories');

exports.getByUserIdActive = async () => {
    console.log("notification-repositories: get");
    const res = await Notification
        .find({
            active: true
        }, CONSTANTS_REPOSITORIES.RATING_COLUMNS).populate(CONSTANTS_REPOSITORIES.AD_CUSTOMER_POPULATE);

    return res;
}

exports.getByAdAndCustomer = async (data) => {
    console.log("notification-repositories: getByAdAndCustomer");
    const res = await Notification.findOne({
        ad: data.ad,
        customer: data.customer,
        active: true
    }, CONSTANTS_REPOSITORIES.RATING_COLUMNS).populate(CONSTANTS_REPOSITORIES.AD_CUSTOMER_POPULATE);

    return res;
}

exports.create = async (data) => {
    console.log("notification-repositories: create");
    var ad = new Notification(data);

    return await ad.save();
}

exports.update = async (data) => {
    console.log("notification-repositories: update");

    return await Notification
        .findOneAndUpdate(
            {
                _id: data._id,
                ad: data.ad,
                customer: data.customer,
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
    console.log("notification-repositories: delete");

    return await Notification
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