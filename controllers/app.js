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

// new recipe
app.get('/recipe/new', isAuthenticated, (req, res) => {
	res.render('recipe/new.ejs');
});

// create recipe //append recipe id to user
app.post('/', isAuthenticated, (req, res) => {
	Recipe.create(req.body, (err, createdRecipe) => {
		if (err) console.log(err);
		else {
			res.redirect('/app/profile');
		}
	});
});

// delete recipe
app.delete('/:id', isAuthenticated, (req, res) => {
	Recipe.findByIdAndRemove(req.params.id, (err, foundRecipe) => {
		if (err) console.log(err);
		else {
			res.redirect('/app/profile');
		}
	});
});

// profile index // to add mongoose recipe to route
app.get('/profile', isAuthenticated, (req, res) => {
	User.findOne(
		{ username: req.session.currentUser.username },
		(err, foundUser) => {
			res.render('profile/index.ejs', {
				currentUser: req.session.currentUser,
			});
		}
	);
});

// app index // to add mongoose recipe to route
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
