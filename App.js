import React from 'react';
import {} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Map from './src/screens/Map.js';
import Sensors from './src/screens/Sensors';
import Users from './src/screens/Users';
import { Provider as SensorDataProvider } from './src/contexts/statsContext';

export default function App() {
  const MainFlow = createBottomTabNavigator();

  

  return (
    <SensorDataProvider>
      <NavigationContainer>
        <MainFlow.Navigator>
          <MainFlow.Screen name="Sensor" component={Sensors} />
          <MainFlow.Screen name="Map" component={Map} />
          <MainFlow.Screen name="Users" component={Users} />
        </MainFlow.Navigator>
      </NavigationContainer>
    </SensorDataProvider>
  );
}
