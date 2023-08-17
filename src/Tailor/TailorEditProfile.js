import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  Keyboard,
  Button
} from 'react-native';
import PaperAppBar from '../Ui/PaperAppBar'
import MaterialIconsItem from '../Ui/MaterialIconsItem'
import { Appbar } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BankDetails from '../screens/BankDetails';
import Loader from '../Ui/Loader';
import { apiHelper, commonValue, endpoints } from '../api';
import FastImage from 'react-native-fast-image';
import { ToastMsg } from '../Ui/ToastMsg';
import { useFocusEffect } from '@react-navigation/native';
import { get } from '../api/apiHelper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const TailorEditProfile = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const initialFormData = {
    name: userInfo?.name ? userInfo?.name : '',
    business_name: userInfo?.business_name ? userInfo?.business_name : '',
    alt_number: userInfo?.alt_number ? userInfo?.alt_number : '',
    address: userInfo?.address ? userInfo?.address : '',
    localty: userInfo?.localty ? userInfo?.localty : '',
    city: userInfo?.city ? userInfo?.city : '',
    state: userInfo?.state ? userInfo?.state : '',
    pincode: userInfo?.pincode ? userInfo?.pincode : '',
    profile: userInfo?.profile ? userInfo?.profile : '',
    perference: userInfo?.perference ? userInfo?.perference : '',
  };
  const [formData, setFormData] = useState(initialFormData);

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

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo?.name || '',
        business_name: userInfo?.business_name || '',
        alt_number: userInfo?.alt_number || '',
        address: userInfo?.address || '',
        localty: userInfo?.localty || '',
        city: userInfo?.city || '',
        state: userInfo?.state || '',
        pincode: userInfo?.pincode.toString() || '',
        profile: userInfo?.profile || '',
        perference: userInfo?.perference || '',
      });
    }
  }, [userInfo]);

  useEffect(() => {
    console.log('selectedImage',selectedImage?.assets[0]?.uri);
  }, []);

  const handleUpdateProfile = async () => {
    try {
      Keyboard.dismiss()
      setIsLoading(true);
      const updatedFormData = { ...formData };

      if (selectedImage) {
        const selectedImageUrl = selectedImage?.assets[0]?.uri;
        updatedFormData.image = selectedImageUrl; 
      }

      const response = await apiHelper.put(
        endpoints.TAILOR_UPDATE_PROFILE,
        updatedFormData 
      );
      setIsLoading(false);
      if (response) {
       ToastMsg(response?.message, 'success')
        navigation.goBack()
      } else {
        console.log('Failed to update profile');
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Error updating profile:', error);
    }
  };

  const handleChange = (field, value) => {
    console.log('Updating form data:', field, value);
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const selectFromCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => handleImageResponse(response)
    );
  };

  const selectFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => handleImageResponse(response)
    );
  };

  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      console.log('Selected image response:', response);
      setSelectedImage(response);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <PaperAppBar>
        <TouchableOpacity
          styling={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIconsItem
            name="arrow-back-ios"
            color={"#4F5663"}
            size={25}
          />
        </TouchableOpacity>
        <Appbar.Content titleStyle={styles.header} title="My Profile" />
      </PaperAppBar>
      <View style={{ paddingTop: 20, alignSelf: 'center' }}>
        <FastImage
          source={{
            uri: selectedImage?.assets[0]?.uri || userInfo?.image,
            priority: FastImage.priority.normal,
          }}
          style={styles.profilePic}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 10}}>
      <Button title="Upload from Camera" onPress={selectFromCamera} style={{width: '30%'}}/>
      <Button title="Upload from Gallery" onPress={selectFromGallery} style={{width: '30%'}}/>
    </View>
      <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
        <View >
          {Object.keys(formData)?.map(field => (
            <TextInput
              key={field}
              style={styles.input}
              placeholder={field.replace(/_/g, ' ').toUpperCase()}
              value={formData[field]}
              onChangeText={text => handleChange(field, text)}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.continue} onPress={handleUpdateProfile}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
      {isLoading && <Loader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  continue: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '96%',
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#7d5ffe',
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 25,
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 99,
    marginLeft: 8,
    marginBottom: 10,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 30,
    backgroundColor: 'white',
    elevation: 8,
    zIndex: 99,
    borderColor: 'white',
    width: "96%",
    height: 165,
    paddingBottom: 25,
    marginLeft: 8
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: -10,
    marginTop: -70
  },
  shop: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: -220,
    marginBottom: -10,
    fontSize: 18,

  },
  image: {
    padding: 10,
    width: "25%",
    height: "25%",

  },
  formContainer: {
    width: '96%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  profilePic: {
      width: 150,
      height: 150,
      marginBottom: 20,
      borderRadius: 75,
      borderColor: '#1abc9c',
      borderWidth: 1
  }
});

export default TailorEditProfile;
