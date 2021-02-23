// DEPENDENCIES
const express = require('express');
const users = express.Router();
const User = require('../models/users');

// ROUTES

// create new user
users.get('/new', (req, res) => {
	//direct to create user page
	res.render('users/new.ejs');
});

users.post('/', (req, res) => {
	//create new user from form data
	User.create(req.body, (err, newUser) => {
		if (err) console.log(err);
		console.log(newUser);
		res.redirect('/');
	});
});

module.exports = users;
