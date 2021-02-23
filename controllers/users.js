// DEPENDENCIES
const express = require('express');
const users = express.Router();
const User = require('../models/users');

// ROUTES
users.get('/new', (req, res) => {
	res.render('users/new.ejs');
});

module.exports = users;
