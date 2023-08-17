import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, FlatList, } from 'react-native';
import PaperAppBar from '../Ui/PaperAppBar'
import MaterialIconsItem from '../Ui/MaterialIconsItem'
import { Appbar } from "react-native-paper";
import React, { useCallback, useEffect, useState } from 'react';
import Fonts from '../theme/font';
import GradientTextOrange from '../Ui/gradientTextOrange';
import GradientProgressBar from '../Ui/gradientProgressBar';
import AppColor from '../theme/colors';
import ImagePath from '../theme/imagePath';
import GradientTextPurple from '../Ui/gradientTextPurple';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { endpoints } from '../api';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from '../api/apiHelper';
import Loader from '../Ui/Loader';


const TailorAllOrders = ({ navigation }) => {
  const moment = require('moment');

  const [refreshing, setRefreshing] = useState(false);
  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyData, setIsEmptyData] = useState(false)
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [orderList, setOrderList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchOrdersApiMethod();
    }, [])
  );

  const fetchOrdersApiMethod = async (tabIndex) => {
    setIsLoading(true)
    try {
      let userData = await AsyncStorage.getItem('userData');
      userData = JSON.parse(userData);
      if (!userData) {
        console.log('User data is not available. Cannot fetch orders.');
        return;
      }
      let endpoint = endpoints.TAILOR_GET_PENDING_ORDERS;
      switch (tabIndex) {
        case 1:
          endpoint = endpoints.TAILOR_GET_ONGOING_ORDERS;
          break;
        case 2:
          endpoint = endpoints.TAILOR_GET_COMPLETED_ORDERS;
          break;
        case 3:
          endpoint = endpoints.TAILOR_GET_REJECTED_ORDERS;
          break;
        default:
          break;
      }

      const response = await get(endpoint);
      if (response && response.data) {
        setOrderList(response?.data);
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

  const handleButtonPress = (tabIndex) => {
    console.log('index', tabIndex);
    setActiveTab(tabIndex)
    fetchOrdersApiMethod(tabIndex);
  };



  const renderItem = ({ item }) => {
    // console.log('item====', item);
    return (
      <View style={{ paddingHorizontal: 6 }}>
        <TouchableOpacity style={styles.button}
          activeOpacity={1}
          onPress={() => navigation.navigate('ParticularOrderDetails', { orderData: item })}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Image source={ImagePath.orderList} style={styles.image} resizeMode='contain' />
              <Text style={styles.headingText}>Order Id - {item?.id}</Text>
              <View style={[styles.verticalBorder, { height: '80%' }]} />
              <Text style={styles.headingText}>{item?.category}</Text>
            </View>
            <Image source={ImagePath.backArrow} style={styles.image} resizeMode='contain' />
          </View>

          <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
            <View style={styles.smallViewBox}></View>
            <View style={styles.verticalBorder}></View>
            <View style={styles.addressContainer}>
              <Text style={styles.labelTxt}>Name - {item?.order_for[0].name}</Text>
              <Text style={[styles.labelTxt, { fontSize: 11 }]}>Address- {item.address.address + ", " + item.address.city + ", " + item.address.pincode}</Text>

              <View style={{ height: 27 }}>
                <View style={{ top: -4, height: 13, justifyContent: 'center', alignItems: 'flex-end', }}>

                  <GradientTextPurple style={[styles.gradientTxt, { fontSize: 9 }]}>{"5 days Remain"}</GradientTextPurple>
                </View>

                <View style={{
                  alignItems: 'center', flexDirection: 'row',
                  justifyContent: 'space-between', paddingVertical: 5, bottom: 12
                }}>
                  <Text style={[styles.labelTxt, { fontSize: 12 }]}>Due On - {item?.pickup_date}</Text>
                  <View style={{ width: '42%' }}>
                    <GradientProgressBar progress={40} />
                  </View>
                </View>

              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.labelTxt}>Amount - </Text>
                <Text style={styles.amountTxt}>{"₹" + item?.tailorPrice}</Text>
                {/* <Text style={styles.amountTxt}>{" + "}</Text> */}
                {/* <GradientTextOrange style={styles.gradientTxt}>{"₹ 50(Express)"}</GradientTextOrange> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const showFromDatePicker = () => {
    setFromDatePickerVisibility(true);
  };

  const hideFromDatePicker = () => {
    setFromDatePickerVisibility(false);
  };

  const handleFromConfirm = (date) => {
    hideFromDatePicker();
    setFromDate(date)
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setToDate(date)
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const tabs = [
    {
      id: 0, title: 'All Orders',
    },
    {
      id: 1, title: 'Ongoing'
    },
    {
      id: 2, title: 'Completed'
    },
    {
      id: 3, title: 'Rejected',
    },
  ];

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
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
        <Appbar.Content titleStyle={[styles.headingText, { fontSize: 20 }]} title="Orders" />
      </PaperAppBar>

      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            activeOpacity={1}
            key={tab.id}
            style={[styles.tabButton, activeTab === index && styles.activeTab]}
            onPress={() => handleButtonPress(index)}
          >
            <Text style={[styles.tabButtonText, activeTab === index && styles.activeButtonText]}>
              {tab.title}</Text>
          </TouchableOpacity>
        ))}
      </View>


      <View style={{ paddingHorizontal: 14, flexDirection: 'row', marginVertical: 15, alignItems: 'center' }}>
        <Text style={[styles.headingText]}>Filter : </Text>
        <TouchableOpacity style={styles.filterButton} onPress={showFromDatePicker}>
          <Text style={styles.filterBtnText}>
            {
              fromDate ? moment(fromDate).format("DD/MM/YY") :
                'From'
            }</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={showDatePicker}>
          <Text style={styles.filterBtnText}>
            {
              toDate ? moment(toDate).format("DD/MM/YY") :
                'To'}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isFromDatePickerVisible}
        mode="date"
        onConfirm={handleFromConfirm}
        onCancel={hideFromDatePicker}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
 {isEmptyData ? (
        <View style={styles.emptyRecordContainer}>
          <Text style={styles.emptyRecordText}>No records found</Text>
        </View>
      ) : (
        <FlatList
        data={orderList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      )}
      {isLoading && <Loader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 8
  },
  tabButton: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: '#00000040'
  },
  activeTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: '#7d5ffe',
  },
  tabButtonText: {
    color: '#000',
    fontSize: 13,
    fontFamily: Fonts.Poppins.regular,
  },
  activeButtonText: {
    color: '#7d5ffe',
    fontSize: 13,
    fontFamily: Fonts.Poppins.regular,
  },
  headingText: {
    fontFamily: Fonts.Poppins.semiBold,
    fontSize: 15,
    color: '#000'
  },

  button: {
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
    padding: 5
  },
  filterButton: {
    backgroundColor: "#FFF",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 7,
    marginHorizontal: 5,
    marginLeft: 20,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4
  },

  image: {
    width: 27,
    height: 28,
    marginRight: 5
  },

  smallViewBox: {
    backgroundColor: "#FFF",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 7,
    marginLeft: 10,
    borderRadius: 12,
    height: 70,
    width: 70
  },
  addressContainer: {
    flex: 1,
  },
  verticalBorder: {
    width: 0.5,
    height: '100%',
    marginHorizontal: 10,
    backgroundColor: '#0000004f',
  },
  purpleTxt: {
    color: AppColor.purple,
    fontSize: 12,
    fontFamily: Fonts.Poppins.semiBold,
    fontStyle: 'italic'
  },
  labelTxt: {
    color: '#000',
    fontSize: 12,
    fontFamily: Fonts.Poppins.semiBold,
  },
  amountTxt: {
    color: AppColor.green,
    fontSize: 12,
    fontFamily: Fonts.Poppins.semiBold,
  },
  gradientTxt: {
    fontSize: 12,
    fontFamily: Fonts.Poppins.semiBold,
  },
  filterBtnText: {
    color: '#0000004f',
    fontSize: 15,
    fontFamily: Fonts.Poppins.regular,
    fontStyle: 'italic'
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

export default TailorAllOrders;
