import { View, StyleSheet ,Text,Image, TouchableOpacity, ScrollView ,  RefreshControl,} from 'react-native';
import PaperAppBar from '../Ui/PaperAppBar'
import MaterialIconsItem from '../Ui/MaterialIconsItem'
import { Appbar } from "react-native-paper";
import React, { useState } from 'react';

const AllRide = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);
  const tabs = [
    { id: 0, title: 'All Orders', buttons: [
      { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },
      { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },
      { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },
      { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },
      { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') }
    ],},
    { id: 1, title: 'Ongoing', buttons: [
      { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },
      { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },
      { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },] },
    { id: 2, title: 'Completed', buttons: [
      { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },
      { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },] },
    { id: 3, title: 'Rejected', buttons: [
      { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },] },
  ];
  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };
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
    <Appbar.Content titleStyle={styles.header} title="All Rides" />
  </PaperAppBar>
  <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
          activeOpacity={1}
            key={tab.id}
            style={[styles.tabButton, activeTab === index && styles.activeTab]}
            onPress={() => handleTabPress(index)}
          >
            <Text style={styles.tabButtonText}>{tab.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}   tintColor="#333"/> }>
     
        {tabs[activeTab].buttons.map((button, index,item) => (
          <TouchableOpacity key={index} style={styles.button}
          activeOpacity={1}
          onPress={() => navigation.navigate('ParticularRideDetails', { orderData: item})}>
            <Image source={button.image} style={styles.image} />
            <Text style={styles.buttonText}>{button.label}</Text>
            <View style={styles.view}></View>
            <View style={styles.view2}></View>
            <Text style={styles.name}>Name-King Rag</Text>
            <Text style={styles.address}>Address- Road No. 5 Delhi</Text>
          </TouchableOpacity>
        ))}
      
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft:2
    
  },
  tabButton: {
    flex: 1,
    width:'25%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
     elevation: 20 ,
     borderWidth:0.2,
     borderColor: '#7d5ffe',
    //  activeOpacity:{opacity ? 0.9 : 1} 
  },
  activeTab: {
    borderWidth:1,
    borderColor: '#7d5ffe',
    
  },
  tabButtonText: {
    color: '#000',
    fontWeight: 'bold',
    
  },
  button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth:1,
        borderRadius:12,
        shadowOffset: { width: 0, height: 15 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 30,
        backgroundColor: 'white',
        elevation: 8,
        zIndex: 99,
        borderColor:'white',
        width:"96%",
        height:165,
        paddingBottom:25,
        marginLeft:8
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom:75,
    paddingLeft:15
  },
  image: {
    width: 40,
    height: 40,
    marginBottom:80
    
  },
  view :{
    width:100,
    height:100,
    borderRadius:6,
    marginLeft:-220,
    marginBottom:-60,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 30,
    backgroundColor: 'white',
    elevation: 8,
    zIndex: 99,
    borderColor:'white',

  },
  view2 :{
    width:1,
    marginLeft:10,
    height:90,
    borderRadius:6,
    marginBottom:-60,
    shadowRadius: 30,
    backgroundColor: '#000000',
    elevation: 8,
    zIndex: 99,
    borderColor:'white',

  },
  name:{
    color: '#000',
    fontWeight: 'bold',
    marginLeft:10,
  },
  address :{
    color: '#000',
    fontWeight: 'bold',
    marginLeft:-100,
    marginBottom:-40
    
  }
});

export default AllRide;
