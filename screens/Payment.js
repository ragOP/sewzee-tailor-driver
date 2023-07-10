import React from 'react';
import { View, StyleSheet ,Text,Image, TouchableOpacity } from 'react-native';
import PaperAppBar from '../Ui/PaperAppBar'
import MaterialIconsItem from '../Ui/MaterialIconsItem'
import { Appbar } from "react-native-paper";

const Payment = ({navigation}) => {
  const data = [
    { id: 1, image: require('../Tailor/assets/Cash.png'),title:'Order No.- 71 | Kurta & Salwar',title2 :'Amount- ₹ 675 + ₹ 50(Express)',title3 :'Net - ₹ 725',button : 'Withdraw'},
    { id: 2, image: require('../Tailor/assets/Cash.png'),title:'Order No.- 71 | Kurta & Salwar',title2 :'Amount- ₹ 675 + ₹ 50(Express)',title3 :'Net - ₹ 725',button : 'Withdraw'},
    { id: 3, image: require('../Tailor/assets/Cash.png'),title:'Order No.- 71 | Kurta & Salwar',title2 :'Amount- ₹ 675 + ₹ 50(Express)',title3 :'Net - ₹ 725',button : 'Withdraw'},
  ];
  return (
    <>
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
    <Appbar.Content titleStyle={styles.header} title="Payment" />
  </PaperAppBar>
    <View style={styles.row}>
      <View style={styles.view}>
      <Text style={styles.text}>Available = ₹2130</Text>
      </View>
      <View style={styles.view2}>
     < Text style={styles.text2}>Process = ₹1110</Text> 
      </View>
    </View>
    <View style={styles.container}>
      {data.map(item => (
        <View key={item.id} style={styles.item}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title2}>{item.title2}</Text>
          <Text style={styles.title3}>{item.title3}</Text>
          <Text  onPress={() => navigation.goBack()} style={styles.button}>{item.button}</Text>
        </View>
      ))}
    </View>
    <TouchableOpacity style={styles.withdraw} 
    onPress={() => navigation.goBack()}>
      <Text  style={styles.text}>Withdraw All</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
   padding:10
  },

  text:{
    color: '#5E9C76',
fontFamily: 'Roboto',
fontSize: 15,
  },
  text2:{
    color: '#FF6B00',
fontFamily: 'Roboto',
fontSize: 15,
  },
  view: {
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#5E9C76",
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 25,
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 99,
  },
  view2: {
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#FF6B00",
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 25,
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 99,
  },
  withdraw: {
    alignItems: "center",
    justifyContent: "center",
    width: "96%",
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#5E9C76",
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 25,
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 99,
    marginLeft:8,
    marginTop:200
  },
  container: {
  
    justifyContent: 'center',
    padding:12,
    
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth:1,
    borderRadius:12,
    height:100,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 30,
    backgroundColor: 'white',
    elevation: 8,
    zIndex: 99,
    borderColor:'white'
    
  },
  image: {
    width: 40,
    height: 30,
    marginBottom:60
    
  },
  title:{
    color: '#000',
    fontWeight: 'bold',
    marginBottom:60,
    paddingLeft:15
  },
  title2:{
    color: '#000',
    fontWeight: 'bold',
    marginLeft:-240,
    fontSize:19

    
    
  },
   title3:{
    color: '#000',
    fontWeight: 'bold',
    marginLeft:-268,
    fontSize:19,
    marginTop:55
   },
  button :{
    color: '#5E9C76',
    fontWeight: 'bold',
    borderWidth:1,
    borderRadius:12,
    marginTop:50,
    marginLeft:180,
    width:'20%',
    borderColor:'#5E9C76',
    alignItems: "center",
  

  },
  backButton: {
    padding: 5,
  },
  header: {
  fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
});

export default Payment;
