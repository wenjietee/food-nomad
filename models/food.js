// DEPENDENCIES
const mongoose = require('mongoose');

// SCHEMA
const Schema = mongoose.Schema;

const foodSchema = Schema({
	name: { type: String, required: true },
	quantity: { type: Number, required: true, min: 1 },
	expiry: { type: String, required: true },
	author: { type: String, required: true },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
