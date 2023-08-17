import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import PaperText from "../Ui/PaperText";
import { ToastMsg } from '../Ui/ToastMsg';
import Loader from '../Ui/Loader';
import { apiHelper, commonValue, endpoints } from '../api';
import Fonts from '../theme/font';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriverLogin = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('1234567890'); 
  const [countryCode, setCountryCode] = useState('+91')
  const [isLoading, setIsLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState();
  const isPhoneValid = phoneNumber.length === 10;

  useEffect(() => {
    getFCMToken();
  }, []);

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      setFcmToken(token);
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  };
  
  const methodDriverLoginApiCall = async () => {
    try {
      setIsLoading(true)
      const response = await apiHelper.post({
        url:
          endpoints.LOGIN_DRIVER,
          data: {
          "number": countryCode + phoneNumber,
          "fcmtoken": ""
        },
      }, false);
      setIsLoading(false)
      if (response && response.token) {
        // sendOTP()
        await AsyncStorage.setItem('userToken', response?.token);
        await AsyncStorage.setItem('userRole', response?.role);
        await AsyncStorage.setItem('userRegistered',  JSON.stringify(response.isComplete));
        ToastMsg('OTP sent successfully', 'success');
        navigation.navigate('DriverOtpScreen')
        setPhoneNumber('')
      } else {
        ToastMsg(commonValue.kSorryError);
      }
    } catch (error) {
      setIsLoading(false)
      ToastMsg(commonValue.kSorryError);
    }
  };

  const sendOTP = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(countryCode + phoneNumber);
      ToastMsg('OTP sent Successfully', 'success')
      navigation.navigate('OtpScreen', { confirmation });
    } catch (error) {
      console.log('Error sending OTP:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("./assets/Driver.jpg")} style={styles.image} />
      <View style={{paddingHorizontal: 10, marginTop: 20}}>
        <PaperText
          text="Please Enter Your Mobile No, Below"
          variant="titleMedium"
          fontStyling={styles.heading}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{countryCode} |</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#666"
            keyboardType="phone-pad"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            maxLength={10}
          />
        </View>
        <TouchableOpacity
          style={[styles.loginButton, { opacity: isPhoneValid ? 1 : 0.6 }]}
          // onPress={() => navigation.navigate('DriverOtpScreen')}
          onPress={methodDriverLoginApiCall}
          disabled={!isPhoneValid}
        >
          <Text style={styles.loginButtonText}>Get OTP</Text>
        </TouchableOpacity>
        </View>
        {isLoading && <Loader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  heading: {
    fontFamily: Fonts.Poppins.bold,
    textAlign: "center",
    color: "#7D5FFE",
  },
  title: {
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    color: "#7D5FFE",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  inputLabel: {
    marginRight: 10,
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#7d5ffe',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  image: {
    width: "100%",
    height: "25%",
    resizeMode: "cover"
  },
});

export default DriverLogin;
