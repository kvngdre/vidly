// Importing dependencies
const Movie = require('../models/movieModel');
const Genre = require('../models/genreModel').model;

const movie =  {

    create: async function(requestBody) {
        try {
            const movie = new Movie({
                title: requestBody.title, 
                genre: new Genre({name: requestBody.genre}),
                numberInStock: requestBody.numberInStock,
                dailyRentalRate: requestBody.dailyRentalRate
            });
        
            await movie.save();
            
            return movie;
        } catch(error) {
            console.log(error.message);
            return error.message;
        }
    },

    getAll: async function() { return await Movie.find().sort('name').select(['-_id', 'title']); },

    get: async function(movieID) { return await Movie.findById(movieID); },

    update: async function(id, requestBody) {
        try {
            const movie = await Movie.findById(id);

            if(!movie) return movie;
            
            movie.title = requestBody.title || movie.title;
            movie.genre.name = requestBody.genre || movie.genre.name;
            movie.numberInStock = requestBody.numberInStock || movie.numberInStock;
            movie.dailyRentalRate = requestBody.dailyRentalRate || movie.dailyRentalRate;
        
            await movie.save();
            
            return movie;
        }catch(error) {
            console.log(error.message);
            return
        }
    },

    delete: async function(id) { return await Movie.findByIdAndRemove(id); }
};

module.exports = movie;
