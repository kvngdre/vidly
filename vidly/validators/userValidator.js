const Joi = require("joi");

/**
 * validates the user registration data
 * @param {object} user 
 * @returns {object}
 */
function validateUser(user) {
    const joiSchema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });

    return joiSchema.validate(user);
}

module.exports = validateUser;