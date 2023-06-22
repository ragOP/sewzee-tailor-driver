import React from 'react';
import { View, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const handleTailorLogin = () => {
    // Perform tailor login logic, e.g., authenticate the user
    navigation.navigate('TailorPage');
  };

  const handleDriverLogin = () => {
    // Perform driver login logic, e.g., authenticate the user
    navigation.navigate('DriverPage');
  };

  return (
    <View>
      <Button title="Login as Tailor" onPress={handleTailorLogin} />
      <Button title="Login as Driver" onPress={handleDriverLogin} />
    </View>
  );
};

export default LoginScreen;
