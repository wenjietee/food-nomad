// DEPENDENCIES
const mongoose = require('mongoose');

// SCHEMA
const Schema = mongoose.Schema;

const userSchema = Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	recipes: [String],
	zip: [Number],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
