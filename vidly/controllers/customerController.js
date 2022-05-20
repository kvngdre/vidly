const Customer = require('../models/customerModel');


const customer = {

    getAll: async function(name) { 
        let queryParams = {};
        if(name && name !== '') queryParams.name = new RegExp(name, 'i');
        
        return await Customer.find(queryParams).sort('_id') 
    },

    get: async function(customerID) { return await Customer.findById(customerID); },

    create: async function(requestBody) {
        try {
            const customer = new Customer({
                name: requestBody.name,
                isGold: requestBody.isGold,
                phone: requestBody.phone
            });
    
            await customer.save();
    
            return customer;

        }catch(error) {
            console.log(error.message);
            return error
        }
    },

    update: async function(customerID, requestBody) {
        const customer = await Customer.findByIdAndUpdate(customerID, {
            name: requestBody.name,
            isGold: requestBody.isGold,
            phone: requestBody.phone
        }, {new: true});

        return customer
    },

    delete: async function() { return await Customer.findByIdAndRemove(customerID) }

};

module.exports = customer;