// Importing dependencies
const Joi = require('joi');

/**
 * Validates the user input when creating a new movie.
 * @param {object} movie 
 * @returns {object}
 */
function validateMovie(movie) {
    const JoiSchema = Joi.object({
        title: Joi.string().min(4).max(100).required(),

        genre: Joi.string().min(4).max(50).required(),

        numberInStock: Joi.number().optional(),

        dailyRentalRate: Joi.number().min(0).optional()
    });

    return JoiSchema.validate(movie)
}

module.exports = validateMovie;