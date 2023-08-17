import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get("window");

const SplashScreen = () => {
    const navigation = useNavigation();

    const navigationHandler=()=>{
        setTimeout(async()=>{
            let token = await AsyncStorage.getItem('userToken');
            let userRole = await AsyncStorage.getItem('userRole');
            console.log('token', token);
            if(!token){
                navigation.navigate("Welcome");
            }else{
                if(userRole === 'driver'){
                    navigation.replace("DriverBottomNavigation")
                } else {
                    navigation.replace("BottomNavigation")
                }
            }
        }, 1000)
    }

    useEffect(()=>{
        navigationHandler() 
    },[])

  return (
    <View style={styles.screen}>
    
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    screen:{
        backgroundColor:"#F5F5F5",
        flex:1
    },
    logo:{
        marginTop:height-450,
        alignSelf:"center"
    }
})