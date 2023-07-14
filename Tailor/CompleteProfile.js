import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

import PaperAppBar from '../Ui/PaperAppBar'
import MaterialIconsItem from '../Ui/MaterialIconsItem'
import { Appbar } from "react-native-paper";

import BankDetails from '../screens/BankDetails';

const CompleteProfile = ({navigation}) => {
  return (
    <>
      <PaperAppBar>
    <TouchableOpacity
      styling={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <MaterialIconsItem
        name="arrow-back-ios"
        color={"#4F5663"}
        size={25}
      />
    </TouchableOpacity>
    <Appbar.Content titleStyle={styles.header} title="My Profile" />
  </PaperAppBar>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.view}>
        <Image source={require("../Tailor/assets/Machine.png")} style={styles.image}/>
        <Text style={styles.name}>Name - Manish Malhotra Tailor</Text>
            <Text style={styles.shop}>Shop Name - A1 Tailor</Text>
        </View>
        <BankDetails />
      </ScrollView>
      <TouchableOpacity style={styles.continue}>
        <Text style={styles.text}>CONTINUE</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 5

  },
  continue: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '96%',
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#7d5ffe',
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 25,
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 99,
    marginLeft: 8,
    marginBottom: 10,
  },
  view:{
  flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth:1,
        borderRadius:12,
        shadowOffset: { width: 0, height: 15 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 30,
        backgroundColor: 'white',
        elevation: 8,
        zIndex: 99,
        borderColor:'white',
        width:"96%",
        height:165,
        paddingBottom:25,
        marginLeft:8
    },
    name:{
        color: '#000',
        fontWeight: 'bold',
        fontSize:20,
   marginLeft:-10,
        marginTop:-70
      },
      shop :{
        color: '#000',
        fontWeight: 'bold',
        marginLeft:-220,
        marginBottom:-10,
        fontSize:18,
        
      },
      image: {
        padding:10,
        width: "25%",
        height: "25%",
     
      },
});

export default CompleteProfile;
