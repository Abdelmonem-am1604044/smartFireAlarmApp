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
import { FontAwesome } from '@expo/vector-icons';
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
      <MainFlow.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <MainFlow.Screen
          name="Sensors"
          component={Sensors}
          options={{
            tabBarIcon: () => <FontAwesome name="th-list" size={23} />,
          }}
        />
        <MainFlow.Screen
          name="Map"
          component={Map}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: () => <FontAwesome name="map" size={23} />,
          }}
        />
        <MainFlow.Screen
          name="Account"
          component={Users}
          options={{ tabBarIcon: () => <FontAwesome name="user" size={23} /> }}
        />
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
