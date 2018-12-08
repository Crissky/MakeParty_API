'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    advertiser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advertiser',
        index: true,
        required: true
    },
    client: {
        type: String,
        required: true,
        trim: true,
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: "Sem descrição"
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        street: {
            type: String
        },
        number: {
            type: String
        },
        neighborhood: {
            type: String
        },
        city: {
            type: String
        },
        zipcode: {
            type: String
        },
        state: {
            type: String
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

module.exports = mongoose.model('Event', schema);