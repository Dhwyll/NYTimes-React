const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const savedArticle = require("./models/savedArticles.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}


// If deployed, use the deployed database. Otherwise use the local news-scraper database
var db = process.env.MONGODB_URI || "mongodb://localhost/nytimes";

// Connect mongoose to our database
mongoose.connect(db, function(error) {
	// Log any errors connecting with mongoose
	if (error) {
		console.log(error);
	}
	// Or log a success message
	else {
		console.log("mongoose connection is successful");
	}
});

app.post("/saved", function(req, res) {
	res.json(true);

	let articleInfo = {};

	articleInfo.headline = req.body.info.headline.main;
	articleInfo.url = req.body.info.web_url;
	articleInfo.snippet = req.body.info.snippet;
	console.log("new savedArticle is", savedArticle);

	let entry = new savedArticle(articleInfo);

	entry.save(function(err, doc) {
		if (err) {
			console.log(err);
		}
			else {
				console.log(doc);
			}
	});
});

app.get("/healthcheck", function(req,res){
	res.json({"success": true, status: 200})
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
	console.log(`🌎 ==> Server now on port ${PORT}!`);
});
