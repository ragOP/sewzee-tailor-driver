import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Card } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import HapticFeedback from 'react-native-haptic-feedback';
import { Appbar } from "react-native-paper";





const TailorMainPage = ({ navigation }) => {
  const [online, setOnline] = useState(true);

  const onlineOffline = () => {
    setOnline(!online);
    if (online) {
      if (Platform.OS === 'android') {
        HapticFeedback.trigger('impactMedium', {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: true
        });
      }
      Toast.show({
         type: 'success',
        position: 'bottom',
        text1: 'Welcome Back',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        textStyle: { fontFamily: 'Arial', fontSize: 22, fontWeight: 'bold' },
        style: { backgroundColor: 'green', borderRadius: 10 },
      });
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Tailor Offline',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        textStyle: { fontFamily: 'Arial', fontSize: 16, fontWeight: 'bold' },
        style: { backgroundColor: 'tomato', borderRadius: 10 },
      });
    }
  };

  const navigatePayment = () => {
    navigation.navigate('Payment');
  };

  const navigatePickup = () => {
    navigation.navigate('Pickup');
  };

  const navigateAllOrder = () => {
    navigation.navigate('AllOrder');
  };

  const carouselData = [
    { id: 1, title: 'Card 1', details: 'Card details 1' },
    { id: 2, title: 'Card 2', details: 'Card details 2' },
    { id: 3, title: 'Card 3', details: 'Card details 3' },
  ];
  React.useEffect(() => {
    // Disable back button navigation
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => (
        <TouchableOpacity
        onPress={navigatePayment}>
        <Appbar.Action
                style={{ margin: 0, padding: 0 }}
                icon="bell-outline"
                onPress={() => navigation.navigate("TailorNotification")}
              />
        </TouchableOpacity>
        
      ),
      headerTitle: () => (
        <Image
          source={{
            uri: 'https://static.wixstatic.com/media/b6448e_4ed0d1b876fc420fb4a09578040611e2~mv2.png/v1/crop/x_143,y_363,w_713,h_273/fill/w_214,h_82,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b6448e_4ed0d1b876fc420fb4a09578040611e2~mv2.png',
          }}
          style={styles.logo}
        />
        
      ),
    });
  });

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ParticularOrderDetails', { orderData: item })}>
        <Card style={styles.cards}>
          <Card.Title title={item.title} />
          <Card.Content>
            <Text style={styles.cardDetails}>{item.details}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Carousel
          data={carouselData}
          renderItem={renderCard}
          sliderWidth={300}
          itemWidth={250}
        />
      </View>

      <ScrollView>
        <View style={styles.container2}>
          <TouchableOpacity
            onPress={onlineOffline}
            style={[styles.card, online ? styles.cardOffline : styles.cardOnline]}>
            <Text>{online ? 'Offline' : 'Online'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigatePayment} style={styles.card}>
            <Text>Payment</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity onPress={navigatePickup} style={styles.card}>
            <Text>Pickup</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateAllOrder} style={styles.card}>
            <Text>View All Orders</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

const styles = StyleSheet.create({
  cards: {
    marginVertical: 8,
    elevation: 4,
  },
  cardDetails: {
    fontSize: 16,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 5,
  },
  card: {
    flex: 1,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 8,
    padding: 16,
    elevation: 10,
  },
  cardOnline: {
    backgroundColor: 'green',
  },
  cardOffline: {
    backgroundColor: 'red',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
});

export default TailorMainPage;
