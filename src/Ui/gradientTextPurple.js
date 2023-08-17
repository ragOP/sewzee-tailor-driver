import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-community/masked-view";
import LinearGradient from "react-native-linear-gradient";
    
const GradientTextPurple = (props) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={['#FF7A00', '#7D5FFE']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientTextPurple;