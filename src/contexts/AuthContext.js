import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import api from '../api/server';
import { navigate } from '../navigatorRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { token: action.payload, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    case 'token':
      return { ...state, isSigned: action.payload };
    default:
      return state;
  }
};

const clearMessage = (dispatch) => () => dispatch({ type: 'clear_message' });

const signIn = (dispatch) => async ({ username, password }) => {
  try {
    const response = await api.post('/signin', { username, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ action: 'signin', payload: response.data.token });
    navigate('Home');
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with the signin',
    });
  }
};

const signUp = (dispatch) => async ({ username, password }) => {
  try {
    const response = await api.post('/signup', { username, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ action: 'signin', payload: response.data.token });
    navigate('Home');
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with the signup',
    });
  }
};

const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  navigate('Sign In');
  dispatch({ action: 'signout' });
};

const isSignedIn = (dispatch) => async () => {
  let token = await AsyncStorage.getItem('token');
  console.log(token);
  if (token) {
    dispatch({ action: 'token', payload: true });
  } else {
    dispatch({ action: 'token', payload: false });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signOut, signUp, clearMessage, isSignedIn },
  { token: null, errorMessage: '', isSigned: false }
);
