import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import TailorPage from './Tailor/TailorPage';
import DriverPage from './Driver/DriverPage';
import TailorHomepage from './Tailor/TailorHomepage';
import ParticularOrderDetails from './Tailor/ParticularOrderDetails';
import Payment from './screens/Payment';
import AllOrder from './Tailor/AllOrder';
import DriverHomePage from './Driver/DriverHomePage'
import Pickup from './Tailor/Pickup';
import LeaderBoard from './Tailor/LeaderBoard';
import BottomNavigation from './Tailor/BottomNavigation';
import DriverBottomNavigation from './Driver/DriverBottomNavigation';
import PartricularRideDetails from './Driver/ParticularRideDetails';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="TailorPage" component={TailorPage} />
      <Stack.Screen name="DriverPage" component={DriverPage} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="DriverBottomNavigation" component={DriverBottomNavigation}/>
      <Stack.Screen name="ParticularRideDetails" component={PartricularRideDetails}/>
      <Stack.Screen name="ParticularOrderDetails" component={ParticularOrderDetails}/>
      <Stack.Screen name="AllOrder" component={AllOrder} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Pickup" component={Pickup} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
