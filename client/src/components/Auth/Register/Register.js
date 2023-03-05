import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import axios from "../../../axios-pets";
import Title from "../../UI/Title/Title";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import leftPuppy from "../../../assets/images/left-puppy.png";
import rightPuppy from "../../../assets/images/right-puppy.png";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRe = /^[a-z0-9]+$/;

const Register = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const validateEmail = (value) => {
		if (!emailRe.test(value)) {
			setEmailError("Введіть правильний email");
			return false;
		}

		setEmailError("");
		return true;
	};

	const validatePassword = (value) => {
		if (!passwordRe.test(value)) {
			setPasswordError("Введіть правильний пароль");
			return false;
		} else if (value.length < 6) {
			setPasswordError("Пароль має бути більше 5");
			return false;
		}

		setPasswordError("");
		return true;
	};

	const register = () => {
		axios
			.post("/auth/registration", { email, password })
			.then(() => navigate("/login"))
			.catch((data) => {
				const { messages } = data.response.data;

				messages.email
					? setEmailError(messages.email)
					: setEmailError("");
				messages.password
					? setPasswordError(messages.password)
					: setPasswordError("");
			});
	};

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const isValidEmail = validateEmail(email);
		const isValidPassword = validatePassword(password);

		if (isValidEmail && isValidPassword) {
			register();
		}
	};

	return (
		<div className={styles.Register}>
			<img src={leftPuppy} alt="Puppy" />
			<form className={styles.RegisterForm}>
				<Title tag="h2" color="red">
					Реєстрація
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
				<Button onClick={onSubmit}>Зареєструватись</Button>
			</form>
			<img src={rightPuppy} alt="Puppy" />
		</div>
	);
};

export default Register;
