const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const { secret } = require('../config');

const generateAccessToken = (id, roles) => {
	const payload = { id, roles };

	return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class AuthController {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ message: 'Помилка під час реєстрації', errors });
			}

			const { email, password } = req.body;
			const candidate = await User.findOne({ email });
			if (candidate) {
				return res.status(400).json({
					messages: { email: 'Такий користувач вже існує' }
				});
			}

			const hashPassword = bcrypt.hashSync(password, 7);
			const userRole = await Role.findOne({ value: 'USER' });
			const user = new User({
				email,
				password: hashPassword,
				roles: [userRole.value]
			});
			await user.save();

			return res
				.status(200)
				.json({ message: 'Користувач успішно зареєстрований' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Помилка реєстрації' });
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json({ messages: { email: 'Користувач не знайдений' } });
			}

			const validPassword = bcrypt.compareSync(password, user.password);

			if (!validPassword) {
				return res
					.status(400)
					.json({ messages: { password: 'Введено неправильний пароль' } });
			}

			const token = generateAccessToken(user._id, user.roles);
			return res.json({ token, roles: user.roles });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Помилка входу' });
		}
	}

	getRoles(req, res) {
		const token = req.headers.authorization.split(' ')[1];

		const { roles } = jwt.verify(token, secret);

		res.json({ roles });
	}
}

module.exports = new AuthController();
