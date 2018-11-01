'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advertiser',
        required: true
    },
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        trim: true,
        default: "Sem descrição"
    },
    price:{
        type: Number,
        default: 0
    },
    type:{
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type: String,
        trim: true,
    },tags:[{
        type: String,
        lowercase: true
    }],
    mainphoto:{
        type: String
    },
    photos:[{
        type: String
    }],
    address:{
        street:{
            type: String
        },
        number:{
            type: String
        },
        neighborhood:{
            type: String
        },
        city:{
            type: String
        },
        zipcode:{
            type: String
        },
        state:{
            type: String
        }
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

module.exports = mongoose.model('Ad', schema);