// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// CONTROLLER DEPENDENCIES

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

// ROUTES

// LISTEN
app.listen(PORT, () => {
	console.log(`listening on port:${PORT}`);
});
