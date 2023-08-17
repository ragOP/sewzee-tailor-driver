import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import PaperAppBar from '../Ui/PaperAppBar'
import MaterialIconsItem from '../Ui/MaterialIconsItem'
import { Appbar } from "react-native-paper";
import Fonts from '../theme/font';
import AppColor from '../theme/colors';
import ImagePath from '../theme/imagePath';
import GradientTextOrange from '../Ui/gradientTextOrange';

const Payment = ({ navigation }) => {
  const tabs = [
    { id: 1, orderNo: 'Order No.- 71', type: 'Kurta & Salwar' },
    { id: 2, orderNo: 'Order No.- 71', type: 'Kurta & Salwar' },
    { id: 3, orderNo: 'Order No.- 71', type: 'Kurta & Salwar' },
  ];

  // const data = [
  //   { id: 1, image: require('../Tailor/assets/Cash.png'), title: 'Order No.- 71 | Kurta & Salwar', title2: 'Amount- ₹ 675 + ₹ 50(Express)', title3: 'Net - ₹ 725', button: 'Withdraw' },
  //   { id: 2, image: require('../Tailor/assets/Cash.png'), title: 'Order No.- 71 | Kurta & Salwar', title2: 'Amount- ₹ 675 + ₹ 50(Express)', title3: 'Net - ₹ 725', button: 'Withdraw' },
  //   { id: 3, image: require('../Tailor/assets/Cash.png'), title: 'Order No.- 71 | Kurta & Salwar', title2: 'Amount- ₹ 675 + ₹ 50(Express)', title3: 'Net - ₹ 725', button: 'Withdraw' },
  // ];
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
        <Appbar.Content titleStyle={[styles.headingText, { fontSize: 20 }]} title="Payments" />
      </PaperAppBar>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
        <View>
          <Text style={[styles.btnStyle, { borderColor: AppColor.green, marginBottom: 10 }]}>Available = 2130</Text>
          <Text style={[styles.btnStyle, { borderColor: AppColor.orange }]}>In Process = 2130</Text>
        </View>
        <View>
          <Text style={styles.btnWithShadowStyle}>Withdraw All</Text>
        </View>
      </View>


      <ScrollView style={styles.scrollContainer}>
        {tabs.map(item => (
          <TouchableOpacity style={styles.outerBoxView}
            key={item.id}
            activeOpacity={1}
            onPress={() => navigation.navigate('ParticularRideDetails', { orderData: item })}>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={ImagePath.cash} style={styles.image} resizeMode='contain' />
                <Text style={styles.headingText}>{item.orderNo}</Text>
                <View style={[styles.verticalBorder, { height: '80%' }]} />
                <Text style={[styles.headingText]}>{item.type}</Text>
              </View>
              <Image source={ImagePath.backArrow} style={styles.image} resizeMode='contain' />
            </View>

            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
              <Text style={styles.labelTxt}>Amount - </Text>
              <Text style={styles.greenTxt}>{"₹ 675"}</Text>
              <Text style={styles.greenTxt}>{" + "}</Text>
              <GradientTextOrange style={styles.gradientTxt}>{"₹ 50(Express)"}</GradientTextOrange>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.labelTxt}>Net - </Text>
              <Text style={styles.greenTxt}>{"₹ 675"}</Text>
            </View>
            <TouchableOpacity
            onPress={()=>{}}
            >
          <Text style={[styles.btnWithShadowStyle,{padding: 3, paddingHorizontal: 8, borderRadius: 15}]}>Withdraw</Text>
        </TouchableOpacity>
        </View>


          </TouchableOpacity>
        ))}
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  btnStyle: {
    borderWidth: 1,
    padding: 8,
    textAlign: 'center',
    borderRadius: 12,
    fontFamily: Fonts.Poppins.medium,
    width: 160
  },
  btnWithShadowStyle: {
    fontFamily: Fonts.Poppins.medium,
    borderColor: AppColor.green,
    borderWidth: 0.7,
    padding: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
    borderRadius: 12,
    backgroundColor: "#FFF",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 7,
  },
  scrollContainer: {
    paddingHorizontal: 5,
    marginTop: 20
  },
  outerBoxView: {
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
    paddingVertical: 10
  },
  image: {
    width: 27,
    height: 28,
    marginRight: 5
  },
  verticalBorder: {
    width: 0.5,
    height: '100%',
    marginHorizontal: 10,
    backgroundColor: '#0000004f',
  },
  headingText: {
    fontFamily: Fonts.Poppins.semiBold,
    fontSize: 14,
    color: '#000'
  },
  labelTxt: {
    color: '#000',
    fontSize: 15,
    fontFamily: Fonts.Poppins.semiBold,
  },
  greenTxt: {
    color: AppColor.green,
    fontSize: 15,
    fontFamily: Fonts.Poppins.semiBold,
  },
  gradientTxt: {
    fontSize: 15,
    fontFamily: Fonts.Poppins.semiBold,
  },
});

export default Payment;
