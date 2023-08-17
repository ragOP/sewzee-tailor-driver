import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Fonts from '../theme/font';
import AppColor from '../theme/colors';
import Loader from '../Ui/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { endpoints } from '../api';
import { get, patch, put } from '../api/apiHelper';
import FastImage from 'react-native-fast-image';
import { ToastMsg } from '../Ui/ToastMsg';
import PaperAppBar from '../Ui/PaperAppBar';
import MaterialIconsItem from '../Ui/MaterialIconsItem';
import { Appbar } from 'react-native-paper';


const EditCustomizationList = ({ navigation, route }) => {
  const { itemDetails } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [customDetails, setCustomDetails] = useState('');
  const [showList, setShowList] = useState(false);
  const [updatedPrices, setUpdatedPrices] = useState([]);
  const [basePrice, setBasePrice] = useState('');
  const [subPrice, setSubPrice] = useState('');

  const handlePriceChange = (itemType, labelName, newPrice) => {
    if (itemType === 'basePrice') {
      setBasePrice(newPrice);
    } else if (itemType === 'subPrice') {
      setSubPrice(newPrice);
    } else {
      setUpdatedPrices(prevPrices => ({
        ...prevPrices,
        [itemType]: {
          ...prevPrices[itemType],
          [labelName]: newPrice,
        },
      }));
    }
  };

  useEffect(() => {
    console.log('itemDetails',itemDetails );
    if (customDetails) {
      setBasePrice(customDetails?.price?.toString());
      setSubPrice(customDetails?.subprice?.toString());
    }
  }, [customDetails]);

  useFocusEffect(
    useCallback(() => {
      fetchCustomListDetails();
    }, [])
  );

  const fetchCustomListDetails = async () => {
    try {
      setIsLoading(true);
      const response = await get(endpoints.TAILOR_POST_ADD_PRICES + itemDetails.id);
      if (response) {
        setCustomDetails(response?.data[0]);
        setShowList(true)
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const methodUpdatePrices = async (updatedPrices) => {
    console.log('updatedPrices====',updatedPrices);
    try {
      const response = await put(endpoints.TAILOR_POST_ADD_PRICES + itemDetails.id, updatedPrices);
      ToastMsg(response?.message, 'success');
      navigation.goBack();
    } catch (error) {
      console.error('Error in PATCH API:', error);
    }
  };
  
  const handleSubmit = () => {
    let customizationsArray = [];
  
    customDetails.customization.forEach(item => {
      const itemType = item.type;
      const itemTypePrices = updatedPrices[itemType];
      const labelsArray = item.labels.map(label => ({
        name: label.name,
        price: itemTypePrices[label.name] !== undefined ? itemTypePrices[label.name] : label.price.toString()
      }));
  
      const customizationObject = {
        labels: labelsArray,
        type: itemType
      };
      customizationsArray.push(customizationObject);
    });
  
    const updatedPricesObject = {
      customization: customizationsArray,
      price: parseFloat(basePrice),
      subprice: parseFloat(subPrice)
    };
  
    // console.log('Updated Prices:', updatedPricesObject.customization[0]);
    methodUpdatePrices(updatedPricesObject)
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
      >
         <PaperAppBar>
        <TouchableOpacity
          styling={styles.backButton}
          onPress={() => navigation.goBack()}>
          <MaterialIconsItem
            name="arrow-back-ios"
            color={'#4F5663'}
            size={25}
          />
        </TouchableOpacity>
        <Appbar.Content titleStyle={styles.header} title="Customization & Preferences" />
      </PaperAppBar>

        <ScrollView style={{ flex: 1, marginBottom: 10 }}>
          <View style={{ flex: 1, paddingHorizontal: 15 }}>
            <Text style={styles.headingText}>Type - {itemDetails?.type}</Text>
            <Text style={styles.headingText}>Category - {itemDetails?.categoryName}</Text>
            <Text style={styles.headingText}>Base Price - {customDetails?.price}</Text>
            <TextInput
              style={styles.input}
              placeholder="Add Price"
              keyboardType="number-pad"
              onChangeText={(text) => setBasePrice(text)}
              value={basePrice}
            />
            <Text style={styles.headingText}>Sub Category - {itemDetails?.subcategoryName}</Text>
            <Text style={styles.headingText}>Price - {customDetails?.subprice}</Text>
            <TextInput
              style={styles.input}
              placeholder="Add Price"
              keyboardType="number-pad"
              onChangeText={(text) => setSubPrice(text)}
              value={subPrice}
            />
          {customDetails?.customization?.length > 0 ? (
  <View>
            <Text style={styles.headingText}>Customization & Variations</Text>
            </View>
) : null}

            {customDetails?.customization?.length > 0 ? (
  <View>
            {showList && customDetails?.customization[0]?.labels ? (
              customDetails.customization.map((item, index) => {
                return (
                   <View key={index}>
                    <Text style={styles.headingText}>Style Type - {item?.type}</Text>
                    <View>
            {item.labels.map((label, index) => (
              <View key={index}>
                  {/* <FastImage
          source={{
            uri: label?.images,
            priority: FastImage.priority.normal,
          }}
          style={styles.profilePic}
          resizeMode={FastImage.resizeMode.contain}
        /> */}
                <Text style={styles.headingText}>{index+1}. {label?.name}</Text>
            <TextInput
              style={styles.input}
              placeholder="Add Price"
              keyboardType="number-pad"
              onChangeText={newPrice => handlePriceChange(item.type, label.name, newPrice)}
                value={
                  updatedPrices[item.type]?.[label.name] !== undefined
                    ? updatedPrices[item.type][label.name]?.toString()
                    : label.price.toString()
                }
            /> 
              </View>
            
            ))}
          </View>
                   </View>
                )
              }
              )
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.headingText, { alignSelf: 'center', justifyContent: 'center', marginVertical: '50%' }]}>Loading...</Text>
              </View>
            )}
 </View>
) : null}
          </View>

        </ScrollView>
        <TouchableOpacity style={styles.editBtn} onPress={() => handleSubmit()}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Update</Text>
        </TouchableOpacity>
        {isLoading && <Loader />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default EditCustomizationList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
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
  headerView: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 7,
    // borderWidth: 1,
    marginHorizontal: 10,
    alignSelf: 'center'
    // borderRadius: 12
  },
  headingText: {
    fontFamily: Fonts.Poppins.semiBold,
    fontSize: 18,
    color: '#000'
  },
  boxContainer: {
    marginHorizontal: 10,
    // borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    marginVertical: 7
  },
  editBtn: {
    paddingVertical: 10,
    borderRadius: 5,
    bottom: 10,
    width: '92%',
    marginHorizontal: 15,
    backgroundColor: AppColor.purple
  },
  emptyRecordContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyRecordText: {
    fontSize: 16,
    color: '#000',
    fontFamily: Fonts.Poppins.semiBold,
  },
  input: {
    height: 40,
    color: '#333',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 5
  },
  backButton: {
    padding: 5,
  },
  header: {
    fontFamily: Fonts.Poppins.semiBold,
    fontSize: 20,
  },
});