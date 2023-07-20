import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
 
} from 'react-native';
import Header from '../screens/Header';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet';

const TailorForm = ({navigation}) => {
  const [profileData, setProfileData] = useState({
    name: '',
    businessname: '',
    alternateNumber: '',
    pincode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const handleContinue = () => {
    // Perform sign-in logic here
    navigation.navigate('BottomNavigation');
  };
  const actionSheetOptions = isImageUploaded
  ? ['From photos', 'Remove photo', 'Cancel']
  : ['From photos', 'Cancel'];
const showToast = (type, text1, text2) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,

    visibilityTime: 2000,
    autoHide: true,
  });
};
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
          style={styles.placeholder}
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
    <>
      <Header text="Profile" />
      <ScrollView contentContainerStyle={styles.container}>
      <View>
          {renderAvatar()}
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Full Name *"
            value={profileData.name}
            onChangeText={text => setProfileData({...profileData, name: text})}
            required={true}
          />

          <TextInput
            style={styles.input}
            placeholder="Business Name (Shop Name) *"
            value={profileData.businessname}
            onChangeText={text =>
              setProfileData({...profileData, businessname: text})
            }
            required={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Alternate Number"
            value={profileData.alternateNumber}
            onChangeText={text =>
              setProfileData({...profileData, alternateNumber: text})
            }
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Street Address*"
            value={profileData.address}
            onChangeText={text =>
              setProfileData({...profileData, address: text})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Locality*"
            value={profileData.locality}
            onChangeText={text =>
              setProfileData({...profileData, locality: text})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="City*"
            value={profileData.city}
            onChangeText={text => setProfileData({...profileData, city: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="State*"
            value={profileData.state}
            onChangeText={text => setProfileData({...profileData, state: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Pin Code*"
            value={profileData.pincode}
            onChangeText={text =>
              setProfileData({...profileData, pincode: text})
            }
          />
        </View>
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
      </ScrollView>
      <TouchableOpacity style={styles.continue} onPress={handleContinue}>
        <Text style={styles.text}>CONTINUE</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 15,
  },
  formContainer: {
    width: '96%',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  input: {
    // height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
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
  profilePicture: {
    width: 105,
    height: 105,
    borderRadius: 75,
    marginBottom: 10,
    alignItems:'center',

  },
  placeholder: {
    width: 110,
    height: 110,
    borderRadius: 75,
    backgroundColor: 'white',
    marginBottom: 10,
    borderWidth: 0.7,
    paddingLeft:19,
    borderColor:'#7d5ffe',
    alignItems:'center'
  },
  editText:{
    fontSize:18,
    color:'#7d5ffe'

  },
  uploadText:{
    fontSize:18,
    color:'#7d5ffe',
   

  }
});

export default TailorForm;
