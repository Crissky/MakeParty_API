'use strict';

const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const CONSTANTS_REPOSITORIES = require('../constants/repositories');

exports.get = async (body, options) => {
    console.log("event-repositories: get");
    console.log("OPÇÕES: ", options);

    const res = await Event
        .find({
            active: true,
            advertiser: body.advertiser
        }, CONSTANTS_REPOSITORIES.EVENT_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.ADVERTISER_POPULATE)
        .sort({ createdAt: -1 })
        .setOptions(options);

    return res;
}

exports.getByQuery = async (query, options) => {
    console.log("event-repositories: getByQuery");
    console.log("OPÇÕES: ", options);
    console.log("QUERY:", query);

    const res = await Event
        .find(query, CONSTANTS_REPOSITORIES.EVENT_COLUMNS)
        .populate(CONSTANTS_REPOSITORIES.ADVERTISER_POPULATE)
        .sort({ createdAt: -1 })
        .setOptions(options);

    return res;
}

exports.getByIdActive = async (id) => {
    console.log("event-repositories: getByIdActive");
    const res = await Event
        .findOne({
            _id: id,
            active: true
        }).populate(CONSTANTS_REPOSITORIES.ADVERTISER_POPULATE);

    return res;
}

exports.create = async (data) => {
    console.log("event-repositories: create");
    var ad = new Event(data);

    return await ad.save();
}

exports.update = async (data) => {
    console.log("event-repositories: update");

    return await Event
        .findOneAndUpdate(
            {
                _id: data._id,
                advertiser: data.advertiser,
                active: true
            },
            {
                client: data.client,
                startdate: data.startdate,
                enddate: data.enddate,
                description: data.description,
                type: data.type,
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
                fields: CONSTANTS_REPOSITORIES.EVENT_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.ADVERTISER_POPULATE);
}

exports.delete = async (data) => {
    console.log("event-repositories: delete");

    return await Event
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
                fields: CONSTANTS_REPOSITORIES.EVENT_COLUMNS
            }).populate(CONSTANTS_REPOSITORIES.ADVERTISER_POPULATE);
}
