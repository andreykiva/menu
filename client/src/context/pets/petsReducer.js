import { GET_BREEDS, GET_PET, SET_LOADING } from '../types';

const handlers = {
	[GET_BREEDS]: (state, { payload }) => ({
		...state,
		breeds: payload,
		loading: false
	}),
	[GET_PET]: (state, { payload }) => ({
		...state,
		pet: payload,
		loading: false
	}),
	[SET_LOADING]: (state) => ({
		...state,
		loading: true
	}),
	DEFAULT: (state) => state
};

export const petsReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};
