import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity ,Image, SafeAreaView} from 'react-native';
import PaperText from "../Ui/PaperText";
import Loader from '../Ui/Loader';
import { ToastMsg } from '../Ui/ToastMsg';
import { apiHelper, commonValue, endpoints } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import Fonts from '../theme/font';

const TailorLogin = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('1234512345');  //1234512345
  const [countryCode, setCountryCode] = useState('+91')
  const [isLoading, setIsLoading] = useState(false);
  const isPhoneValid = phoneNumber.length === 10;

  const methodTailorLoginApiCall = async () => {
    try {
      setIsLoading(true)
      const response = await apiHelper.post({
        url:
          endpoints.LOGIN_TAILOR,
          data: {
          "number": countryCode + phoneNumber,
          "fcmtoken": ""
        },
      }, false);
      setIsLoading(false)
      if (response && response.token) {
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userRegistered',  JSON.stringify(response.isComplete));
        ToastMsg('Login Successfully', 'success')
        navigation.navigate('OtpScreen')
        // sendOTP()
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
    <Image source={require("./assets/tailor.jpg")} style={styles.image}/>
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
        // onPress={() => navigation.navigate('OtpScreen')}
        onPress={methodTailorLoginApiCall}
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

export default TailorLogin;
