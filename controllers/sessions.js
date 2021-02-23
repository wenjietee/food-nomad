// DEPENDENCIES
const express = require('express');
const sessions = express.Router();
const User = require('../models/users');

// ROUTES
sessions.get('/new', (req, res) => {
	res.render('sessions/new.ejs');
});

module.exports = sessions;
