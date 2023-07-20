import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity ,Image} from 'react-native';
import PaperText from "../Ui/PaperText";
const TailorLogin = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const isPhoneValid = phoneNumber.length === 10;
  

const navigateOtp = () => {
    navigation.navigate('OtpScreen');
  };

  return (
    <>
    <Image source={require("./assets/tailor.jpg")} style={styles.image}/>

    <View style={styles.container}>
      
        <PaperText
          text="Please Enter Your Mobile No, Below"
          variant="titleMedium"
          fontStyling={styles.heading}
        />
      <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>+91 |</Text>
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
        style={[styles.loginButton, { opacity: isPhoneValid ? 1 : 0.2 }]}
        onPress={navigateOtp}
        disabled={!isPhoneValid}
      >
        <Text style={styles.loginButtonText}>Get OTP</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "75%",
    // marginTop: "auto",
    backgroundColor: '#fff',
    padding: 15,
    
    
  },
  heading: {
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    color: "#7D5FFE",
    // marginBottom: 10,
    // marginTop: 150,
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
