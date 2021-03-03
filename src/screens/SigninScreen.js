import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

const SigninScreen = () => {
  const { state, signIn, clearMessage } = useContext(AuthContext);


  return (
    <AuthForm
      errorMessage={state.errorMessage}
      onSubmit={signIn}
      submitText={'Sign In'}
      headerText={'Civil Defense Sign In'}
      navigateText={"Regular User? Scan QR Code"}
      navigateTo={'Sign Up'}
    />
  );
};

export default SigninScreen;
