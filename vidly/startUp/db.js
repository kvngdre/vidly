const logger = require("../middleware/logger");
const mongoose = require('mongoose');


module.exports = function() {
    mongoose.connect("mongodb://localhost/vidly")
            .then(() => console.log('Connected to db: vidly')) 
            .catch(err => logger.log({
                level: 'error',
                message: err.message,
                metadata: err.stack
                })
            );
}
