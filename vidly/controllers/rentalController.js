const Customer = require('../models/customerModel');
const Movie = require('../models/movieModel');
const Rental = require('../models/rentalModel');
const mongoose = require('mongoose');

async function createSession() {
    const session = await mongoose.startSession();
}

const rental = {

    create: async function(requestBody) {
        try {
            const customer = await Customer.findById(requestBody.customerID);
            if (!customer) return 'Invalid customer.';

            const movie = await Movie.findById(requestBody.movieID);
            if (!movie) return 'Invalid movie.';

            const rental = new Rental({
                customer: {
                    _id: customer.id,
                    name: customer.name,
                    phone: customer.phone
                },
                movie: {
                    _id: movie.id,
                    title: movie.title,
                    dailyRentalRate: movie.dailyRentalRate
                }
            });
            
            await rental.save();

            movie.numberInStock--;
            await movie.save();
            
            return rental;

        } catch(error) {
            console.log(error.message)
            return error.message;
        };
    },

    getAll: async function() { return await Rental.find().sort('-dateOut'); },

    get: async function(rentalID) { return await Rental.findById(rentalID); },

    delete: async function(rentalID) { return await Rental.findByIdAndRemove(rentalID); }
};

module.exports = rental;
