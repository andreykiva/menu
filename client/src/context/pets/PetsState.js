import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from '../../axios-pets';
import { GET_BREEDS, GET_PET, SET_LOADING } from '../types';
import { PetsContext } from './petsContext';
import { petsReducer } from './petsReducer';

export const PetsState = ({ children }) => {
	const initialState = {
		breeds: [],
		pet: {},
		loading: false
	};

	const [state, dispatch] = useReducer(petsReducer, initialState);

	const getBreeds = async (kind) => {
		setLoading();

		const response = await axios.get(`/pets/${kind}`, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			}
		});

		dispatch({ type: GET_BREEDS, payload: response.data });
	};

	const getPet = async (petId) => {
		let pet = null;

		if (breeds.length) {
			pet = breeds.find((breed) => breed._id === petId);
		} else {
			setLoading();
			const response = await axios.get(`/pet/${petId}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token')
				}
			});
			pet = response.data;
		}

		dispatch({ type: GET_PET, payload: pet });
	};

	const setLoading = async () => {
		dispatch({ type: SET_LOADING });
	};

	const { breeds, pet, loading } = state;

	return (
		<PetsContext.Provider
			value={{
				setLoading,
				getBreeds,
				getPet,
				breeds,
				pet,
				loading
			}}
		>
			{children}
		</PetsContext.Provider>
	);
};

PetsState.propTypes = {
	children: PropTypes.any
};
