// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride = require('method-override');
//const mongoose = require('mongoose');

// CONTROLLER DEPENDENCIES

// CONFIG
const PORT = process.env.PORT || 3000;
const MONGOURI = process.env.MONGO;

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

// DATABASE
// mongoose.connect(MONGOURI, { useNewUrlParser: true });
// mongoose.connection.once('open', () => {
// 	console.log('connected to mongo');
// });

// ROUTES

// LISTEN
app.listen(PORT, () => {
	console.log(`listening on port:${PORT}`);
});
