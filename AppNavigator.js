import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import TailorPage from './screens/TailorPage';
import DriverPage from './Driver/DriverPage';
import TailorHomepage from './Tailor/TailorHomepage';
import ParticularOrderDetails from './Tailor/ParticularOrderDetails';
import Payment from './screens/Payment';
import AllOrder from './Tailor/AllOrder';
import DriverHomePage from './Driver/DriverHomePage'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="TailorPage" component={TailorPage} />
      <Stack.Screen name="DriverPage" component={DriverPage} />
      <Stack.Screen name="TailorHomePage" component={TailorHomepage} />
      <Stack.Screen name="DriverHomePage" component={DriverHomePage} />
      <Stack.Screen name="ParticularOrderDetails" component={ParticularOrderDetails}/>
      <Stack.Screen name="AllOrder" component={AllOrder} />

      <Stack.Screen name="Payment" component={Payment} />

    </Stack.Navigator>
  );
};

export default AppNavigator;
