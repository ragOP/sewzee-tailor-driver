import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import PaperAppBar from '../Ui/PaperAppBar';
import MaterialIconsItem from '../Ui/MaterialIconsItem';
import {Appbar} from 'react-native-paper';

const PartricularRideDetails = ({navigation}) => {
  const handleMeasurement = () => {
    navigation.navigate('Measurement');
  };

  const handleReject = () => {
    navigation.navigate('DriverMainPage');
  };

  return (
    <>
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
        <Appbar.Content titleStyle={styles.header} title="Ride Details" />
      </PaperAppBar>
      <View style={styles.container}>
        <Image
          source={require('../Tailor/assets/Order.png')}
          style={styles.image}
        />
        <Text style={styles.orderText}>Order No.- 71 Kurta & Salwar</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}></ScrollView>

          <View style={styles.shadowContainer}></View>
   

        {/* Accept and Reject buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleMeasurement}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
    paddingTop: 15,
    width: '98%',
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  acceptButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 8,
    width:'48%',
    alignItems:'center'
  },
  rejectButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width:'48%',
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  shadowContainer: {},
  backButton: {
    paddingLeft: 5,
  },
  header: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  orderText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 15,
    marginLeft: 40,
    marginTop: -32,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default PartricularRideDetails;
