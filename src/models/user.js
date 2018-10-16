'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
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
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

schema.pre('save', function(next){
    this.active = true;

    next();
});

module.exports = mongoose.model('User', schema);