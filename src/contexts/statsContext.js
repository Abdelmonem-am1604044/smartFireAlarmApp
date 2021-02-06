import createDataContext from './createDataContext';
import api from '../api/server';

const statsReducer = (state, action) => {
  switch (action.type) {
    case 'get_data':
      return { ...state, data: action.payload };
    case 'set_data':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const getStats = (dispatch) => async () => {
  const response = await api.get('/data');
  console.log(response.data);
  dispatch({ type: 'get_data', payload: response.data });
};

const setStats = (dispatch) => async (data) => {
  dispatch({ type: 'set_data', payload: data });
};

export const { Context, Provider } = createDataContext(
  statsReducer,
  { getStats, setStats },
  { data: null }
);
