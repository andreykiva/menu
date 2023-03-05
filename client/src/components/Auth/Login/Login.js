import React, { useState, useContext } from 'react';
import styles from './Login.module.css';
import axios from '../../../axios-pets';
import Title from '../../UI/Title/Title';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { AuthContext } from '../../../context/auth/authContext';
import leftKitten from "../../../assets/images/left-kitten.png";
import rightKitten from "../../../assets/images/right-kitten.png";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRe = /^[a-z0-9]+$/;

const Login = () => {
	const { authSuccess } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const validateEmail = (value) => {
		if (!emailRe.test(value)) {
			setEmailError('Введіть правильний email');
			return false;
		}

		setEmailError('');
		return true;
	};

	const validatePassword = (value) => {
		if (!passwordRe.test(value)) {
			setPasswordError('Введіть правильний пароль');
			return false;
		} else if (value.length < 6) {
			setPasswordError('Пароль має бути більше 5');
			return false;
		}

		setPasswordError('');
		return true;
	};

	const login = () => {
		axios
			.post('/auth/login', { email, password })
			.then((data) => {
				const { token } = data.data;

				const date = new Date();
				date.setDate(date.getDate() + 1);

				localStorage.setItem('token', token);
				localStorage.setItem('expirationDate', date);
				authSuccess(token);
			})
			.catch((data) => {
				const { messages } = data.response.data;

				messages.email ? setEmailError(messages.email) : setEmailError('');
				messages.password
					? setPasswordError(messages.password)
					: setPasswordError('');
			});
	};

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const isValidEmail = validateEmail(email);
		const isValidPassword = validatePassword(password);

		if (isValidEmail && isValidPassword) {
			login();
		}
	};

	return (
		<div className={styles.Login}>
			<img src={leftKitten} alt="Kitten" />
			<form className={styles.LoginForm}>
				<Title tag="h2" color="red">
					Вхід
				</Title>
				<Input
					type="email"
					name="email"
					placeholder="email"
					value={email}
					error={emailError}
					onChange={onChangeEmail}
				/>
				<Input
					type="password"
					name="password"
					placeholder="пароль"
					value={password}
					error={passwordError}
					onChange={onChangePassword}
				/>
				<Button onClick={onSubmit}>Увійти</Button>
			</form>
			<img src={rightKitten} alt="Kitten" />
		</div>
	);
};

export default Login;
