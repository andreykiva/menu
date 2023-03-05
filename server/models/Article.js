const { Schema, model } = require('mongoose');

const Article = new Schema({
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: false
	}
});

module.exports = model('Article', Article);
