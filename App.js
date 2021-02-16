/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Map from './src/screens/Map.js';
import Sensors from './src/screens/Sensors';
import Users from './src/screens/Users';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import { Provider as SensorDataProvider } from './src/contexts/statsContext';
import { Provider as AuthProvider } from './src/contexts/authContext';
import { navigationRef } from './src/navigatorRef';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const Stack = createStackNavigator();
  const MainFlow = createBottomTabNavigator();
  let token = null;

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
          name="Sensor"
          component={Sensors}
          options={{
            tabBarIcon: () => <FontAwesome name="th-list" size={23} />,
          }}
        />
        <MainFlow.Screen
          name="Map"
          component={Map}
          options={{
            tabBarLabel: 'Add Track',
            tabBarIcon: () => <FontAwesome name="map" size={23} />,
          }}
        />
        <MainFlow.Screen
          name="Users"
          component={Users}
          options={{ tabBarIcon: () => <FontAwesome name="user" size={23} /> }}
        />
      </MainFlow.Navigator>
    );
  }

  async function loadToken() {
    let possible = await AsyncStorage.getItem('token');
    token = possible;
  }

  useEffect(() => {
    loadToken();
    // console.log(token);
  }, []);

  return (
    <SensorDataProvider>
      <AuthProvider>
        {token ? (
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Sign In" component={SigninScreen} />
                <Stack.Screen name="Sign Up" component={SignupScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          ) : (
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Sign In" component={SigninScreen} />
                <Stack.Screen name="Sign Up" component={SignupScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          )}
      </AuthProvider>
    </SensorDataProvider>
  );
}
