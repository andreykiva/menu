import React, { useContext, useEffect } from 'react';
import BackBtn from '../UI/BackBtn/BackBtn';
import { useParams } from 'react-router-dom';
import styles from './Pet.module.css';
import { PetsContext } from '../../context/pets/petsContext';
import PetSettings from './PetSettings/PetSettings';
import Loader from '../UI/Loader/Loader';

const Pet = () => {
	const { getPet, pet, loading } = useContext(PetsContext);
	const { id, kind } = useParams();

	useEffect(() => {
		getPet(id);
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.Pet}>
			<BackBtn url={`/pets/${kind}`}>Назад</BackBtn>
			<img
				src={`http://localhost:8889/images/${
					pet.mainImg ? pet.mainImg : 'default.png'
				}`}
				alt="pet"
				className={styles.PetImg}
			/>
			<PetSettings pet={pet} kind={kind} />
		</div>
	);
};

export default Pet;
