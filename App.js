import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator'
import FlashMessage from "react-native-flash-message";
import messaging from '@react-native-firebase/messaging';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
