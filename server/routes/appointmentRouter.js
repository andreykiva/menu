const Router = require('express');
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');
const controller = require("../controllers/appointmentController");

router.post('/create', authMiddleware, controller.createAppointment);

module.exports = router;
