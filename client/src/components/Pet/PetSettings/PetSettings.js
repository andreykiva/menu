import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios-pets";
import Title from "../../UI/Title/Title";
import styles from "./PetSettings.module.css";
import Button from "../../UI/Button/Button";
import Radio from "../../UI/Radio/Radio";
import Range from "../../UI/Range/Range";
import Modal from "../../UI/Modal/Modal";
import Input from "../../UI/Input/Input";
import { weights, ages } from "./settingsData";
import TextArea from "../../UI/TextArea/TextArea";

const PetSettings = ({ pet, kind }) => {
	const [gender, setGender] = useState("male");
	const [age, setAge] = useState(0);
	const [weight, setWeight] = useState(0);
	const [openModal, setOpenModal] = useState(false);
	const [food, setFood] = useState("");
	const [care, setCare] = useState("");
	const [vaccination, setVaccination] = useState("");
	const [deworming, setDeworming] = useState("deworming-0");
	const [sterilized, setSterilized] = useState("sterilized-no");
	const [appetite, setAppetite] = useState(0);
	const [step, setStep] = useState(0);
	const [modal, setModal] = useState(0);

	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");
	const [number, setNumber] = useState("");
	const [numberError, setNumberError] = useState("");
	const [comment, setComment] = useState("");
	const [commentError, setCommentError] = useState("");

	const isAN = (value) => {
		if (value instanceof Number) value = value.valueOf();

		return isFinite(value) && value === parseInt(value, 10);
	};

	const validateName = (name) => {
		if (name.length <= 0) {
			setNameError("Введіть ім'я");
			return false;
		}

		setNameError("");
		return true;
	};

	const validateNumber = (number) => {
		if ((number.length === 10 || number.length === 12) && isAN(+number)) {
			setNumberError("");
			return true;
		}

		setNumberError("Введіть правильний номер");
		return false;
	};

	const validateComment = (comment) => {
		if (comment.length <= 0) {
			setCommentError("Введіть коментар");
			return false;
		}

		setCommentError("");
		return true;
	};

	const onChangeGender = (e) => {
		setGender(e.target.id);
	};

	const onChangeAge = (e) => {
		setAge(+e.target.value);
	};

	const onChangeWeight = (e) => {
		setWeight(+e.target.value);
	};

	const onChangeDeworming = (e) => {
		setDeworming(e.target.id);
	};

	const onChangeSterilized = (e) => {
		setSterilized(e.target.id);
	};

	const onChangeAppetite = (e) => {
		setAppetite(+e.target.value);
	};

	const onClickHandler = (e) => {
		e.preventDefault();

		if (step === 0) {
			if (age === 0) {
				setFood(pet.foodForLittle);
				setCare(pet.careForLittle);
			} else {
				setFood(pet.food);
				setCare(pet.care);
			}

			if (weight === 6) {
				setFood("Треба менше їсти.");
			}

			if (weight === 0 && age === 11) {
				setFood("Треба більше їсти.");
			}

			setVaccination(pet.vaccination);
		} else if (step === 2) {
			setModal(0);
			setOpenModal(true);
			setStep(0);

			return;
		}

		setStep(step + 1);
	};

	const closeModal = () => {
		setOpenModal(false);
	};

	const onClickOnlineHandler = () => {
		setModal(1);
	};

	const onChangeName = (e) => {
		setName(e.target.value);
	};

	const onChangeNumber = (e) => {
		setNumber(e.target.value);
	};

	const onChangeComment = (e) => {
		setComment(e.target.value);
	};

	const createAppointment = (e) => {
		e.preventDefault();

		const isValidName = validateName(name);
		const isValidNumber = validateNumber(number);
		const isValidComment = validateComment(comment);

		if (isValidName && isValidNumber && isValidComment) {
			axios
				.post(
					"/appointments/create",
					{ name, number, comment },
					{
						headers: {
							Authorization:
								"Bearer " + localStorage.getItem("token"),
						},
					}
				)
				.then(() => {
					setName("");
					setNumber("");
					setModal(2);
				});
		}
	};

	let petSettings = (
		<>
			<div className={styles.FormGroup}>
				<span className={styles.FormGroupTitle}>Стать</span>
				<div className={styles.FormGroupContent}>
					<Radio
						title="Чоловіча"
						name="gender"
						id="male"
						onChange={onChangeGender}
						checked={gender === "male"}
					/>
					<Radio
						title="Жіноча"
						name="gender"
						id="female"
						onChange={onChangeGender}
						checked={gender === "female"}
					/>
				</div>
			</div>
			<Range
				title={"Вік"}
				name={"age"}
				id={"age"}
				min={0}
				max={11}
				value={age}
				displayValue={ages[age]}
				onChange={onChangeAge}
			/>
			<Range
				title={"Вага"}
				name={"weight"}
				id={"weight"}
				min={0}
				max={6}
				value={weight}
				displayValue={weights[kind][weight]}
				onChange={onChangeWeight}
			/>
		</>
	);

	if (step === 1) {
		petSettings = (
			<>
				<span className={styles.Title}>
					Чи є у вашого улюбленця проблеми з апетитом?
				</span>
				<Range
					title={"Немає"}
					name={"appetite"}
					id={"appetite"}
					min={0}
					max={10}
					value={appetite}
					onChange={onChangeAppetite}
					displayValue={"Надмірний апетит"}
				/>
				<div className={[styles.FormGroup, styles.FormGroupStep].join(" ")}>
					<span className={styles.Title}>
						Як часто ви здійснюєте дегельмінтизацію тварини?
					</span>
					<div className={styles.FormGroupContent}>
						<Radio
							title="Не здійснюю"
							name="deworming"
							id="deworming-0"
							onChange={onChangeDeworming}
							checked={deworming === "deworming-0"}
						/>
						<Radio
							title="Раз в 3 місяці"
							name="deworming"
							id="deworming-3"
							onChange={onChangeDeworming}
							checked={deworming === "deworming-3"}
						/>
						<Radio
							title="Раз в півроку"
							name="deworming"
							id="deworming-6"
							onChange={onChangeDeworming}
							checked={deworming === "deworming-6"}
						/>
						<Radio
							title="Раз в рік"
							name="deworming"
							id="deworming-12"
							onChange={onChangeDeworming}
							checked={deworming === "deworming-12"}
						/>
					</div>
				</div>
				<div className={[styles.FormGroup, styles.FormGroupStep].join(" ")}>
					<span className={styles.Title}>
						Чи ваш улюбленець стерилізований?
					</span>
					<div className={styles.FormGroupContent}>
						<Radio
							title="Ні"
							name="sterilized"
							id="sterilized-no"
							onChange={onChangeSterilized}
							checked={sterilized === "sterilized-no"}
						/>
						<Radio
							title="Так"
							name="sterilized"
							id="sterilized-yes"
							onChange={onChangeSterilized}
							checked={sterilized === "sterilized-yes"}
						/>
					</div>
				</div>
			</>
		);
	} else if (step === 2) {
		petSettings = (
			<textarea placeholder="Що саме турбує вашого улюбленця?"></textarea>
		);
	}

	let modalContent = (
		<>
			<Title tag="h4" color="red">
				Особливості харчування
			</Title>
			<p className={styles.ModalDescr}>{food}</p>
			<Title tag="h4" color="red">
				Особливості догляду
			</Title>
			<p className={styles.ModalDescr}>{care}</p>
			<Title tag="h4" color="red">
				Особливості вакцинації
			</Title>
			<p className={styles.ModalDescr}>{vaccination}</p>

			<div className={styles.Online}>
				<span>Не отримали відповідь на запитання?</span>
				<button
					className={styles.OnlineBtn}
					onClick={onClickOnlineHandler}
				>
					Записатися на онлайн консультацію
				</button>
			</div>
		</>
	);

	if (modal === 1) {
		modalContent = (
			<form>
				<Input
					type="text"
					name="name"
					placeholder="Ім'я"
					value={name}
					error={nameError}
					onChange={onChangeName}
				/>
				<Input
					type="text"
					name="number"
					placeholder="Номер телефону"
					value={number}
					error={numberError}
					onChange={onChangeNumber}
				/>
				<TextArea
					placeholder="Що саме вас турбує?"
					value={comment}
					onChange={onChangeComment}
					error={commentError}
				/>
				<Button onClick={createAppointment}>
					Записатися на онлайн консультацію
				</Button>
			</form>
		);
	} else if (modal === 2) {
		modalContent = (
			<>
				<p className={styles.AppointmentDescr}>
					Протягом дня з вами зв'яжеться наш адміністратор для
					узгодження дати онлайн консультації
				</p>
				<p className={styles.AppointmentDescr}>
					У невідкладному випадку зв'яжіться з нами за номером:
					<a href="tel:+380990990909">+(380) 99-099-09-09</a>
				</p>
			</>
		);
	}

	return (
		<>
			<Modal closeModal={closeModal} opened={openModal}>
				{modalContent}
			</Modal>

			<div className={styles.PetSettings}>
				<Title tag="h3" color="red">
					{pet.name}
				</Title>
				<p className={styles.Descr}>{pet.descr}</p>
				<form>
					{petSettings}
					<Button onClick={onClickHandler}>
						{step === 2 ? "Дізнатися більше" : "Далі"}
					</Button>
				</form>
			</div>
		</>
	);
};

PetSettings.propTypes = {
	pet: PropTypes.object,
	kind: PropTypes.string,
};

export default PetSettings;
