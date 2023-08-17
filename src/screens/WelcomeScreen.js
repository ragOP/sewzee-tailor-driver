import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const handleTailorLogin = () => {
    // Perform tailor login logic, e.g., authenticate the user
    navigation.navigate('TailorLogin');
  };
  const handleDriverLogin = () => {
    // Perform driver login logic, e.g., authenticate the user
    navigation.navigate('DriverLogin');
  };

  return (
    <View style={styles.container}>
      <Button title="Login as Tailor" onPress={handleTailorLogin} style={styles.button} />
      <Button title="Login as Driver" onPress={handleDriverLogin} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff6f00',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Add shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default WelcomeScreen;
