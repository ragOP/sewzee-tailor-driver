import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import OtpInput from '../screens/OtpInput';
const OtpScreen = ({navigation}) => {
  const [otpInput, setOtpInput] = useState('')

  const handleOtpSubmit = () => {
    navigation.navigate('TailorForm');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the OTP</Text>
      <Text style={styles.subtitle}>We have sent you an OTP on your mobile number</Text>
      <View style={styles.otpContainer}>
        <OtpInput setValue={setOtpInput} value={otpInput}/>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resendButton}>
        <Text style={styles.resendButtonText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:80,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
 
  button: {
    backgroundColor: '#7d5ffe',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    width:"96%",
    height:55
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  resendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resendButtonText: {
    color: '#7d5ffe',
    fontSize: 16,
  },
});

export default OtpScreen;
