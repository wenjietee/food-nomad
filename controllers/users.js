// DEPENDENCIES
const bcrypt = require('bcrypt');
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
	// hash user pw and pass into db
	req.body.password = bcrypt.hashSync(
		req.body.password,
		bcrypt.genSaltSync(10)
	);
	//create new user from form data and hashed pw
	User.create(req.body, (err, createdUser) => {
		res.redirect('/');
	});
});

// EXPORT
module.exports = users;
