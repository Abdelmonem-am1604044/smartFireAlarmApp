import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

const SigninScreen = ({ navigation }) => {
  const { state, signIn, clearMessage } = useContext(AuthContext);

  useEffect(() => {
    navigation.addListener('blur', () => {
      clearMessage();
    });
  }, [navigation]);

  return (
    <AuthForm
      errorMessage={state.errorMessage}
      onSubmit={signIn}
      submitText={'Sign In'}
      headerText={'Sign In For SFAS'}
      navigateText={"Don't have an account? Sign Up"}
      navigateTo={'Sign Up'}
    />
  );
};

export default SigninScreen;
