const User = require('../models/userModel').model;
const bcrypt = require('bcrypt');


const auth = {
    post: async function(requestBody) {
        const user = await User.findOne({ email: requestBody.email });

        if (!user) return new Error('Invalid username or email');

        const isValid = await bcrypt.compare(requestBody.password, user.password);

        if (!isValid) return new Error('Invalid username or email');

        return user.generateAuthToken();
    }

};

module.exports = auth;
