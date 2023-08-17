import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Fonts from '../theme/font';
import ImagePath from '../theme/imagePath';
import AppColor from '../theme/colors';
import { endpoints } from '../api';
import { get } from '../api/apiHelper';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Ui/Loader';
import { ToastMsg } from '../Ui/ToastMsg';
import GradientTextPurple from '../Ui/gradientTextPurple';
import GradientProgressBar from '../Ui/gradientProgressBar';

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

const DriverMainPage = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeHrs, setaActiveHrs] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [isEmptyData, setIsEmptyData] = useState(false)
  const isInitialRenderRef = useRef(true);
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (!isInitialRenderRef.current) {
      fetchOrdersApiMethod(activeTab);
    } else {
      isInitialRenderRef.current = false;
    }
  }, [activeTab, isFocused]);

  useEffect(() => {
    fetchActiveTab();
    methodGetActiveHours();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDriverProfileData();
    }, [])
  );

  const fetchActiveTab = async () => {
    try {
      const storedTab = await AsyncStorage.getItem('activeTab');
      if (storedTab !== null) {
        setActiveTab(Number(storedTab));
      } else {
        setActiveTab(0);
        AsyncStorage.setItem('activeTab', '0');
      }
    } catch (error) {
      console.log('Error fetching active tab:', error);
    }
  };

  const fetchOrdersApiMethod = async (tabIndex) => {
    setIsLoading(true)
    try {
      let userData = await AsyncStorage.getItem('userData');
      userData = JSON.parse(userData);
      if (!userData) {
        console.log('User data is not available. Cannot fetch orders.');
        return;
      }
      let endpoint = endpoints.DRIVER_GET_PENDING_ORDERS;
      switch (tabIndex) {
        case 1:
          endpoint = endpoints.DRIVER_GET_ONGOING_ORDERS;
          break;
        case 2:
          // endpoint = endpoints.DRIVER_GET_COMPLETED_ORDERS;
          break;
        case 3:
          // endpoint = endpoints.DRIVER_GET_REJECTED_ORDERS;
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

  const fetchDriverProfileData = async () => {
    try {
      const response = await get(endpoints.DRIVER_GET_PROFILE);
      if (response) {
        await AsyncStorage.setItem('userData', JSON.stringify(response?.user));
        setData(response?.user);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonPress = (tabIndex) => {
    console.log('index',tabIndex);
    setActiveTab(tabIndex)
    try {
      AsyncStorage.setItem('activeTab', String(tabIndex));
    } catch (error) {
      console.log('Error storing active tab:', error);
    }
  };

  const methodClockIn = async () => {
    try {
      setIsLoading(true)
      const response = await get(endpoints.DRIVER_CLOCK_IN);
      if (response) {
        ToastMsg(response?.message, 'success');

      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const methodClockOut = async () => {
    try {
      setIsLoading(true)
      const response = await get(endpoints.DRIVER_CLOCK_OUT);
      if (response) {
        ToastMsg(response?.message, 'success');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const methodGetActiveHours = async () => {
    try {
      const response = await get(endpoints.DRIVER_ACTIVE_HOURS);
      if (response) {
        setaActiveHrs(response?.mins)
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleButtonClick = () => {
    setIsOnline((prevIsOnline) => {
      if (prevIsOnline) {
        methodClockOut();
      } else {
        methodClockIn();
      }
      return !prevIsOnline;
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingHorizontal: 6 }}>
        <TouchableOpacity style={styles.button}
          activeOpacity={1}
          onPress={() => navigation.navigate('ParticularOrderDetails', { orderData: item})}>
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
                <Text style={styles.amountTxt}>{"₹" + item?.driverPrice}</Text>
                {/* <Text style={styles.amountTxt}>{" + "}</Text> */}
                {/* <GradientTextOrange style={styles.gradientTxt}>{"₹ 50(Express)"}</GradientTextOrange> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headingText}>{"Welcome, "}
          <Text style={styles.subHeadingText}>{data?.name}</Text></Text>
        <TouchableOpacity
          onPress={() =>{}}
          style={{
            flexDirection: 'row',
            backgroundColor: "#FFF",
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 7,
            borderRadius: 12,
            paddingHorizontal: 10, 
            alignItems: 'center'
          }}>
          <Text style={[styles.text, { color: AppColor.purple }]}>Help</Text>
          <Image source={ImagePath.call} style={{ height: 20, width: 20 }} resizeMode='contain' />
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: 12, paddingHorizontal: 15 }}>
        <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            activeOpacity={1}
            key={tab.id}
            style={[styles.item, activeTab === index && styles.activeItem]}
            onPress={() => handleButtonPress(index)}
          >
            <Text style={[styles.text, activeTab === index && styles.text]}>
              {tab.title}</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>

      <View style={styles.scrollContainer}>
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
        {/* <Ongoing navigation={navigation} /> */}
      </View>

      <ScrollView style={{ marginTop: 15 }}>
        <View style={styles.cardBoxMainView}>
          <View style={styles.cardBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={ImagePath.clock} style={{ height: 30, width: 30 }} resizeMode='contain' />
              <Text style={[styles.text, { fontFamily: Fonts.Poppins.semiBold }]}>CLOCK-IN</Text>
            </View>
            <Text style={styles.greenTxt}>{activeHrs} Minutes</Text>
            <TouchableOpacity
              onPress={handleButtonClick}
              style={[styles.btnView, { backgroundColor: isOnline ? '#BDFFC375' : 'transparent' }]}>
              <Text style={styles.blackTxt}>{isOnline ? 'Online' : 'Offline'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={ImagePath.cardPayment} style={{ height: 30, width: 30 }} resizeMode='contain' />
              <Text style={[styles.text, { fontFamily: Fonts.Poppins.semiBold }]}>PAYMENTS</Text>
            </View>
            <Text style={styles.greenTxt}>₹ 230 Available</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Payment')}
              style={styles.btnView}>
              <Text style={styles.blackTxt}>{'View'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardBoxMainView}>
          <View style={styles.cardBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={ImagePath.scooter} style={{ height: 30, width: 30 }} resizeMode='contain' />
              <Text style={[styles.text, { fontFamily: Fonts.Poppins.semiBold }]}>PICKUP</Text>
            </View>
            <Text style={styles.greenTxt}>2 On The Way</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Pickup')}
              style={styles.btnView}>
              <Text style={styles.blackTxt}>{'Request'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={ImagePath.orderList} style={{ height: 30, width: 30 }} resizeMode='contain' />
              <Text style={[styles.text, { fontFamily: Fonts.Poppins.semiBold }]}>VIEW ALL ORDERS</Text>
            </View>
            <Text style={styles.greenTxt}>20 Available</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DriverAllOrders')}
              style={styles.btnView}>
              <Text style={styles.blackTxt}>{'View'}</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
      {isLoading && <Loader />}
      {/* <Toast ref={ref => Toast.setRef(ref)} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  headerView: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },

  scrollContainer: {
    height: '40%',
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 7,
    marginHorizontal: 10,
    paddingTop: 10
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },

  item: {
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderColor: '#00000040',
    paddingVertical: 3
  },
  activeItem: {
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderColor: AppColor.purple,
    paddingVertical: 3,
  },
  text: {
    color: '#000',
    fontSize: 12,
    fontFamily: Fonts.Poppins.regular,
  },
  blackTxt: {
    fontSize: 12,
    fontFamily: Fonts.Poppins.regular,
    color: '#000'
  },
  cardBoxMainView: {
    flexDirection: 'row',
    marginHorizontal: 17,
    justifyContent: 'space-between',
    marginBottom: 15
  },
  cardBox: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 7,
    width: '47%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnView: {
    borderWidth: 1,
    bottom: -30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    borderColor: '#0000004f'
  },
  greenTxt: {
    top: 5,
    color: AppColor.green,
    fontSize: 10,
    fontFamily: Fonts.Poppins.regular
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

export default DriverMainPage;
