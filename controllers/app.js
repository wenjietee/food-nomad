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
	res.render('recipe/new.ejs', {
		currentUser: req.session.currentUser,
	});
});

// create recipe
app.post('/profile', isAuthenticated, (req, res) => {
	// create recipe from form inputs
	Recipe.create(req.body, (err, createdRecipe) => {
		if (err) console.log(err);
		else {
			// add create recipe id to user recipes array
			User.findOneAndUpdate(
				{ username: createdRecipe.author },
				{ $push: { recipes: createdRecipe.id } },
				(err, foundUser) => {
					if (err) console.log(err);
					else {
						res.redirect('/app/profile');
					}
				}
			);
		}
	});
});

// edit recipe // to link to show view
app.get('/recipe/:id/edit', isAuthenticated, (req, res) => {
	Recipe.findById(req.params.id, (err, foundRecipe) => {
		if (err) console.log(err);
		else {
			res.render('recipe/edit.ejs', {
				recipe: foundRecipe,
			});
		}
	});
});

// delete recipe // to link to show view
app.delete('/recipe/:id', isAuthenticated, (req, res) => {
	Recipe.findByIdAndRemove(req.params.id, (err, foundRecipe) => {
		if (err) console.log(err);
		else {
			res.redirect('/app/profile');
		}
	});
});

// show recipe // to link to main view and profile views
app.get('/recipe/:id', isAuthenticated, (req, res) => {
	Recipe.findById(req.params.id, (err, foundRecipe) => {
		if (err) console.log(err);
		else {
			res.render('recipe/show.ejs', {
				recipe: foundRecipe,
			});
		}
	});
});

// profile index
app.get('/profile', isAuthenticated, (req, res) => {
	// find user data
	User.findOne(
		{ username: req.session.currentUser.username },
		(err, foundUser) => {
			// find user recipes
			Recipe.find(
				{ author: req.session.currentUser },
				(err, foundUserRecipes) => {
					res.render('profile/index.ejs', {
						currentUser: req.session.currentUser,
						userRecipes: foundUserRecipes,
					});
				}
			);
		}
	);
});

// app index
app.get('/', isAuthenticated, (req, res) => {
	// find all users
	User.find({}, (err, foundUsers) => {
		// find all recipes
		Recipe.find({}, (err, foundRecipes) => {
			res.render('app/index.ejs', {
				currentUser: req.session.currentUser,
				users: foundUsers,
				recicpes: foundRecipes,
			});
		});
	});
});

// EXPORT
module.exports = app;
