import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Card } from 'react-native-paper';
import TailorMainPage from './TailorMainPage';

const TailorHomepage = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      <TailorMainPage navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default TailorHomepage;
