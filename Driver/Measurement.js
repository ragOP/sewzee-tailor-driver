import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PaperAppBar from '../Ui/PaperAppBar';
import MaterialIconsItem from '../Ui/MaterialIconsItem';
import {Appbar} from 'react-native-paper';
const Measurement = ({navigation}) => {
  const [textInputs, setTextInputs] = useState(['', '', '']);

  const handleTextChange = (index, inputText) => {
    const updatedInputs = [...textInputs];
    updatedInputs[index] = inputText;
    setTextInputs(updatedInputs);
  };

  const images = [
    {source: require('./assets/Measurement.png'), text: 'Text 1'},
    {source: require('./assets/Measurement2.png'), text: 'Text 2'},
    {source: require('./assets/Measurement3.png'), text: 'Text 3'},
  ];

  return (
    <>
      <PaperAppBar>
        <TouchableOpacity
          activeOpacity={1}
          styling={styles.backButton}
          onPress={() => navigation.goBack()}>
          <MaterialIconsItem
            name="arrow-back-ios"
            color={'#4F5663'}
            size={25}
          />
        </TouchableOpacity>
        <Appbar.Content titleStyle={styles.header} title=" Take Measurement" />
      </PaperAppBar>
      <View style={styles.container}>
        <Swiper
          style={styles.swiper}
          autoplay={false}
          showsButtons={false}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          alwaysBounceHorizontal={true}>
          {images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image style={styles.image} source={image.source} />

              <TextInput
                style={styles.textInput}
                onChangeText={inputText => handleTextChange(index, inputText)}
                value={textInputs[index]}
                placeholder={`Enter measurement for Image ${index + 1}`}
                keyboardType="numeric"
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
    borderRadius: 12,
    shadowOffset: {width: 0, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 30,
    backgroundColor: 'white',
    elevation: 8,
    zIndex: 99,
    borderColor: 'white',
    width: '90%',
    height: '70%',
    marginLeft: 18,
  },

  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    // borderWidth: 1,
    width: '100%',
    height: '80%',
    marginLeft: 5,
    position:'relative'
  },
  swiper: {
    overflow: 'hidden',
  },
  image: {
    width: '60%',
    height: '70%',
    resizeMode: 'cover',
  },
  textInput: {
    marginTop: 10,
    width: '70%',
    height: 44,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 10,
  },
  dotStyle: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDotStyle: {
    backgroundColor: '#7d5ffe',
    width: 10,
    height: 10,
    borderRadius: 6,
    marginHorizontal: 5,
  },
});

export default Measurement;
