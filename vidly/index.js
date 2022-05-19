require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

require('./startUp/routes')(app);
require('./startUp/db')();


// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ', port));