import React, { useContext, useEffect } from 'react';
import BackBtn from '../UI/BackBtn/BackBtn';
import { useParams } from 'react-router-dom';
import Title from '../UI/Title/Title';
import BreedItem from './BreedItem/BreedItem';
import styles from './BreedSelection.module.css';
import { PetsContext } from '../../context/pets/petsContext';
import Loader from '../UI/Loader/Loader';

const BreedSelection = () => {
	const { breeds, getBreeds, loading } = useContext(PetsContext);
	const { kind } = useParams();

	useEffect(() => {
		getBreeds(kind);
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.BreedSelection}>
			<BackBtn url="/">Назад</BackBtn>
			<Title tag="h2">Тепер оберіть породу</Title>
			<div className={styles.BreedItems}>
				{breeds.map((breed) => (
					<BreedItem
						key={breed._id.toString()}
						title={breed.name}
						img={breed.img}
						breadId={breed._id.toString()}
						kind={kind}
					/>
				))}
			</div>
		</div>
	);
};

export default BreedSelection;
