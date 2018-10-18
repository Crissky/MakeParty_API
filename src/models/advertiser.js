'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    socialname:{
        type: String,
        required: true
    },
    cnpj:{
        type: String,
        index:true,
        unique: true,
        required: true
    },
    authorization:{
        type: String
    },
    photo:{
        type: String
    },
    active:{
        type: Boolean,
        default: true
    }
}, { timestamps: true });

schema.pre('save', function(next){
    this.active = true;

    next();
});

module.exports = mongoose.model('Advertiser', schema);