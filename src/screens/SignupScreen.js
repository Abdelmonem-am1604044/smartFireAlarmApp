import React, { useContext } from 'react';
import { Context as AuthContext } from '../contexts/authContext';
import AuthForm from '../components/AuthForm';

const SignupScreen = () => {
  const { state, signUp } = useContext(AuthContext);
  return (
    <AuthForm
      errorMessage={state.errorMessage}
      onSubmit={signUp}
      submitText={'Sign Up'}
      headerText={'Sign Up For Tracker'}
      navigateText={'Already Have An Account? Sign In'}
      navigateTo={'Sign In'}
    />
  );
};

export default SignupScreen;
