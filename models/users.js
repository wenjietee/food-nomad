// DEPENDENCIES
const mongoose = require('mongoose');

// SCHEMA
const Schema = mongoose.Schema;

const userSchema = Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	recipes: [String],
	foods: [String],
	email: { type: String, required: true },
	zip: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
