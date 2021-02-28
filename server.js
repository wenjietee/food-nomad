// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// CONTROLLER DEPENDENCIES
const userController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');
const appController = require('./controllers/app');
const devController = require('./controllers/dev');

// CONFIG
const PORT = process.env.PORT || 3000;
const MONGOURI = process.env.MONGOATLAS || process.env.MONGOLOCAL;
const SESSIONS_CONFIG = {
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false,
};

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session(SESSIONS_CONFIG));

// DATABASE ( MONGOOSE / MONGODB )
mongoose.connect(MONGOURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
	console.log('connected to mongo');
});

//CONTROLLER ROUTES
app.use('/users', userController);
app.use('/sessions', sessionsController);
app.use('/app', appController);
app.use('/dev', devController); //for dev testing

// ROUTES

// main index
app.get('/', (req, res) => {
	res.render('index.ejs');
});

// LISTEN
app.listen(PORT, () => {
	console.log(`listening on port:${PORT}`);
});
