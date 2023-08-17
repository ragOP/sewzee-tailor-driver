import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Animated,
  SafeAreaView,
} from 'react-native';
import { ToastMsg } from '../Ui/ToastMsg';
import Loader from '../Ui/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fonts from '../theme/font';
import ImagePath from '../theme/imagePath';
import AppColor from '../theme/colors';
import FastImage from 'react-native-fast-image';
import { useFocusEffect } from '@react-navigation/native';
import { get } from '../api/apiHelper';
import { endpoints } from '../api';

const TailorProfileScreen = ({navigation}) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleValue = useState(new Animated.Value(1))[0];
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetchTailorProfileData();
    }, [])
  );

  const fetchTailorProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await get(endpoints.TAILOR_GET_PROFILE);
      if (response) {
        await AsyncStorage.setItem('userData', JSON.stringify(response?.user));
        setUserInfo(response?.user);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRegistered');
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('userRole');
      ToastMsg("Logged out successfully", "success");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.log('Error logging out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressIn = () => {
    8;
    setIsPressed(true);
    Animated.spring(scaleValue, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const buttonScale = {
    transform: [{scale: scaleValue}],
  };

  return (
<SafeAreaView style={styles.container}>
<View style={styles.headerView}>
        <Text style={styles.headingText}>{"Profile"}</Text>
          {/* <Text style={styles.subHeadingText}>{data?.name}</Text></Text> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('TailorEditProfile')}
          style={styles.headerRightBtn}>
          <Text style={[styles.text, { color: AppColor.purple }]}>Edit</Text>
          {/* <Image source={ImagePath.call} style={{ height: 20, width: 20 }} resizeMode='contain' /> */}
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20, justifyContent: 'space-between', flexDirection: 'row'}}>
        <View>
        <FastImage
          source={{
            uri: userInfo?.image,
            priority: FastImage.priority.normal,
          }}
          style={styles.profilePic}
          resizeMode={FastImage.resizeMode.contain}
        />
        </View>
        <View style={{width: '65%'}}>
          <Text>{"Best Tailor ever"}</Text>
          <Text>{userInfo?.name}</Text>
        </View>
      </View>

<View style={{paddingHorizontal: 20, marginTop: '2%'}}>
      {/* <TouchableOpacity
        style={[styles.button,{flexDirection: 'row', justifyContent: 'space-between'}]}
        onPress={() => navigation.navigate('Complete')}>
        <Text style={styles.buttonText}>My Profile</Text>
        <Image source={ImagePath.backArrow} style={styles.image} resizeMode='contain' />
      </TouchableOpacity> */}
        <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => navigation.navigate('TailorAllOrders')}>
        <Text style={styles.buttonText}>My Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => navigation.navigate('TailorBankDetails')}>
        <Text style={styles.buttonText}>Bank Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        // onPress={() => navigation.navigate('Stich')}> 
        onPress={() => navigation.navigate('CustomizationList')}>
        <Text style={styles.buttonText}>Customization & Perferences</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => navigation.navigate('Support')}>
        <Text style={styles.buttonText}>Support & FAQ’s</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => navigation.navigate('About')}>
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => handleLogout()}
        style={[styles.buttons, isPressed && buttonScale]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      </View>
      {isLoading && <Loader />}
    </SafeAreaView>
  );
};

export default TailorProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  button: {
    paddingVertical: 15,
  },
  headerRightBtn: {
    flexDirection: 'row',
    backgroundColor: "#FFF",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 7,
    borderRadius: 12,
    paddingHorizontal: 30, alignItems: 'center'  
    },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '43%',
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: AppColor.orange,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: Fonts.Poppins.semiBold,
  },
  image: {
    width: 27,
    height: 27,
  },
  headerView: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10
  },
  headingText: {
    fontFamily: Fonts.Poppins.semiBold,
    fontSize: 18,
    color: '#000'
  },
  subHeadingText: {
    fontFamily: Fonts.Poppins.regular,
    fontSize: 16,
    color: '#000'
  },
  profilePic: {
    width: 120,
    height: 120,
    borderColor: AppColor.purple,
    borderWidth: 0.2
}
});
