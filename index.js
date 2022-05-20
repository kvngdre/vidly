require('express-async-errors');
require('dotenv').config();

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/vidly/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

require('./vidly/startUp/db')();
require('./vidly/startUp/routes')(app);


// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ', port));