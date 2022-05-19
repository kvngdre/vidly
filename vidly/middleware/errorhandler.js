// For logging errors and other info.
const logger = require('../middleware/logger');


function errorHandler(err, req, res, next) {
    logger.log({
        level: 'error', 
        message: err.message, 
        metadata: err.stack, 
    });
    
    console.log(err.message, err.stack)
    res.status(500).send('Internal Server Error.');
}

module.exports = errorHandler;
