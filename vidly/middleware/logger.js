const winston = require('winston');
require('winston-mongodb');

/* Logging Levels 
    1. error
    2. warn for warning
    3. info
    4. http
    5. verbose
    6. debug
    7. silly
    */

// Getting timezone for Nigeria
const localTimezone = () => {
    return new Date().toLocaleString('en-GB', {
        timeZone: 'Africa/Lagos'
    });
}


const loggerConfiguration = {
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logFile.log',
            format: winston.format.combine(winston.format.timestamp({ format: localTimezone }), winston.format.json())
        }),
        new winston.transports.MongoDB({
            level: 'error',
            db: 'mongodb://localhost/vidly',
            collection: 'logs',
            options: { useUnifiedTopology: true },
            format: winston.format.combine(winston.format.timestamp({ format: localTimezone }), winston.format.json())

        })
    ]    
};

const logger = winston.createLogger(loggerConfiguration);

module.exports = logger;
