const Appointment = require("../models/Appointment");

class AppointmentController {
	async createAppointment(req, res) {
		try {
			const appointment = new Appointment(req.body);
			await appointment.save();

			return res
				.status(200)
				.json({ message: "Запис на консультацію створено" });
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new AppointmentController();
