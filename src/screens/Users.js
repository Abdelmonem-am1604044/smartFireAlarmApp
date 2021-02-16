import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-elements';
import { Context as AuthContext } from '../contexts/authContext';
import Spacer from '../components/Spacer';

  export default function Users(){
    const { signOut } = useContext(AuthContext);

	return (
    <SafeAreaView>
      <Spacer>
        <Text h2> Account Screen </Text>
        <Button
          title="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Spacer>
    </SafeAreaView>
  );
}