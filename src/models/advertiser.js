'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index:true,
        required: true
    },
    socialname:{
        type: String,
        required: true,
        trim: true
    },
    cnpj:{
        type: String,
        index:true,
        trim: true,
        unique: true,
        required: true
    },
    plan:{
        name:{
            type:String,
            trim: true
        },
        totalad:{
            type: Number
        },
        totalphoto:{
            type:Number
        }
    },
    authorization:{
        type: String,
        trim: true
    },
    photo:{
        type: String,
        trim: true
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