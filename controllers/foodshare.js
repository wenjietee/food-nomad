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
foodShare.get('/new', isAuthenticated, (req, res) => {
	res.render('food/new.ejs', {
		currentUser: req.session.currentUser,
		food: '',
	});
});

// create food // redirect to user profile
foodShare.post('/', isAuthenticated, (req, res) => {
	Food.create(req.body, (err, createdFood) => {
		if (err) console.log(err);
		else {
			User.findOneAndUpdate(
				{ username: createdFood.author },
				{ $push: { foods: createdFood.id } },
				(err, foundUser) => {
					if (err) console.log(err);
					else {
						res.redirect('/app/profile');
					}
				}
			);
			res.redirect('/app/profile');
		}
	});
});

// edit food
foodShare.get('/:id/edit', isAuthenticated, (req, res) => {
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

// update food // redirect to user profile
foodShare.put('/food/:id', isAuthenticated, (req, res) => {
	res.redirect('/app/profile');
});

// delete food
foodShare.delete('/food/:id', isAuthenticated, (req, res) => {
	res.redirect('/app/profile');
});

// food map // create google maps api

module.exports = foodShare;
