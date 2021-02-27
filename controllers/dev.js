// DEPENDENCIES
const bcrypt = require('bcrypt');
const express = require('express');
const dev = express.Router();
const User = require('../models/users');
const Recipe = require('../models/recipe');
const seedData = require('../models/seed');

// ROUTES

// QUERY DATA

// get current user object
dev.get('/currentUser', (req, res) => {
	res.send(req.session.currentUser);
});

// get current user id via mongoose
dev.get('/mongooseUser', (req, res) => {
	User.findById(req.session.currentUser._id, (err, foundUser) => {
		if (err) console.log(err);
		else {
			res.send(foundUser);
		}
	});
});

// SEED DATA

// seed users
dev.get('/seedUsers', (req, res) => {
	seedData.users.forEach((user) => {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
	});
	User.create(seedData.users, (err, createdUsers) => {
		console.log(createdUsers);
		res.redirect('/');
	});
});

// seed recipes
dev.get('/seedRecipes', (req, res) => {
	seedData.recipes.forEach((recipe) => {
		Recipe.create(recipe, (err, createdRecipe) => {
			if (err) console.log(err);
			else {
				// add create recipe id to user recipes array
				User.findOneAndUpdate(
					{ username: createdRecipe.author },
					{ $push: { recipes: createdRecipe.id } },
					(err, foundUser) => {
						if (err) console.log(err);
						else {
							res.redirect('/');
						}
					}
				);
			}
		});
	});
});

// DANGER ZONE

// delete users
dev.get('/deleteUsers', (req, res) => {
	User.remove({}, (err, allUsers) => {
		console.log(allUsers);
		res.redirect('/');
	});
});

// delete recipes
dev.get('/deleteRecipes', (req, res) => {
	Recipe.remove({}, (err, allRecipes) => {
		console.log(allRecipes);
		res.redirect('/');
	});
});

// delete all
dev.get('/deleteAll', (req, res) => {
	Recipe.remove({}, (err, allRecipes) => {
		User.remove({}, (err, allUsers) => {
			console.log(allUsers);
			res.redirect('/');
		});
	});
});

// EXPORTS
module.exports = dev;
