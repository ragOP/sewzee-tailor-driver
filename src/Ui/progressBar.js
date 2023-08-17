import React from "react";
import { Text, View, StyleSheet } from "react-native";
// import SimpleGradientProgressbarView from "react-native-simple-gradient-progressbar-view";

const ProgressBar = () => {
    return (
        <View style={styles.container}>
            {/* <SimpleGradientProgressbarView
                style={styles.box}
                // fromColor="#FF0000"
                // toColor="#0000FF"
                maskedCorners={[1, 1, 1, 1]}
                cornerRadius={7.0}
                progress={1.0}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 160,
        height: 10,
        marginVertical: 20,
        // borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 7.0,
        backgroundColor: 'white',
borderColor: 'black'
    },
});

export default ProgressBar;