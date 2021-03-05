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

// create food
foodShare.post('/', isAuthenticated, (req, res) => {
	// format date input from form data
	req.body.expiry = req.body.expiry.split('-').reverse().join('-');

	// create food from form inputs
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

// update food
foodShare.put('/:id', isAuthenticated, (req, res) => {
	// format date input from form data
	req.body.expiry = req.body.expiry.split('-').reverse().join('-');

	// update food from forms data
	Food.findByIdAndUpdate(req.params.id, req.body, (err, updatedFood) => {
		if (err) console.log(err);
		else {
			res.redirect('/app/profile');
		}
	});
});

// delete food
foodShare.delete('/:id', isAuthenticated, (req, res) => {
	Food.findByIdAndRemove(req.params.id, (err, foundFood) => {
		if (err) console.log(err);
		else {
			// remove food id from current user array
			User.findByIdAndUpdate(
				req.session.currentUser._id,
				{ $pull: { foods: req.params.id } },
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

// show map
foodShare.get('/map', isAuthenticated, (req, res) => {
	res.render('food/map.ejs', {
		map: process.env.GOOGLEMAPS_API_KEY,
	});
});

// send data
foodShare.get('/data', (req, res) => {
	// find all food and users
	User.find({}, (err, foundUsers) => {
		Food.find({}, (err, foundFoods) => {
			res.send({
				currentUser: req.session.currentUser,
				users: foundUsers,
				foods: foundFoods,
			});
		});
	});
});

module.exports = foodShare;
