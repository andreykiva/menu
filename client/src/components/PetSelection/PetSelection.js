import React from 'react';
import Title from '../UI/Title/Title';
import PetItem from './PetItem/PetItem';
import styles from './PetSelection.module.css';

const PetSelection = () => {
	return (
		<div className={styles.PetSelection}>
			<Title tag="h1">
				Здоров&apos;я - унікальне для кожного домашнього улюбленця
			</Title>
			<div className={styles.PetItems}>
				<PetItem title="Коти" url="/pets/cats" type="cats" />
				<PetItem title="Собаки" url="/pets/dogs" type="dogs" />
			</div>
		</div>
	);
};

export default PetSelection;
