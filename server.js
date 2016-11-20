// load env variables
require('dotenv').config();

// get dependencies
var express = require('express'),
    app     = express(),
    port    = process.env.PORT || 8080,
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash');

// configure application,
//help express, set up ejs
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxage: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// Connect to our DB
mongoose.connect(process.env.DB_URI);

// use body parser, url encoded, extended: true
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// set routes
app.use(require('./app/routes'));

// start server
app.listen(port, () => {
    console.log(`app listening on port: ${port}`);
});