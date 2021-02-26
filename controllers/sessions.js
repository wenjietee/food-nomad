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
		if (bcrypt.compareSync(req.body.password, foundUser.password)) {
			req.session.currentUser = foundUser;
			res.redirect('app/');
		} else {
			res.send('wrong password');
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
