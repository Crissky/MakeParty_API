'use strict';

const AD_COLUMNS = 'owner title description price type phone tags mainphoto photos createdAt updatedAt active address';
const ADVERTISER_COLUMNS = 'active user socialname cnpj authorization photo plan createdAt updatedAt';
const CUSTOMER_COLUMNS = 'active user name cpf birthdate photo phone createdAt updatedAt';
const EVENT_COLUMNS = 'active client advertiser startdate enddate description type address createdAt updatedAt';
const NOTIFICATION_COLUMNS = 'active user message createdAt updatedAt';
const RATING_COLUMNS = 'customer ad rating comment createdAt updatedAt active';
const USER_COLUMNS = 'active email createdAt updatedAt';
const WISHLIST_COLUMNS = 'customer ad createdAt updatedAt active';

const USER_POPULATE = {
    path: 'user',
    select: USER_COLUMNS
};

const ADVERTISER_POPULATE = {
    path: 'advertiser',
    select: ADVERTISER_COLUMNS,
    populate: USER_POPULATE
};

const OWNER_POPULATE = {
    path: 'owner',
    select: ADVERTISER_COLUMNS,
    populate: USER_POPULATE
};

const AD_POPULATE = {
    path: 'ad',
    select: AD_COLUMNS,
    populate: OWNER_POPULATE
};

const CUSTOMER_POPULATE = {
    path: 'customer',
    select: CUSTOMER_COLUMNS,
    populate: USER_POPULATE
};

const AD_CUSTOMER_POPULATE = [AD_POPULATE, CUSTOMER_POPULATE];

module.exports = {
    AD_COLUMNS: AD_COLUMNS,
    ADVERTISER_COLUMNS: ADVERTISER_COLUMNS,
    CUSTOMER_COLUMNS: CUSTOMER_COLUMNS,
    EVENT_COLUMNS: EVENT_COLUMNS,
    RATING_COLUMNS: RATING_COLUMNS,
    USER_COLUMNS: USER_COLUMNS,
    WISHLIST_COLUMNS: WISHLIST_COLUMNS,
    NOTIFICATION_COLUMNS: NOTIFICATION_COLUMNS,

    USER_POPULATE: USER_POPULATE,
    OWNER_POPULATE: OWNER_POPULATE,
    ADVERTISER_POPULATE: ADVERTISER_POPULATE,
    AD_POPULATE: AD_POPULATE,
    CUSTOMER_POPULATE: CUSTOMER_POPULATE,
    AD_CUSTOMER_POPULATE: AD_CUSTOMER_POPULATE
}