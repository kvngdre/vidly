const mongoose = require('mongoose');

// Customer Schema
const customerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 50,
        trim: true
    },

    isGold: {
        type: Boolean,
        default: false
    },

    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
}, {timestamps: true});

// Customer Model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
