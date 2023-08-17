import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Keyboard
} from 'react-native';
import PaperAppBar from '../Ui/PaperAppBar';
import MaterialIconsItem from '../Ui/MaterialIconsItem';
import { Appbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../Ui/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from '../api/apiHelper';
import { apiHelper, endpoints } from '../api';
import { ToastMsg } from '../Ui/ToastMsg';
const DriverBankDetails = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null); 
    const initialFormData = {
        account_number: userInfo?.account_number ? userInfo?.account_number : '',
        ifsc_code: userInfo?.ifsc_code ? userInfo?.ifsc_code : '',
        branch_name: userInfo?.branch_name ? userInfo?.branch_name : '',
        branch_address: userInfo?.branch_address ? userInfo?.branch_address : '',
        // upi: userInfo?.upi ? userInfo?.upi : '',
      };
      const [formData, setFormData] = useState(initialFormData);

    useFocusEffect(
        useCallback(() => {
            fetchDriverProfileData();
        }, [])
    );

    useEffect(() => {
        if (userInfo) {
          setFormData({
            account_number: userInfo?.account_number || '',
            ifsc_code: userInfo?.ifsc_code || '',
            branch_name: userInfo?.branch_name || '',
            branch_address: userInfo?.branch_address || '',
            // upi: userInfo?.upi || '',
          });
        }
      }, [userInfo]);

    const fetchDriverProfileData = async () => {
        try {
            setIsLoading(true);
            const response = await get(endpoints.DRIVER_GET_PROFILE);
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


    const handleUpdateBankDetails = async () => {
        console.log('formData--- ', formData );
        try {
          Keyboard.dismiss()
          setIsLoading(true);
          const response = await apiHelper.put(
            endpoints.DRIVER_UPDATE_BANK,
            formData 
          );
          if (response) {
           ToastMsg(response?.message, 'success')
            navigation.goBack()
          } else {
            console.log('Failed to update profile');
          }
        } catch (error) {
          console.log('Error updating profile:', error);
        }finally {
          setIsLoading(false);
      }
      };

    const handleChange = (field, value) => {
        console.log('Updating form data:', field, value);
        setFormData(prevData => ({
          ...prevData,
          [field]: value,
        }));
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
                <Appbar.Content titleStyle={styles.header} title="Bank Details" />
            </PaperAppBar>

            <ScrollView style={{ flex: 1, paddingTop: 20, paddingHorizontal: 10 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Account No*"
                    value={formData?.account_number}
                    onChangeText={(text) => handleChange('account_number', text)}
                    required={true}
                />

                <TextInput
                    style={styles.input}
                    placeholder="IFSC Code *"
                    value={formData?.ifsc_code}
                    onChangeText={(text) => handleChange('ifsc_code', text)}
                    required={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Branch Name*"
                    value={formData?.branch_name}
                    onChangeText={(text) => handleChange('branch_name', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Branch Address*"
                    value={formData?.branch_address}
                    onChangeText={(text) => handleChange('branch_address', text)}
                />
                {/* <TextInput
                    style={styles.input}
                    placeholder="Enter your UPI Id"
                    value={formData?.upi}
                    onChangeText={(text) => handleChange('upi', text)}
                /> */}
            </ScrollView>
            <View>
            <TouchableOpacity style={styles.submitButton} onPress={() => {
        handleUpdateBankDetails()
      }}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
            </View>
            {isLoading && <Loader />}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
        marginLeft: 130
    },
    formContainer: {
        width: '96%',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
    },
    submitButton: {
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
      submitButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7d5ffe',
      },

});

export default DriverBankDetails;
