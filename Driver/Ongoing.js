import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';

const Ongoing = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      buttons: [
        {
          label: 'Order No.- 71 | Kurta & Salwar',
          image: require('../Tailor/assets/Order.png'),
        },
        {
          label: 'Order No.- 71 | Kurta & Salwar',
          image: require('../Tailor/assets/Order.png'),
        },
        {
          label: 'Order No.- 71 | Kurta & Salwar',
          image: require('../Tailor/assets/Order.png'),
        },
      ],
    },
  ];
  return (
    <>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {tabs[activeTab].buttons.map((button, index, item) => (
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
        </View>
      </ScrollView>
    </>
  );
};

export default Ongoing;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
  },
  tabButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 12,
    shadowOffset: {width: 0, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 30,
    backgroundColor: 'white',
    elevation: 8,
    zIndex: 99,
    borderColor: 'white',
    width: '94%',
    height: 150,
    paddingBottom: 25,
    marginLeft: 12,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 75,
    paddingLeft: 15,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 80,
  },
  view: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginLeft: -220,
    marginBottom: -60,
    shadowOffset: {width: 0, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 30,
    backgroundColor: 'white',
    elevation: 8,
    zIndex: 99,
    borderColor: 'white',
  },
  view2: {
    width: 1,
    marginLeft: 10,
    height: 90,
    borderRadius: 6,
    marginBottom: -60,
    shadowRadius: 30,
    backgroundColor: '#000000',
    elevation: 8,
    zIndex: 99,
    borderColor: 'white',
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  address: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: -100,
    marginBottom: -40,
  },
  containerButton: {
    borderColor: 'black',
    borderWidth: 0.4,
    width: '96%',
    height: 70,
    marginBottom: 10,
    borderRadius: 12,
    marginLeft: 8,
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 30,
    backgroundColor: 'white',
    elevation: 8,
    zIndex: 99,
  },
  button2: {
    width: '36%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    elevation: 20,
    backgroundColor: '#7d5ffe',
    marginLeft: 230,
    marginTop: -37,
  },
});
