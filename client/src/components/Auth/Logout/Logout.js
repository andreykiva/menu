import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/auth/authContext';

const Logout = () => {
	const { logout } = useContext(AuthContext);

	useEffect(() => {
		logout();
	}, []);

	return <></>;
};

export default Logout;
