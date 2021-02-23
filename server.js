// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// CONTROLLER DEPENDENCIES
const userController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');

// CONFIG
const PORT = process.env.PORT || 3000;
const MONGOURI = process.env.MONGOLOCAL;

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

// DATABASE
mongoose.connect(MONGOURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
	console.log('connected to mongo');
});

//CONTROLLER ROUTES
app.use('/users', userController);
app.use('/sessions', sessionsController);

// ROUTES
app.get('/', (req, res) => {
	res.render('index.ejs');
});

// LISTEN
app.listen(PORT, () => {
	console.log(`listening on port:${PORT}`);
});
