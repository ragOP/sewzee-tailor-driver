import React, { useCallback, useState } from 'react';
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
} from 'react-native';
import Fonts from '../theme/font';
import AppColor from '../theme/colors';
import Loader from '../Ui/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { endpoints } from '../api';
import { del, get } from '../api/apiHelper';
import { ToastMsg } from '../Ui/ToastMsg';


const CustomizationList = ({ navigation }) => {
  const [customList, setCustomList] = useState(['as', 'sa', 'asa']);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyData, setIsEmptyData] = useState(false)
  const [myPrices, setMyPrices] = useState()

  useFocusEffect(
    useCallback(() => {
      fetchCustomList();
    }, [])
  );

  const fetchCustomList = async () => {
    console.log('fetchCustomList',fetchCustomList);
    try {
      setIsLoading(true);
      const response = await get(endpoints.TAILOR_GET_MY_PRICES);
      if (response && response.data) {
        setMyPrices(response?.data);
        setIsEmptyData(response.data.length === 0)
      } else {
        setIsEmptyData(true)
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCustomList = async (id) => {
    try {
      setIsLoading(true);
      const response = await del(endpoints.TAILOR_POST_ADD_PRICES + id);
      if (response) {
        ToastMsg(response?.message, 'success')
        setMyPrices(myPrices.filter(item => item.id !== id));
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };



  const renderList = ({ item }) => {
    return (
      <View style={styles.boxContainer}>
        <Text style={styles.labelTxt}>Type - {item?.type}</Text>
        <Text style={styles.labelTxt}>Category - {item?.categoryName}</Text>
        <Text style={styles.labelTxt}>Base Price - {item?.price}</Text>
        <Text style={styles.labelTxt}>Sub Category - {item?.subcategoryName}</Text>
        <Text style={styles.labelTxt}>Price - {item?.subprice}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('EditCustomizationList', { itemDetails : item})}>
          <Text style={styles.buttonText}>Edit Price</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.editBtn, {borderColor: AppColor.orange}]}
          onPress={()=>deleteCustomList(item?.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headingText}>{"Customization"}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Stich')}
          style={styles.headerRightBtn}>
          <Text style={[styles.text, { color: AppColor.purple }]}>Add New</Text>
        </TouchableOpacity>
      </View>
      {isEmptyData ? (
        <View style={styles.emptyRecordContainer}>
          <Text style={styles.emptyRecordText}>No records found</Text>
        </View>
      ) : (
        <FlatList
          data={myPrices}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {isLoading && <Loader />}

    </SafeAreaView>
  )
}

export default CustomizationList;

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
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingText: {
    fontFamily: Fonts.Poppins.semiBold,
    fontSize: 18,
    color: '#000'
  },
  boxContainer: {
    backgroundColor: "#FFF",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 7,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 3,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical:5
  },
  editBtn: {
    marginTop: 5,
    marginBottom: 2,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: AppColor.purple,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#000',
    fontSize: 13,
    fontFamily: Fonts.Poppins.regular,
  },
  labelTxt: {
    color: '#000',
    fontSize: 13,
    fontFamily: Fonts.Poppins.regular,
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
});