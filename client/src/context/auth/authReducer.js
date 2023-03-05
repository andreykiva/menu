import { LOGOUT, AUTH_SUCCESS } from '../types';

const handlers = {
	[LOGOUT]: (state) => ({
		...state,
		isAuthenticated: false,
		roles: []
	}),
	[AUTH_SUCCESS]: (state, { payload }) => {
		return {
			...state,
			isAuthenticated: true,
			roles: payload
		};
	},
	DEFAULT: (state) => state
};

export const authReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};
