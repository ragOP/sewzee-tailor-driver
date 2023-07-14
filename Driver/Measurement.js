import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet,TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import PaperAppBar from '../Ui/PaperAppBar'
import MaterialIconsItem from '../Ui/MaterialIconsItem'
import { Appbar } from "react-native-paper";
const Measurement = ({navigation}) => {
  const [textInputs, setTextInputs] = useState(['', '', '']);

  const handleTextChange = (index, inputText) => {
    const updatedInputs = [...textInputs];
    updatedInputs[index] = inputText;
    setTextInputs(updatedInputs);
  };

  const images = [
    { source: require('./assets/Measurement.png'), text: 'Text 1' },
    { source: require('./assets/Measurement2.png'), text: 'Text 2' },
    { source: require('./assets/Measurement3.png'), text: 'Text 3' },
  ];

  return (
    <>
    <PaperAppBar>
    <TouchableOpacity
    activeOpacity={1}
      styling={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <MaterialIconsItem
        name="arrow-back-ios"
        color={"#4F5663"}
        size={25}
      />
    </TouchableOpacity>
    <Appbar.Content titleStyle={styles.header} title=" Take Measurement" />
  </PaperAppBar>
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        autoplay={false}
        showsButtons={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image style={styles.image} source={image.source} />
            <TextInput
              style={styles.textInput}
              onChangeText={(inputText) => handleTextChange(index, inputText)}
              value={textInputs[index]}
              placeholder={`Enter measurement for image ${index + 1}`}
              keyboardType='numeric'
            />
          </View>
        ))}
      </Swiper>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
        height:'90%',
        marginLeft:8 ,
  },

  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    // marginTop:-180


  },
  image: {
    width: '60%',
    height: '40%',
    resizeMode: 'cover',
  },
  textInput: {
    marginTop: 10,
    width: '63%',
    height: 44,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  dotStyle: {
    backgroundColor: '#ccc',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDotStyle: {
    backgroundColor: 'blue',
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
});

export default Measurement;
