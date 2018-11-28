'use strict';

const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');

const COLUMNS = 'customer ad rating createdAt updatedAt active';
const AD_COLUMNS = 'owner title description price type phone tags mainphoto photos createdAt updatedAt active address';
const OWNER_COLUMNS = 'active user socialname cnpj authorization photo createdAt updatedAt';
const CUSTOMER_COLUMNS = 'active user name cpf birthdate photo phone createdAt updatedAt';
const USER_COLUMNS = 'active email createdAt updatedAt';

const TESTE = {
    path:'ad',
    select: AD_COLUMNS,
    populate: {
        path: 'owner',
        select: OWNER_COLUMNS,
        populate: {
            path: 'user',
            select: USER_COLUMNS
        }
    }
};

exports.get = async () => {
    console.log("rating-repositories: get");
    const res = await Rating
        .find({
            active: true
        }, COLUMNS).populate({
            path:'ad',
            select: AD_COLUMNS,
            populate: {
                path: 'owner',
                select: OWNER_COLUMNS,
                populate: {
                    path: 'user',
                    select: USER_COLUMNS
                }
            }
        }).populate({
            path: 'customer',
            select: CUSTOMER_COLUMNS,
            populate: {
                path: 'user',
                select: USER_COLUMNS
            }
        });

    return res;
}

exports.getByAdAndCustomer = async (data) => {
    console.log("rating-repositories: getByAdAndCustomer");
    const res = await Rating.findOne({
        ad: data.ad,
        customer: data.customer,
        active: true
    }, COLUMNS).populate({
            path:'ad',
            select: AD_COLUMNS,
            populate: {
                path: 'owner',
                select: OWNER_COLUMNS,
                populate: {
                    path: 'user',
                    select: USER_COLUMNS
                }
            }
        }).populate({
            path: 'customer',
            select: CUSTOMER_COLUMNS,
            populate: {
                path: 'user',
                select: USER_COLUMNS
            }
        });

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
                active: true
            },
            {
                rating: data.rating
            },
            {
                runValidators: true,
                new: true,
                fields: COLUMNS
            }).populate({
                path:'ad',
                select: AD_COLUMNS,
                populate: {
                    path: 'owner',
                    select: OWNER_COLUMNS,
                    populate: {
                        path: 'user',
                        select: USER_COLUMNS
                    }
                }
            }).populate({
                path: 'customer',
                select: CUSTOMER_COLUMNS,
                populate: {
                    path: 'user',
                    select: USER_COLUMNS
                }
            });
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
                fields: COLUMNS
            }).populate({
                path:'ad',
                select: AD_COLUMNS,
                populate: {
                    path: 'owner',
                    select: OWNER_COLUMNS,
                    populate: {
                        path: 'user',
                        select: USER_COLUMNS
                    }
                }
            }).populate({
                path: 'customer',
                select: CUSTOMER_COLUMNS,
                populate: {
                    path: 'user',
                    select: USER_COLUMNS
                }
            });
}