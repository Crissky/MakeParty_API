'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        index:true,
        required: true
    },
    ad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
        index:true,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

schema.index({ owner: 1, ad: 1 }, { unique: true });

schema.pre('save', function (next) {
    this.active = true;

    next();
});

module.exports = mongoose.model('WishList', schema);