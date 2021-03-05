// DEPENDENCIES
const express = require('express');
const app = express.Router();
const User = require('../models/users');
const Recipe = require('../models/recipe');
const Food = require('../models/food');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// CONFIG
const CLOUDINARY_CONFIG = {
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
};

// MIDDLEWARE

// check for unauthenticated user
const isAuthenticated = (req, res, next) => {
	if (req.session.currentUser) {
		return next();
	} else {
		res.redirect('/sessions/new');
	}
};

// recipe data parser
const recipeParser = (body, file) => {
	const recipeData = {
		name: body.name,
		description: body.description,
		ingredients: body.ingredients,
		instructions: body.instructions,
		imageURL: file.path,
		imageID: file.filename,
		author: body.author,
	};
	return recipeData;
};

// cloudinary for storing of images
cloudinary.config(CLOUDINARY_CONFIG);

// storage engine
const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	folder: 'food-nomad',
	allowedFormats: ['jpg', 'png', 'jpeg'],
	transformation: [{ width: 512, height: 512, crop: 'limit' }],
});

// multer for processing multipart / form-data
const parser = multer({ storage: storage });

// ROUTES

// new recipe
app.get('/recipe/new', isAuthenticated, (req, res) => {
	res.render('recipe/new.ejs', {
		currentUser: req.session.currentUser,
		recipe: '',
	});
});

// create recipe
app.post('/profile', parser.single('imageURL'), isAuthenticated, (req, res) => {
	// formatting recipe data
	const recipeData = recipeParser(req.body, req.file);

	// create recipe from form inputs
	Recipe.create(recipeData, (err, createdRecipe) => {
		if (err) console.log(err);
		else {
			// add create recipe id to user recipes array
			User.findOneAndUpdate(
				{ username: createdRecipe.author },
				{ $push: { recipes: createdRecipe.id } },
				(err, foundUser) => {
					if (err) console.log(err);
					else {
						res.redirect('/app/profile');
					}
				}
			);
		}
	});
});

// edit recipe
app.get('/recipe/:id/edit', isAuthenticated, (req, res) => {
	Recipe.findById(req.params.id, (err, foundRecipe) => {
		if (err) console.log(err);
		else {
			res.render('recipe/edit.ejs', {
				currentUser: req.session.currentUser,
				recipe: foundRecipe,
			});
		}
	});
});

// update recipe
app.put('/recipe/:id', parser.single('imageURL'), (req, res) => {
	//convert ingredients text to array
	req.body.ingredients = req.body.ingredients
		.replace(/[\r\n,]/g, '\n')
		.split('\n');

	// formatting recipe data
	const recipeData = recipeParser(req.body, req.file);

	Recipe.findById(req.params.id, (err, foundRecipe) => {
		if (err) console.log(err);
		else {
			// delete image from cloudinary
			cloudinary.uploader.destroy(foundRecipe.imageID);
			// update recipe
			Recipe.findByIdAndUpdate(
				req.params.id,
				recipeData,
				(err, updatedRecipe) => {
					if (err) console.log(err);
					else {
						res.redirect(`/app/recipe/${updatedRecipe.id}`);
					}
				}
			);
		}
	});
});

// show recipe
app.get('/recipe/:id', isAuthenticated, (req, res) => {
	Recipe.findById(req.params.id, (err, foundRecipe) => {
		if (err) console.log(err);
		else {
			res.render('recipe/show.ejs', {
				recipe: foundRecipe,
			});
		}
	});
});

// delete recipe
app.delete('/recipe/:id', isAuthenticated, (req, res) => {
	// remove recipe by id
	Recipe.findByIdAndRemove(req.params.id, (err, foundRecipe) => {
		if (err) console.log(err);
		else {
			// delete image from cloudinary
			cloudinary.uploader.destroy(foundRecipe.imageID);
			// remove recipe id from current user array
			User.findByIdAndUpdate(
				req.session.currentUser._id,
				{ $pull: { recipes: req.params.id } },
				(err, foundUser) => {
					if (err) console.log(err);
					else {
						res.redirect('/app/profile');
					}
				}
			);
		}
	});
});

// profile index
app.get('/profile', isAuthenticated, (req, res) => {
	// find current user
	User.findOne(
		{ username: req.session.currentUser.username },
		(err, foundUser) => {
			// find user recipes
			Recipe.find(
				{ author: req.session.currentUser.username },
				(err, foundUserRecipes) => {
					// find user foods
					Food.find(
						{ author: req.session.currentUser.username },
						(err, foundUserFoods) => {
							// render current user ,user foods and user recipes
							res.render('profile/index.ejs', {
								currentUser: req.session.currentUser,
								userRecipes: foundUserRecipes,
								userFoods: foundUserFoods,
							});
						}
					);
				}
			);
		}
	);
});

// other user index
app.get('/profile/:username', isAuthenticated, (req, res) => {
	// find user data
	User.findOne({ username: req.params.username }, (err, foundUser) => {
		// find user recipes
		Recipe.find({ author: req.params.username }, (err, foundUserRecipes) => {
			// find user foods
			Food.find({ author: req.params.username }, (err, foundUserFoods) => {
				// render other user ,user foods and user recipes
				res.render('profile/other.ejs', {
					otherUser: foundUser,
					userRecipes: foundUserRecipes,
					userFoods: foundUserFoods,
				});
			});
		});
	});
});

// app index
app.get('/', isAuthenticated, (req, res) => {
	// find all recipes and users
	User.find({}, (err, foundUsers) => {
		Recipe.find({}, (err, foundRecipes) => {
			Food.find({}, (err, foundFoods) => {
				res.render('app/index.ejs', {
					currentUser: req.session.currentUser,
					recipes: foundRecipes,
					users: foundUsers,
					foods: foundFoods,
				});
			});
		});
	});
});

// EXPORT
module.exports = app;
