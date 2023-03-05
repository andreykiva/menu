const { Schema, model } = require('mongoose');

const Appointment = new Schema({
	name: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true
	},
	comment: {
		type: String,
		required: true
	}
});

module.exports = model('Appointment', Appointment);
