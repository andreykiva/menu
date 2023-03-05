import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BreedSelection from './components/BreedSelection/BreedSelection';
import PetSelection from './components/PetSelection/PetSelection';
import Pet from './components/Pet/Pet';
import { PetsState } from './context/pets/PetsState';
import Layout from './hoc/Layout/Layout';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Logout from './components/Auth/Logout/Logout';
import Articles from './components/Articles/Articles';
import { AuthContext } from './context/auth/authContext';
import AuthHOC from './hoc/AuthHOC/AuthHOC';

const App = () => {
	const { logout, authSuccess } = useContext(AuthContext);

	useEffect(() => {
		const expirationDate = localStorage.getItem('expirationDate');
		const token = localStorage.getItem('token');

		if (!token || !expirationDate || new Date(expirationDate) <= new Date()) {
			logout();
		} else {
			authSuccess(token);
		}
	}, []);

	let routes = (
		<Routes>
			<Route path="/pets/:kind/:id" element={<Pet />} />
			<Route path="/pets/:kind" element={<BreedSelection />} />
			<Route path="/articles" element={<Articles />} />
			<Route path="/logout" element={<Logout />} />
			<Route path="/" exact element={<PetSelection />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);

	if (!localStorage.getItem('token')) {
		routes = (
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		);
	}

	return (
		<PetsState>
			<BrowserRouter>
				<Layout>{routes}</Layout>
			</BrowserRouter>
		</PetsState>
	);
};

export default AuthHOC(App);
