import * as React from 'react';
import { View, StyleSheet } from 'react-native';
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
