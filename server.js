const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3002;

const dotenv = require('dotenv')
dotenv.config()

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
const MONGO_LOCAL_URL = 'mongodb://localhost/Article';

// if (process.env.MONGODB_URI) {
// 	mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
// } else {
	mongoose.connect(MONGO_LOCAL_URL, { useNewUrlParser: true }); // local mongo url
// }

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
