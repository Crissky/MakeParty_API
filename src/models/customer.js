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
    name:{
        type: String,
        trim: true,
        required: true
    },
    cpf:{
        type: String,
        trim: true,
        index:true,
        unique: true,
        required: true
    },
    birthdate:{
        type: Date,
        required: true
    },
    phone:{
        type: String,
        trim: true,
        required: true
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

module.exports = mongoose.model('Customer', schema);