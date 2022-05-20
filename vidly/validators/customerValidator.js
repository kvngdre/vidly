const Joi = require('joi');

function validateCustomer(customer) {
    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        isGold: Joi.boolean().optional(),
        phone: Joi.string()
                  .pattern(/^[0-9]{11}$/)
                  .messages({"string.pattern.base": "Invalid phone number."})
    });

    return joiSchema.validate(customer);
}

module.exports = validateCustomer;