'use strict';

const mongoose = require('mongoose');
const Notification = mongoose.model('Notification');
const CONSTANTS_REPOSITORIES = require('../constants/repositories');
const RepositoriesValidator = require('../validators/repositories');

exports.getByUserIdActive = async (userId, query) => {
    console.log("notification-repositories: get");
    var repositoriesValidator = new RepositoriesValidator();
    var options = repositoriesValidator.getQueryLimitAndSkip(query);
    console.log("OPÇÕES:", options);

    const res = await Notification
        .find({
            user: userId,
            active: true
        }, CONSTANTS_REPOSITORIES.NOTIFICATION_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.USER_POPULATE)
        .setOptions(options);

    return res;
}

exports.create = async (data) => {
    console.log("notification-repositories: create");
    var notification = new Notification(data);

    return await notification.save();
}

exports.update = async (data) => {
    console.log("notification-repositories: update");

    return await Notification
        .findOneAndUpdate(
            {
                _id: data._id,
                user: data.user,
                active: true
            },
            {
                message: data.message
            },
            {
                runValidators: true,
                new: true,
                fields: CONSTANTS_REPOSITORIES.NOTIFICATION_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.USER_POPULATE);
}

exports.delete = async (data) => {
    console.log("notification-repositories: delete");

    return await Notification
        .findOneAndUpdate(
            {
                _id: data._id,
                user: data.user,
                active: true
            },
            {
                active: false
            },
            {
                runValidators: true,
                new: true,
                fields: CONSTANTS_REPOSITORIES.NOTIFICATION_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.USER_POPULATE);
}