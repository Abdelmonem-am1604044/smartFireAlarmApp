import React, { useContext } from 'react';
import { Context as AuthContext } from '../contexts/AuthContext';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { navigate } from '../navigatorRef';

const SignupScreen = () => {
  const { signUp } = useContext(AuthContext);

  const onSuccess = (e) => {
    signUp(e.data);
  };

  const onPress = () => {
    navigate('Sign In');
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      topContent={
        <Text style={styles.centerText}>Scan Your Sensor To View Its Data</Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable} onPress={onPress}>
          <Text style={styles.buttonText}>Civil Defense?</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 5,
  },
});

export default SignupScreen;
