const Joi = require('joi');

function validateCustomer(customer) {
    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required()
    });

    return joiSchema.validate(customer);
}

module.exports = validateCustomer;