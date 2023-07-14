import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,

} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Header from '../screens/Header';

const DriverForm = ({navigation}) => {
  const [profileData, setProfileData] = useState({
    name: '',
    alternateNumber: '',
    pincode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    license:'',
    aadhar:''
  });
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  

  const handleContinue = () => {
    // Perform sign-in logic here
    navigation.navigate('DriverBottomNavigation');
  };

  return (
    <>
      <Header text="Profile" />
      <ScrollView contentContainerStyle={styles.container}>
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
          <TextInput
            style={styles.input}
            placeholder="Aadhar Number*"
            keyboardType="numeric"
            maxLength={12}
            value={profileData.aadhar}
            onChangeText={text =>
              setProfileData({...profileData, aadhar: text})
            }
          />
           <View style={styles.CheckboxContainer}>
        <CheckBox
          tintColors={{ true: '#7d5ffe' }}
          value={isChecked}
          onValueChange={handleCheckboxChange}
        />
        <Text style={styles.label}>Do you have a motorcycle?*</Text>
      </View>
      {isChecked && (
        <>
        <TextInput
          style={styles.input}
          placeholder="Driving License*"
          value={profileData.license}
          onChangeText={(text) =>
            setProfileData({ ...profileData, license: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your bike number plate*"
          value={profileData.license}
          onChangeText={(text) =>
            setProfileData({ ...profileData, license: text })
          }
        />
        </>
      )}
        </View>

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
    paddingTop: 25,
  },
  formContainer: {
    width: '96%',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  input: {
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
  CheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:15
  },
  label: {
    marginLeft: 8,
    fontSize:16
  },
});

export default DriverForm;
