'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: false,
        default: "Sem descrição"
    },
    price:{
        type: Number,
        required: false,
        default: 0
    },
    tags:[{
        type: String,
        lowercase: true
    }],
    active:{
        type: Boolean,
        required: true,
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

module.exports = mongoose.model('Ad', schema);