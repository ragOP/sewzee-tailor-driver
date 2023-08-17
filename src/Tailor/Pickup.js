import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import PaperAppBar from '../Ui/PaperAppBar';
import MaterialIconsItem from '../Ui/MaterialIconsItem';
import { Appbar } from 'react-native-paper';
import Fonts from '../theme/font';
import GradientProgressBar from '../Ui/gradientProgressBar';
import ImagePath from '../theme/imagePath';
import AppColor from '../theme/colors';
import GradientTextOrange from '../Ui/gradientTextOrange';
import GradientTextPurple from '../Ui/gradientTextPurple';

const screenWidth = Dimensions.get('window').width;
const Pickup = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedButtonIndexes, setSelectedButtonIndexes] = useState([]);

  const tabs = [
    {
      id: 0,
      title: 'Ongoing',
      buttons: [
        { orderNo: 'Order No.- 71', type: 'Kurta & Salwar', image: require('./assets/Order.png') },
        { orderNo: 'Order No.- 71', type: 'Kurta & Salwar', image: require('./assets/Order.png') },
        { orderNo: 'Order No.- 71', type: 'Kurta & Salwar', image: require('./assets/Order.png') },]
    },
  ];

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
        <Appbar.Content titleStyle={[styles.headingText, { fontSize: 20 }]} title="Pickup Selector" />
      </PaperAppBar>


      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <View
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === index && styles.activeTab,
            ]}
          >
            <Text style={styles.tabButtonText}>{tab.title}</Text>
          </View>
        ))}
      </View>


      <ScrollView
        style={{ paddingHorizontal: 6 }}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#333" />}
      >

        {tabs[activeTab].buttons.map((button, index, item) => {
          const isSelected = selectedButtonIndexes.includes(index);
          return (
            <TouchableOpacity key={index} style={[
              styles.button,
              isSelected ? { borderColor: AppColor.purple } : { borderWidth: 0 },
            ]}
              activeOpacity={1}
              onPress={() => {
                if (isSelected) {
                  setSelectedButtonIndexes((prevIndexes) =>
                    prevIndexes.filter((i) => i !== index)
                  );
                } else {
                  setSelectedButtonIndexes((prevIndexes) => [...prevIndexes, index]);
                }
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={ImagePath.orderList} style={styles.image} resizeMode='contain' />
                  <Text style={styles.headingText}>{button.orderNo}</Text>
                  <View style={[styles.verticalBorder, { height: '80%' }]} />
                  <Text style={styles.headingText}>{button.type}</Text>
                </View>
                <Image source={ImagePath.backArrow} style={styles.image} resizeMode='contain' />
              </View>

              <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
                <View style={styles.smallViewBox}></View>
                <View style={styles.verticalBorder}></View>
                <View style={styles.addressContainer}>
                  <Text style={styles.labelTxt}>Name - {"King Rag"}</Text>
                  <Text style={[styles.labelTxt, { fontSize: 11 }]}>Address- {"Road No. 5 Delhi"}</Text>

                  <View style={{ height: 27 }}>
                    <View style={{ top: -4, height: 13, justifyContent: 'center', alignItems: 'flex-end', }}>

                      <GradientTextPurple style={[styles.gradientTxt, { fontSize: 9 }]}>{"5 days Remain"}</GradientTextPurple>
                    </View>

                    <View style={{
                      alignItems: 'center', flexDirection: 'row',
                      justifyContent: 'space-between', paddingVertical: 5, bottom: 12
                    }}>
                      <Text style={[styles.labelTxt, { fontSize: 12 }]}>Due On - {"28-06-2023"}</Text>
                      <View style={{ width: '45%' }}>
                        <GradientProgressBar progress={40} />
                      </View>
                    </View>

                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelTxt}>Amount - </Text>
                    <Text style={styles.amountTxt}>{"₹ 675"}</Text>
                    <Text style={styles.amountTxt}>{" + "}</Text>
                    <GradientTextOrange style={styles.gradientTxt}>{"₹ 50(Express)"}</GradientTextOrange>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.headingText}>
          Order No. -{' '}
          {selectedButtonIndexes.map(
            (index) => tabs[activeTab].buttons[index].orderNo.substring(10)
          ).join(', ')}
        </Text>
        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={[styles.headingText, { color: '#FFF' }]}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Pickup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  activeTab: {
    borderWidth: 1,
    borderColor: AppColor.purple,
  },
  headingText: {
    fontFamily: Fonts.Poppins.semiBold,
    fontSize: 15,
    color: '#000'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 8
  },
  tabButton: {
    width: '26%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: '#00000040'
  },
  tabButtonText: {
    color: AppColor.purple,
    fontSize: 13,
    fontFamily: Fonts.Poppins.regular,
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
    padding: 5,
    borderWidth: 1
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
  bottomContainer: {
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: AppColor.purple,
    bottom: 20,
    position: 'absolute',
    left: screenWidth * 0.05,
    right: screenWidth * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 7,
  },
  confirmBtn: {
    backgroundColor: AppColor.purple,
    paddingVertical: 5,
    borderRadius: 13,
    paddingHorizontal: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 7,
  }
});
