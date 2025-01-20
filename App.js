// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import DetailsScreen from './screens/DetailsScreen'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
      
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: true, title: 'Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
