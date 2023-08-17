import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Header from '../screens/Header';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet';
import { ToastMsg } from '../Ui/ToastMsg';
import Loader from '../Ui/Loader';
import { apiHelper, commonValue, endpoints } from '../api';
import Fonts from '../theme/font';

const DriverForm = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    alternateNumber: '',
    pincode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    license: '',
    aadhar: '',
    numberPlate: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    pincode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    aadhar: '',
  });

  const methodAddDriverDetailsApiCall = async () => {
    try {
      setIsLoading(true)
      const response = await apiHelper.post({
        url:
          endpoints.DRIVER_ADD_DETAILS,
          data: {
            "name": profileData.name,
            "alt_number": profileData.alternateNumber,
            "pincode": profileData.pincode,
            "address": profileData.address,
            "localty": profileData.locality,
            "city": profileData.city,
            "state": profileData.state,
            "aadhar": profileData.aadhar,
            "license": profileData.license,
            "plate_number": profileData.numberPlate
        },
      });
      setIsLoading(false)
      if (response.status == 200) {
        ToastMsg('Details added successfully', 'success');
        // navigation.navigate('DriverBottomNavigation')
        // setPhoneNumber('')
      } else {
        ToastMsg(response.message);
      }
    } catch (error) {
      setIsLoading(false)
      ToastMsg(commonValue.kSorryError);
    }
  };

  const handleChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
    setErrors({
      ...errors,
      [field]: '',
    });
  };

  const handleSubmit = () => {
    Keyboard.dismiss()
    const validationErrors = {};
    if (!profileData.name) {
      validationErrors.name = 'Name is required.';
    } else if (!profileData.address) {
      validationErrors.address = 'Address is required.';
    } else if (!profileData.locality) {
      validationErrors.locality = 'Locality is required.';
    } else if (!profileData.city) {
      validationErrors.city = 'City is required.';
    } else if (!profileData.state) {
      validationErrors.state = 'State is required.';
    } else if (!profileData.pincode) {
      validationErrors.pincode = 'Pincode is required.';
    } else if (!profileData.aadhar) {
      validationErrors.aadhar = 'Aadhar No. is required.';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      methodAddDriverDetailsApiCall()
    }
  };


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleContinue = () => {
    // Perform sign-in logic here
    navigation.navigate('DriverBottomNavigation');
  };
  const actionSheetOptions = isImageUploaded
    ? ['From photos', 'Remove photo', 'Cancel']
    : ['From photos', 'Cancel'];
  // const showToast = (type, text1, text2) => {
  //   Toast.show({
  //     type: type,
  //     text1: text1,
  //     text2: text2,
  //     visibilityTime: 1000,
  //     autoHide: true,
  //   });
  // };

  const actionSheetRef = useRef(null);

  const handleOpenBottomSheet = () => {
    actionSheetRef.current.show();
  };

  const handleImageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setProfilePicture({
          uri: image.path,
          width: image.width,
          height: image.height,
        });
        setIsImageUploaded(true);
        showToast(
          'success',
          'Image Uploaded',
          'Profile picture updated successfully!',
        );
      })
      .catch(error => {
        showToast(
          'error',
          'Image Upload Failed',
          'Failed to upload profile picture.',
        );
      });
  };

  const handleRemoveImage = () => {
    setProfilePicture(null);
    setIsImageUploaded(false);
  };

  const renderAvatar = () => {
    if (profilePicture) {
      return (
        <>
          <Image source={profilePicture} style={styles.profilePicture} />
          {isImageUploaded && (
            <TouchableOpacity onPress={handleOpenBottomSheet}>
              <Text style={styles.editText}>Edit Image</Text>
            </TouchableOpacity>
          )}
        </>
      );
    } else {
      return (
        <>
          <Icon
            name="user"
            size={100}
            style={styles.placeholder
            }
            color='#7d5ffe'
          />
          <TouchableOpacity onPress={handleOpenBottomSheet}>
            <Text style={styles.uploadText}>Upload Picture</Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header text="Driver Details" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding' }
        style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
        <View style={{alignItems: 'center', paddingVertical: 15}}>{renderAvatar()}</View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Full Name *"
            value={profileData.name}
            // onChangeText={text => setProfileData({...profileData, name: text})}
            onChangeText={(value) => handleChange('name', value)}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Alternate Number"
            value={profileData.alternateNumber}
            onChangeText={text =>
              setProfileData({...profileData, alternateNumber: text})
            }
            keyboardType="number-pad"
          />
           {/* {errors.alternateNumber && <Text style={styles.errorText}>{errors.alternateNumber}</Text>} */}
          <TextInput
            style={styles.input}
            placeholder="Street Address*"
            value={profileData.address}
            onChangeText={(value) => handleChange('address', value)}
            // onChangeText={text =>
            //   setProfileData({...profileData, address: text})
            // }
          />
           {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Locality*"
            value={profileData.locality}
            onChangeText={(value) => handleChange('locality', value)}
            // onChangeText={text =>
            //   setProfileData({...profileData, locality: text})
            // }
          />
           {errors.locality && <Text style={styles.errorText}>{errors.locality}</Text>}
          <TextInput
            style={styles.input}
            placeholder="City*"
            value={profileData.city}
            onChangeText={(value) => handleChange('city', value)}
            // onChangeText={text => setProfileData({...profileData, city: text})}
          />
           {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
          <TextInput
            style={styles.input}
            placeholder="State*"
            value={profileData.state}
            onChangeText={(value) => handleChange('state', value)}
            // onChangeText={text => setProfileData({...profileData, state: text})}
          />
           {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Pin Code*"
            value={profileData.pincode}
            onChangeText={(value) => handleChange('pincode', value)}
            // onChangeText={text =>
            //   setProfileData({...profileData, pincode: text})
            // }
          />
           {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Aadhar Number*"
            keyboardType="numeric"
            maxLength={12}
            value={profileData.aadhar}
            onChangeText={(value) => handleChange('aadhar', value)}
            // onChangeText={text =>
            //   setProfileData({...profileData, aadhar: text})
            // }
          />
           {errors.aadhar && <Text style={styles.errorText}>{errors.aadhar}</Text>}
          <View style={styles.CheckboxContainer}>
            <CheckBox
              tintColors={{true: '#7d5ffe'}}
              value={isChecked}
              onValueChange={handleCheckboxChange}
            />
            <Text style={styles.label}>Do you have a motorcycle?</Text>
          </View>
          {isChecked && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Driving License*"
                value={profileData.license}
                onChangeText={text =>
                  setProfileData({...profileData, license: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your bike number plate*"
                value={profileData.license}
                onChangeText={text =>
                  setProfileData({...profileData, numberPlate: text})
                }
              />
            </>
          )}
        </View>
        </View>
        </TouchableWithoutFeedback>
      </ScrollView>
       </KeyboardAvoidingView>
      <ActionSheet
        ref={actionSheetRef}
        title={'Choose an option'}
        options={actionSheetOptions}
        cancelButtonIndex={actionSheetOptions.length - 1}
        onPress={index => {
          if (isImageUploaded) {
            if (index === 0) {
              handleImageUpload();
            } else if (index === 1) {
              handleRemoveImage();
            }
          } else {
            if (index === 0) {
              handleImageUpload();
            }
          }
        }}
      />
      <Toast ref={ref => Toast.setRef(ref)} />
      {/* <TouchableOpacity style={styles.continue} onPress={handleSubmit}> */} 
      <TouchableOpacity style={styles.continue} onPress={handleContinue}>
        <Text style={styles.text}>CONTINUE</Text>
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
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10 
  },
  continue: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '94%',
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#7d5ffe',
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 25,
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 99,
    marginLeft: 10,
    marginBottom: 10,
  },
  CheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  profilePicture: {
    width: 105,
    height: 105,
    borderRadius: 75,
    marginBottom: 10,
    alignItems: 'center',
  },
  placeholder: {
    width: 110,
    height: 110,
    borderRadius: 75,
    backgroundColor: 'white',
    marginBottom: 10,
    borderWidth: 0.7,
    paddingLeft: 19,
    borderColor: '#7d5ffe',
    alignItems: 'center',
  },
  editText: {
    fontSize: 18,
    color: '#7d5ffe',
  },
  uploadText: {
    fontSize: 18,
    color: '#7d5ffe',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontFamily: Fonts.Poppins.regular,
    marginBottom: 2
  }
});

export default DriverForm;
