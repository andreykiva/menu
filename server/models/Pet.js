const { Schema, model } = require('mongoose');

const Pet = new Schema({
	kind: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	descr: {
		type: String,
		required: true
	},
	img: {
		type: String,
		required: true
	},
	mainImg: {
		type: String,
		required: true
	},
	food: {
		type: String,
		required: true
	},
	foodForLittle: {
		type: String,
		required: true
	},
	care: {
		type: String,
		required: true
	},
	careForLittle: {
		type: String,
		required: true
	},
	vaccination: {
		type: String,
		required: true
	}
});

module.exports = model('Pet', Pet);
