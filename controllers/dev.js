// DEPENDENCIES
const bcrypt = require('bcrypt');
const express = require('express');
const dev = express.Router();
const User = require('../models/users');
const Recipe = require('../models/recipe');
const seedData = require('../models/seed');

// ROUTES

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
	Recipe.create(seedData.recipes, (err, createdRecipes) => {
		console.log(createdRecipes);
		res.redirect('/');
	});
	//find a way to link recipe id to user
});

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

// EXPORTS
module.exports = dev;
