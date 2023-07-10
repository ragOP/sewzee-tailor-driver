import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Button 1 pressed')}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>My Orders</Text>
          <Image source={require("../Tailor/assets/chevron-left.png")} style={styles.image} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Support')}>
        <Text style={styles.buttonText}>Support & FAQ’s</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
        <Text style={styles.buttonText}>About </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Logout </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  button: {
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 5,
    width: '95%',
    height:80
   
  },
  button2: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 12,
    width: '48%',
    height:50,
    alignItems:'center',
    borderWidth:0.5,
    marginRight:180
   
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    padding:10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft:10
  },
  image: {
    padding:10,
    width: 20,
    height: 25,
    marginLeft: 10,
  },
});
