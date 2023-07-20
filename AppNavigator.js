import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 
import ParticularOrderDetails from './Tailor/ParticularOrderDetails';
import Payment from './screens/Payment';
import AllOrder from './Tailor/AllOrder';
import Pickup from './Tailor/Pickup';
import LeaderBoard from './Tailor/LeaderBoard';
import BottomNavigation from './Tailor/BottomNavigation';
import DriverBottomNavigation from './Driver/DriverBottomNavigation';
import PartricularRideDetails from './Driver/ParticularRideDetails';
import Support from './screens/Support';
import About from './screens/About';
import TailorForm from './Tailor/TailorForm';
import CompleteProfile from './Tailor/CompleteProfile';
import Measurement from './Driver/Measurement';
import DriverForm from './Driver/DriverForm';
import DriverCompleteProfile from './Driver/DriverCompleteProfile';
import TailorNotification from './Tailor/TailorNotification';
import DriverNotification from './Driver/DriverNotification';
import AllRide from './Driver/AllRide';
import Stich from './Tailor/Stich';
import WelcomeScreen from './screens/WelcomeScreen';
import TailorLogin from './Tailor/TailorLogin';
import OtpScreen from './Tailor/OtpScreen';
import DriverLogin from './Driver/DriverLogin';
import DriverOtpScreen from './Driver/DriverOtpScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="TailorLogin" component={TailorLogin} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="TailorForm" component={TailorForm} />
      <Stack.Screen name="DriverLogin" component={DriverLogin} />
      <Stack.Screen name="DriverOtpScreen" component={DriverOtpScreen} />
      <Stack.Screen name="DriverForm" component={DriverForm} />
      <Stack.Screen name="Measurement" component={Measurement} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="DriverBottomNavigation" component={DriverBottomNavigation}/>
      <Stack.Screen name="ParticularRideDetails" component={PartricularRideDetails}/>
      <Stack.Screen name="ParticularOrderDetails" component={ParticularOrderDetails}/>
      <Stack.Screen name="AllOrder" component={AllOrder} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Pickup" component={Pickup} />
      <Stack.Screen name="Complete" component={CompleteProfile} />
      <Stack.Screen name="Stich" component={Stich} />
      <Stack.Screen name="DriverComplete" component={DriverCompleteProfile} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="AllRide" component={AllRide} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
      <Stack.Screen name="TailorNotification" component={TailorNotification} />
      <Stack.Screen name="DriverNotication" component={DriverNotification} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
