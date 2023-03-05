import React from 'react';
import { AuthState } from '../../context/auth/AuthState';

export default function (Component) {
	return function AuthHOCInner() {
		return (
			<AuthState>
				<Component />
			</AuthState>
		);
	};
}
