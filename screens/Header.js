import React from 'react';
import { StyleSheet, View } from "react-native";
import PaperText from '../Ui/PaperText';

const Header = ({text}) => {
  return (
    <View style={styles.container}>
<PaperText text={text} variant="titleMedium" fontStyling={styles.text}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    marginLeft:20
  },
  text: {
    fontFamily: "Poppins-Bold",
    color: "#061023",
    fontSize: 20
  },
});

export default Header