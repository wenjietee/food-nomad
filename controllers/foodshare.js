// DEPENDENCIES
const express = require('express');
const foodShare = express.Router();
const User = require('../models/users');
const Food = require('../models/food');

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

// new food
foodShare.get('/food/new', isAuthenticated, (req, res) => {
	res.render('food/new.ejs', {
		currentUser: req.session.currentUser,
		food: '',
	});
});

// create food

// edit food
foodShare.get('/food/:id/edit', isAuthenticated, (req, res) => {
	Food.findById(req.params.id, (err, foundFood) => {
		if (err) console.log(err);
		else {
			res.render('food/edit.ejs', {
				currentUser: req.session.currentUser,
				food: foundFood,
			});
		}
	});
});

// update food

// delete food

// food map

module.exports = foodShare;
