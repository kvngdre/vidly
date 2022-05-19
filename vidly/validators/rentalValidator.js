const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

/**
 * validates a rental object
 * @param {object} rental 
 * @returns {object}
 */
function validateRental(rental) {
    const JoiSchema = Joi.object({
        customerID: Joi.objectId().required(),

        movieID: Joi.objectId().required()
    });

    return JoiSchema.validate(rental);
};

module.exports = validateRental;
