// Importing dependencies
const bcrypt = require('bcrypt');
const User = require('../models/userModel').model;
const auth = require('../controllers/authController')

const user = {

    create: async function(requestBody) {
        let user = await User.findOne({ email: requestBody.email });

        if(user) return new Error('User already registered.');

        const salt = await bcrypt.genSalt(10);
        requestBody.password = await bcrypt.hash(requestBody.password, salt);

        try {
            let user = new User({
                name: requestBody.name,
                email: requestBody.email,
                password: requestBody.password
            });

            await user.save();

            const token = user.generateAuthToken();
            
            return {user, token};
        }catch(error) {
            console.log(error.message);
            return error;
        }
    },
    
    get: async function(userID) { return await User.findById(userID).select('-password') },
    
    getAll: async function() { return await User.find().sort('_id').select(['name', 'email']) },

    update: async function(userID, requestBody) {
        try {
            const user = await User.findById(userID)
    
            user.name = requestBody.name || user.name;
            user.email = requestBody.email || user.email;
            user.password = requestBody.password || user.password;
    
            await user.save();
    
            return user;
        }catch(error) {
            console.log(error.message);
            return error;
        }
    },

    delete: async function(userID) { return await User.findByIdAndRemove(userID); }
}

module.exports = user;
