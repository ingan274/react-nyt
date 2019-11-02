require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// If its production environment!
if (process.env.NODE_ENV === 'production') {
	console.log('YOU ARE IN THE PRODUCTION ENV');
	app.use('/static', express.static(path.join(__dirname, './client/build/static')));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
