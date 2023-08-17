import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import OtpInput from '../screens/OtpInput';
import PaperText from '../Ui/PaperText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useRoute } from '@react-navigation/native';

const DriverOtpScreen = ({navigation}) => {
  const [otpInput, setOtpInput] = useState('')
  const [isUserRegistered, setIsUserRegistered] = useState(null);
  
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
    {isUserRegistered ? navigation.navigate('DriverBottomNavigation') : navigation.navigate('DriverForm')}
  };

  return (
    <SafeAreaView style={styles.container}>
      <PaperText
          text="Welcome"
          variant="headlineMedium"
          fontStyling={styles.heading}
        />
        <PaperText
          text="Please Enter the OTP"
          variant="titleMedium"
          fontStyling={styles.title}
        />
      <View style={styles.inputFieldContainer}>
          <OtpInput setValue={setOtpInput} value={otpInput} />
        </View>
      <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resendButton}>
        <Text style={styles.resendButtonText}>Resend OTP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    color: "#7D5FFE",
    marginTop:150
  },
  title: {
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    color: "#7D5FFEB0",
    marginBottom: 10,
  },
  inputFieldContainer: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
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

export default DriverOtpScreen;
