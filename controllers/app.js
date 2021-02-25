// DEPENDENCIES
const express = require('express');
const app = express.Router();
const User = require('../models/users');
const Recipe = require('../models/recipe');

// MIDDLEWARE

// check for unauthenticated user
const isAuthenticated = (req, res, next) => {
	if (req.session.currentUser) {
		return next();
	} else {
		res.redirect('/sessions/new');
	}
};

// ROUTES

// app index
app.get('/', isAuthenticated, (req, res) => {
	User.find({}, (err, foundUsers) => {
		res.render('app/index.ejs', {
			currentUser: req.session.currentUser,
			users: foundUsers,
		});
	});
});

// EXPORT
module.exports = app;
