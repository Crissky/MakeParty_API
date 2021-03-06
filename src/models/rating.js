'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        index: true,
        required: true
    },
    ad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
        index: true,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    comment: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

schema.index({ customer: 1, ad: 1 }, { unique: true });

schema.pre('save', function (next) {
    this.active = true;

    next();
});

module.exports = mongoose.model('Rating', schema);