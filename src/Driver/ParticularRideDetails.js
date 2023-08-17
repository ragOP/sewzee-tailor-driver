import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import PaperAppBar from '../Ui/PaperAppBar';
import MaterialIconsItem from '../Ui/MaterialIconsItem';
import { Appbar } from 'react-native-paper';
import Fonts from '../theme/font';
import AppColor from '../theme/colors';
import ImagePath from '../theme/imagePath';
import GradientTextOrange from '../Ui/gradientTextOrange';
import CircularProgress from 'react-native-circular-progress-indicator';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';

const PartricularRideDetails = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressDays, setProgressDays] = useState(50);
  const boxArray = ['Box 1', 'Box 2', 'Box 3', 'Box 4', 'Box 5']; // Replace with your array of boxes

  const horizontalBoxitems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  const handleNext = () => {
    if (currentIndex < boxArray.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleMeasurement = () => {
    navigation.navigate('Measurement');
  };

  const handleReject = () => {
    navigation.navigate('DriverMainPage');
  };

  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2
  };

  return (
    <SafeAreaView style={styles.container}>
      <PaperAppBar>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <MaterialIconsItem
            name="arrow-back-ios"
            color={"#4F5663"}
            size={25}
          />
        </TouchableOpacity>
        <Appbar.Content titleStyle={[styles.headingText, { fontSize: 20 }]} title="Order Details" />
      </PaperAppBar>

      <View style={styles.middleContainer}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={ImagePath.orderList} style={styles.image} resizeMode='contain' />
          <Text style={styles.headingText}>{'Order No.- 71'}</Text>
          <View style={[styles.verticalBorder, { height: '80%' }]} />
          <Text style={styles.headingText}>{'Kurta & Salwar'}</Text>
        </View>

        <View>
          <ScrollView horizontal={true}
          //  showsHorizontalScrollIndicator={false}
          >
            {horizontalBoxitems.map((item, index) => (
              <View key={index} style={styles.box}>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: 10, marginVertical: 10 , justifyContent: 'space-between', flexDirection: 'row', paddingRight: 15, alignItems: 'center'}}>
          <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.labelTxt}>Name - </Text>
            <Text style={styles.labelTxt}>{"King Rag"}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.labelTxt}>Address - </Text>
            <Text style={styles.labelTxt}>{"Road No. 5 Delhi"}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.labelTxt}>Due on - </Text>
            <Text style={styles.labelTxt}>{"28-06-2023"}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.labelTxt}>Amount - </Text>
              <Text style={styles.greenTxt}>{"₹ 675"}</Text>
              <Text style={styles.greenTxt}>{" + "}</Text>
              <GradientTextOrange style={styles.gradientTxt}>{"₹ 50(Express)"}</GradientTextOrange>
            </View>
          </View>
          </View>
          <View>
          <CircularProgress
  value={progressDays}
  radius={40}
  progressValueColor={'#ecf0f1'}
  title= {`${progressDays} - Days`}
  titleColor={AppColor.purple}
  titleStyle={{fontFamily: Fonts.Poppins.semiBold}}
  subtitle= "Remaining"
  subtitleColor={AppColor.purple}
  subtitleStyle={{fontFamily: Fonts.Poppins.semiBold}}
  showProgressValue={false}
  activeStrokeColor={'#FA6CBB'}
  // inActiveStrokeColor={'#9b59b6'}
  inActiveStrokeOpacity={0.5}
  inActiveStrokeWidth={1}
  activeStrokeWidth={10}
/>
</View>

        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
          <Text style={styles.purpleTxt}>Size Profile</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.labelTxt, {fontSize: 16}]}>For - </Text>
            <Text style={[styles.labelTxt, {fontSize: 16}]}>{"King Rag"}</Text>
          </View>
        </View>


        <View style={styles.sliderContainer}>

          <TouchableOpacity
            onPress={handlePrevious} disabled={currentIndex === 0}>
            <Image source={ImagePath.leftArrow} style={styles.image} resizeMode='contain' />
          </TouchableOpacity>

          <View style={styles.middleBox}>
            <Text style={styles.middleText}>{boxArray[currentIndex]}</Text>
          </View>

          <TouchableOpacity
            onPress={handleNext}
            disabled={currentIndex === boxArray.length - 1}
          >
            <Image source={ImagePath.rightArrow} style={styles.image} resizeMode='contain' />
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', bottom: 30}}>
            <Text style={styles.headingText}>{'Neck 6 inch'}</Text>
          </View>


      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={[styles.button, { borderColor: AppColor.green }]} onPress={handleMeasurement}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { borderColor: AppColor.orange }]} onPress={handleReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headingText: {
    fontFamily: Fonts.Poppins.semiBold,
    fontSize: 15,
    color: '#000'
  },
  middleContainer: {
    height: '81%',
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginHorizontal: 12,
    padding: 5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFF",
    justifyContent: 'space-between'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '43%',
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: '#00000040',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    fontFamily: Fonts.Poppins.semiBold,
    fontSize: 15,
    color: '#000',
  },
  verticalBorder: {
    width: 0.5,
    height: '100%',
    marginHorizontal: 10,
    backgroundColor: '#0000004f',
  },
  purpleTxt: {
    color: AppColor.purple,
    fontSize: 17,
    fontFamily: Fonts.Poppins.semiBold,
  },
  labelTxt: {
    color: '#000',
    fontSize: 13,
    fontFamily: Fonts.Poppins.semiBold,
  },
  image: {
    width: 27,
    height: 28,
    marginRight: 5
  },
  box: {
    width: 130,
    height: 150,
    backgroundColor: "#FFF",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 12,
    borderColor: '#00000040',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 30
  },
  greenTxt: {
    color: AppColor.green,
    fontSize: 13,
    fontFamily: Fonts.Poppins.semiBold,
  },
  gradientTxt: {
    fontSize: 13,
    fontFamily: Fonts.Poppins.semiBold,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    // borderWidth: 1
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleBox: {
    width: '65%',
    height: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderColor: '#00000040',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PartricularRideDetails;
