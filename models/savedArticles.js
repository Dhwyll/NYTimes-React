// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
	// title is a required string
	headline: {
		type: String,
		required: true
	},
	// link is a required string
	url: {
		type: String,
		required: true,
		unique: true
	},
	// summary is a required string
	snippet: {
		type: String,
		required: true
	}
});

// Create the Article model with the ArticleSchema
var savedArticle = mongoose.model("savedArticles", ArticleSchema);

// Export the model
module.exports = savedArticle;