// DEPENDENCIES
const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users');

// ROUTES

// new user session
sessions.get('/new', (req, res) => {
	res.render('sessions/new.ejs');
});

sessions.post('/', (req, res) => {
	User.findOne({ username: req.body.username }, (err, foundUser) => {
		// handle non-existant user
		if (foundUser === null) {
			return res.render('./error.ejs', {
				error: 'No Such User... 😨',
			});
		}
		// handle correct password
		if (bcrypt.compareSync(req.body.password, foundUser.password)) {
			req.session.currentUser = foundUser;
			res.redirect('app');
		} else {
			// handle wrong password
			res.render('./error.ejs', {
				error: 'Wrong Password! 😔',
			});
		}
	});
});

// delete user session
sessions.delete('/', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
});

// EXPORT
module.exports = sessions;
