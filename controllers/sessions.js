// DEPENDENCIES
const express = require('express');
const sessions = express.Router();
const User = require('../models/users');

// ROUTES

// new user session
sessions.get('/new', (req, res) => {
	res.render('sessions/new.ejs');
});

sessions.post('/', (req, res) => {
	User.findOne({ username: req.body.username }, (err, foundUser) => {});
});

// delete user session
sessions.delete('/', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
});

module.exports = sessions;
