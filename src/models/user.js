'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        index: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

schema.pre('save', function (next) {
    this.active = true;

    next();
});

module.exports = mongoose.model('User', schema);