import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { navigate } from '../navigatorRef';

export default function AuthForm({
  headerText,
  errorMessage,
  submitText,
  onSubmit,
  navigateTo,
  navigateText,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Spacer>
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Spacer>
      <Spacer>
        <Input
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Spacer>
      {errorMessage ? (
        <Spacer>
          <Text style={styles.error}>{errorMessage}</Text>
        </Spacer>
      ) : null}
      <Spacer>
        <Button
          title={submitText}
          onPress={() => {
            onSubmit({ username, password });
          }}
        />
      </Spacer>
      <Spacer>
        <TouchableOpacity
          onPress={() => {
            navigate(navigateTo);
          }}
        >
          <Text style={styles.signin}>{navigateText}</Text>
        </TouchableOpacity>
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 155,
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  signin: {
    color: 'blue',
    fontSize: 16,
  },
});
