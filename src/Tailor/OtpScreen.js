import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import OtpInput from '../screens/OtpInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useRoute } from '@react-navigation/native';

const OtpScreen = ({navigation}) => {
  const route = useRoute();
  // const [verificationCode, setVerificationCode] = useState('');
  // const { confirmation } = route.params
  const [isUserRegistered, setIsUserRegistered] = useState(null);
  const [otpInput, setOtpInput] = useState('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        let data = await AsyncStorage.getItem('userRegistered');
        if (data) {
          const parsedData = JSON.parse(data);
          setIsUserRegistered(parsedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUserInfo();
  }, []); 

 
  const verifyOTP = async () => {
    try {
      await confirmation.confirm(verificationCode);
     console.log('successfull');
    } catch (error) {
      console.log('Invalid verification code:', error);
    }
  };

  const handleOtpSubmit = () => {
    // verifyOTP()
    {isUserRegistered ? navigation.navigate('BottomNavigation') : navigation.navigate('TailorForm')}
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
      <TouchableOpacity style={styles.resendButton} onPress={handleOtpSubmit}>
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
