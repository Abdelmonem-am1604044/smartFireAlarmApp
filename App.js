/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Map from './src/screens/Map.js';
import Sensors from './src/screens/Sensors';
import Users from './src/screens/Users';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import { Provider as SensorDataProvider } from './src/contexts/statsContext';
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from './src/contexts/AuthContext';
import { navigationRef } from './src/navigatorRef';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const Stack = createStackNavigator();
  const MainFlow = createBottomTabNavigator();

  const [signedIn, setSignedIn] = useState(false);
  const [checkedSignedIn, setCheckedSignedIn] = useState(false);

  const isSignedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token')
        .then((res) => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => reject(err));
    });
  };

  function Home() {
    return (
      <MainFlow.Navigator>
        <MainFlow.Screen name="Sensors" component={Sensors} />
        <MainFlow.Screen name="Map" component={Map} />
      </MainFlow.Navigator>
    );
  }

  useEffect(() => {
    isSignedIn()
      .then((res) => {
        // console.log(res);
        setCheckedSignedIn(true);
        setSignedIn(res);
      })
      .catch((err) => alert('An error occurred'));
  }, []);

  if (!checkedSignedIn) {
    return null;
  }

  return signedIn ? (
    <SensorDataProvider>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            {/* <Stack.Screen name="Sign Up" component={SignupScreen} />
            <Stack.Screen name="Sign In" component={SigninScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SensorDataProvider>
  ) : (
    <SensorDataProvider>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Sign Up" component={SignupScreen} />
            <Stack.Screen name="Sign In" component={SigninScreen} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SensorDataProvider>
  );
}
