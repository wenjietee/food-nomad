// DEPENDENCIES
const mongoose = require('mongoose');

// SCHEMA
const Schema = mongoose.Schema;

const recipeSchema = Schema({
	name: { type: String, required: true },
	description: String,
	ingredients: [String],
	instructions: { type: String, required: true },
	imageURL: { type: String, required: true },
	imageID: { type: String, required: true },
	author: { type: String, required: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
