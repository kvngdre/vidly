const Joi = require('joi');

/**
 * Validates the user authentication request body.
 * @param {object} req 
 * @returns {object}
 */
function validate(req) {
    const joiSchema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });

    return joiSchema.validate(req);
}

module.exports = validate;