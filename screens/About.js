import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import PaperAppBar from '../Ui/PaperAppBar'
import MaterialIconsItem from '../Ui/MaterialIconsItem'
import { Appbar } from "react-native-paper";

const About = ({navigation}) => {
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
    <Appbar.Content titleStyle={styles.header} title="About" />
  </PaperAppBar>
  
    <View style={styles.container}>
      <Text style={styles.text}>
        Sewzee is a fashion exploration platform that brings together a curated selection of local brands, boutiques, and expert tailors. With Sewzee, you can fulfill all your fashion needs, from discovering unique styles to finding skilled artisans who can bring your vision to life.
      </Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor:'white',


  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default About;
