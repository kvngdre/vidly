const errorHandler = require('../middleware/errorhandler');
const customers = require('../routes/customerRoutes');
const rentals = require('../routes/rentalRoutes');
const genres = require('../routes/genreRoutes');
const movies = require('../routes/movieRoutes');
const users = require('../routes/userRoutes');
const books = require('../routes/bookRoutes');
const auth = require('../routes/authRoute');


module.exports = function(app) {
    
    // Route handler
    app.use('/api/customers', customers);
    app.use('/api/rentals', rentals);
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/books', books);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    // Error handling middleware
    app.use(errorHandler);
}