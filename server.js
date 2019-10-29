const express = require("express");
const mongoose = require("mongoose");
const routes = require("./server/routes");
const app = express();
const PORT = process.env.PORT || 3001;

const dotenv = require('dotenv')
require('dotenv').config();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// If its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	console.log('YOU ARE IN THE PRODUCTION ENV');
	app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/'))
	});
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
mongoose.Promise = global.Promise;
let MONGO_URL;
const MONGO_LOCAL_URL = 'mongodb://localhost/react-mongo-scraper-db';

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
	MONGO_URL = process.env.MONGODB_URI;
} else {
	mongoose.connect(MONGO_LOCAL_URL, { useNewUrlParser: true }); // local mongo url
	MONGO_URL = MONGO_LOCAL_URL;
}

// should mongoose.connection be put in the call back of mongoose.connect???
const db = mongoose.connection;
db.on('error', err => {
	console.log(`There was an error connecting to the database: ${err}`);
});

db.once('open', () => {
	console.log(`You have successfully connected to your mongo database: ${MONGO_URL}`);
});

module.exports = db;

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
