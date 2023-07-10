import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const TailorPage = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Perform sign-in logic here
    // For demo purposes, let's navigate to the TailorHomePage
    navigation.navigate('BottomNavigation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Tailor Page!</Text>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  signInButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TailorPage;
