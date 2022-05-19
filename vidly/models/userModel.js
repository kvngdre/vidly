const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 5,
        maxLength: 255
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 5,
        maxLength: 255,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({_id: this._id, email: this.email, isAdmin: this.isAdmin}, process.env.JWT_PRIVATE_KEY);
};

// User Model
const User = mongoose.model('User', userSchema);

module.exports.model = User
module.exports.schema = userSchema;