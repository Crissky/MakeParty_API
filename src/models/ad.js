'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advertiser',
        index: true,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: "Sem descrição"
    },
    price: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true

    }],
    mainphoto: {
        type: String,
        trim: true
    },
    photos: [{
        type: String,
        trim: true
    }],
    address: {
        street: {
            type: String,
            trim: true
        },
        number: {
            type: String,
            trim: true
        },
        neighborhood: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        zipcode: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        }
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

module.exports = mongoose.model('Ad', schema);