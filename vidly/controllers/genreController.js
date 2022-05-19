// Importing dependency
const Genre = require('../models/genreModel').model;

const genre = {

    create: async function(requestBody) {
        try {
            const genre = new Genre({
                name: requestBody.name
            });
            await genre.save();
        
            return genre;
        } catch(error) {
            console.log(error.message);
            return error;
        };
    },

    getAll: async function() { return await Genre.find().sort('-name'); },

    get: async function(genreID) { return await Genre.findById(genreID); },

    put: async function(genreID, requestBody) {
        try {
            const genre = await Genre.findByIdAndUpdate(genreID, { name: requestBody.name }, {new: true});
    
            return genre;
        }catch(error) {
            console.log(error.message);
            return error;
        }
    },

    delete: async function(genreID) {
        return await Genre.findByIdAndRemove(genreID);
    }
}

module.exports = genre;
