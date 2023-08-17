import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 
import ParticularOrderDetails from './src/Tailor/ParticularOrderDetails';
import Payment from './src/screens/Payment';
import Pickup from './src/Tailor/Pickup';
import LeaderBoard from './src/Tailor/LeaderBoard';
import BottomNavigation from './src/Tailor/BottomNavigation';
import DriverBottomNavigation from './src/Driver/DriverBottomNavigation';
import PartricularRideDetails from './src/Driver/ParticularRideDetails';
import Support from './src/screens/Support';
import About from './src/screens/About';
import TailorForm from './src/Tailor/TailorForm';
import Measurement from './src/Driver/Measurement';
import DriverForm from './src/Driver/DriverForm';
import DriverEditProfile from './src/Driver/DriverEditProfile';
import TailorNotification from './src/Tailor/TailorNotification';
import DriverNotification from './src/Driver/DriverNotification';
import AllRide from './src/Driver/AllRide';
import Stich from './src/Tailor/Stich';
import WelcomeScreen from './src/screens/WelcomeScreen';
import TailorLogin from './src/Tailor/TailorLogin';
import OtpScreen from './src/Tailor/OtpScreen';
import DriverLogin from './src/Driver/DriverLogin';
import DriverOtpScreen from './src/Driver/DriverOtpScreen';
import TailorBankDetails from './src/Tailor/TailorBankDetails';
import CustomizationList from './src/Tailor/CustomizationList';
import EditCustomizationList from './src/Tailor/EditCustomizationList';
import SplashScreen from './src/screens/Splash';
import DriverBankDetails from './src/Driver/DriverBankDetails';
import TailorEditProfile from './src/Tailor/TailorEditProfile';
import TailorAllOrders from './src/Tailor/TailorAllOrders';
import DriverAllOrders from './src/Driver/DriverAllOrders';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="TailorLogin" component={TailorLogin} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="TailorForm" component={TailorForm} />
      <Stack.Screen name="CustomizationList" component={CustomizationList} />
      <Stack.Screen name="EditCustomizationList" component={EditCustomizationList} />
      <Stack.Screen name="TailorBankDetails" component={TailorBankDetails} />
      <Stack.Screen name="DriverBankDetails" component={DriverBankDetails} />
      <Stack.Screen name="DriverLogin" component={DriverLogin} />
      <Stack.Screen name="DriverOtpScreen" component={DriverOtpScreen} />
      <Stack.Screen name="DriverForm" component={DriverForm} />
      <Stack.Screen name="Measurement" component={Measurement} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="DriverBottomNavigation" component={DriverBottomNavigation}/>
      <Stack.Screen name="ParticularRideDetails" component={PartricularRideDetails}/>
      <Stack.Screen name="ParticularOrderDetails" component={ParticularOrderDetails}/>
      <Stack.Screen name="TailorAllOrders" component={TailorAllOrders} />
      <Stack.Screen name="DriverAllOrders" component={DriverAllOrders} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Pickup" component={Pickup} />
      <Stack.Screen name="TailorEditProfile" component={TailorEditProfile} />
      <Stack.Screen name="Stich" component={Stich} />
      <Stack.Screen name="DriverEditProfile" component={DriverEditProfile} />
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
