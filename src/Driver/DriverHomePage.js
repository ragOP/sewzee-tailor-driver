import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DriverMainPage from './DriverMainPage';

const DriverHomePage = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      <DriverMainPage navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DriverHomePage;
