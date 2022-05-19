// Importing dependency
const mongoose = require('mongoose');

// Genre Schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
        trim: true,
        
    }
});

// Genre Model
const Genre = mongoose.model('Genre', genreSchema);

module.exports.model = Genre;
module.exports.schema = genreSchema;