const Router = require('express');
const router = new Router();
const { check } = require('express-validator');
const controller = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post(
	'/registration',
	[check('email', 'Email не может быть пустым').notEmpty()],
	[check('password', 'Пароль должен быть больше 5').isLength({ min: 6 })],
	controller.registration
);

router.post(
	'/login',
	[check('email', 'Email не может быть пустым').notEmpty()],
	[check('password', 'Пароль должен быть больше 5').isLength({ min: 6 })],
	controller.login
);

router.get('/roles', authMiddleware, controller.getRoles);

module.exports = router;
