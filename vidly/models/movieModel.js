// Importing dependencies
const mongoose = require('mongoose');
const genreSchema = require('./genreModel').schema;

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 100,
        trim: true
    },
    genre: {
        type: genreSchema,
        required: true,
    },

    numberInStock: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: function(value) {
                return value >= 0 && value < 256
            },
            message: "Cannot be less than zero(0)."
        }
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: function(value) {
                return value >= 0 && value < 256
            },
            message: "Cannot be less than zero(0)."
        }
    }

});

// Movie Model
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;