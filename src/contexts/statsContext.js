import createDataContext from './createDataContext';
import api from '../api/server';

const statsReducer = (state, action) => {
	switch (action.type) {
		case 'get_data':
			return { ...state, data: action.payload };
		default:
			return state;
	}
};

const getStats = (dispatch) => async() => {
	const response = await api.get('/data');
	dispatch({ type: 'get_data', payload: response.data });
};

export const { Context, Provider } = createDataContext(
	statsReducer,
	{ getStats },
	{ data: null }
);
