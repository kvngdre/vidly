const mongoose = require('mongoose');

// Rental schema
const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minLength: 5,
                maxLength: 50,
                trim: true
            },

            isGold: {
                type: Boolean,
                default: false,
            },

            phone: {
                type: String,
                required: true,
                minLength: 5,
                maxLength: 50,
                trim: true
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minLength: 4,
                maxLength: 100,
                trim: true
            },

            dailyRentalRate: {
                type: Number,
                required: true,
                validate: {
                    validator: function(value) {
                        return value >= 0 && value < 256;
                    },
                    message: "Cannot be less than 0 or greater than 255"
                }
            }
        })
    },

    dateOut: {
        type: Date,
        required: true,
        default: () => Date.now()
    },

    dateReturned: {
        type: Date
    },

    rentalFee: {
        type: Number,
        min: 0
    }

});

// Rental model
const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental
