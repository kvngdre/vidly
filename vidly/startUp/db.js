const logger = require("../middleware/logger");
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect(process.env.DATABASE_URL)
            .then(() => console.log('Connected to database')) 
            .catch(err => console.log(err.message));
}

