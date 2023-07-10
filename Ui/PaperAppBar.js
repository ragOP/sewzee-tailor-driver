import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";


const PaperAppBar = ({ children, style }) => {
  return <Appbar.Header style={styles.header}>{children}</Appbar.Header>;
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
});

export default PaperAppBar;
