'use strict';

const mongoose = require('mongoose');
const WishList = mongoose.model('WishList');

const COLUMNS = 'customer ad createdAt updatedAt active';
const AD_COLUMNS = 'owner title description price type phone tags mainphoto photos createdAt updatedAt active address';
const OWNER_COLUMNS = 'active user socialname cnpj authorization photo createdAt updatedAt';
const CUSTOMER_COLUMNS = 'active user name cpf birthdate photo phone createdAt updatedAt';
const USER_COLUMNS = 'active email createdAt updatedAt';

exports.getByCustomerId = async (id) => {
    console.log("wishlist-repositories: getById");
    const res = await WishList.find({
        customer: id,
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
                customer: data.customer,
                active: true
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