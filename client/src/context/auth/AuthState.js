import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { LOGOUT, AUTH_SUCCESS } from '../types';
import { AuthContext } from './authContext';
import { authReducer } from './authReducer';
import axios from '../../axios-pets';

export const AuthState = ({ children }) => {
	const initialState = {
		isAuthenticated: false,
		roles: []
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		dispatch({ type: LOGOUT });
	};

	const getRoles = async (token) => {
		const { data } = await axios.get('/auth/roles', {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});

		return data.roles;
	};

	const authSuccess = async (token) => {
		const myRoles = await getRoles(token);

		dispatch({ type: AUTH_SUCCESS, payload: myRoles });
	};

	const { isAuthenticated, roles } = state;

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				roles,
				logout,
				authSuccess
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthState.propTypes = {
	children: PropTypes.any
};
