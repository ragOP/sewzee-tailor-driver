import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import ImagePath from '../theme/imagePath';
import AppColor from '../theme/colors';
import Fonts from '../theme/font';
import GradientProgressBar from '../Ui/gradientProgressBar';
import GradientTextOrange from '../Ui/gradientTextOrange';
import GradientTextPurple from '../Ui/gradientTextPurple';

const Ongoing = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 1, orderNo: 'Order No.- 71', type: 'Kurta & Salwar' },
    { id: 2, orderNo: 'Order No.- 71', type: 'Kurta & Salwar' },
    { id: 3, orderNo: 'Order No.- 71', type: 'Kurta & Salwar' },
  ];

  return (
    <>
      <View style={{ marginHorizontal: 10, paddingVertical: 5 }}><Text style={styles.purpleTxt}>{'07 Orders Ongoing'}</Text></View>
      <ScrollView style={styles.container}>
        {tabs.map(item => (
          <TouchableOpacity style={styles.button}
            key={item.id}
            activeOpacity={1}
            onPress={() => navigation.navigate('ParticularRideDetails', { orderData: item })}>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={ImagePath.orderList} style={styles.image} resizeMode='contain' />
                <Text style={styles.headingText}>{item.orderNo}</Text>
                <View style={[styles.verticalBorder, { height: '80%' }]} />
                <Text style={[styles.headingText]}>{item.type}</Text>
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
        ))}
      </ScrollView>

    </>
  );
};

export default Ongoing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  purpleTxt: {
    color: AppColor.purple,
    fontSize: 12,
    fontFamily: Fonts.Poppins.semiBold,
    fontStyle: 'italic'
  },
  headingText: {
    fontFamily: Fonts.Poppins.semiBold,
    fontSize: 15,
    color: '#000'
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
});
