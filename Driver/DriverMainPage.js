import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Card, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const DriverMainPage = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [selectedNavItem, setSelectedNavItem] = useState('Home'); // State variable to track the selected bar
  const onlineImage = 'https://static.wixstatic.com/media/b6448e_4ed0d1b876fc420fb4a09578040611e2~mv2.png/v1/crop/x_143,y_363,w_713,h_273/fill/w_214,h_82,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b6448e_4ed0d1b876fc420fb4a09578040611e2~mv2.png';
  const offlineImage = 'https://previews.123rf.com/images/sarahdesign/sarahdesign1410/sarahdesign141000851/32210992-logout-icon.jpg';

  React.useEffect(() => {
    // Disable back button navigation
    navigation.setOptions({
      headerLeft: () => null,
      headerTitle: () => (
        <Image
          source={{ uri: 'https://static.wixstatic.com/media/b6448e_4ed0d1b876fc420fb4a09578040611e2~mv2.png/v1/crop/x_143,y_363,w_713,h_273/fill/w_214,h_82,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b6448e_4ed0d1b876fc420fb4a09578040611e2~mv2.png' }}
          style={styles.logo}
        />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsOnline(!isOnline)}>
          <View style={styles.onlineStatusContainer}>
            <Image
              source={isOnline ? { uri: onlineImage } : { uri: offlineImage }}
              style={styles.onlineStatusImage}
            />
            <Text style={styles.onlineStatusText}>{isOnline ? 'Online' : 'Off1line'}</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [isOnline]);

  const carouselData = [
    { id: 1, title: 'Card 1', details: 'Card details 1' },
    { id: 2, title: 'Card 2', details: 'Card details 2' },
    { id: 3, title: 'Card 3', details: 'Card details 3' },
  ];

  const renderCard = ({ item }) => {
    const dummyData = {
      attribute1: 'Value 1',
      attribute2: 'Value 2',
      attribute3: 'Value 3',
      // Add more dummy attributes as needed
    };

    const orderData = { ...dummyData, ...item }; // Merge dummy data with item data

    return (
      <TouchableOpacity onPress={() => navigation.navigate('ParticularOrderDetails', { orderData })}>
        <Card style={styles.card}>
          <Card.Title title={item.title} />
          <Card.Content>
            <Text style={styles.cardDetails}>{item.details}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const handleNavigation = (screen) => {
    setSelectedNavItem(screen); // Update the selected bar
    navigation.navigate(screen);
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

      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => handleNavigation('Home')} style={selectedNavItem === 'Home' ? styles.selectedNavItem : styles.navItem}>
          <Image
            source={require('./assets/home.png')}
            style={styles.navigationItemIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('Payment')} style={selectedNavItem === 'Payment' ? styles.selectedNavItem : styles.navItem}>
          <Image
            source={require('./assets/home.png')}
            style={styles.navigationItemIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('AllOrder')} style={selectedNavItem === 'AllOrder' ? styles.selectedNavItem : styles.navItem}>
          <Image
            source={require('./assets/home.png')} // Replace with your order icon image
            style={styles.navigationItemIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
    elevation: 4,
  },
  cardDetails: {
    fontSize: 16,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    opacity: 0.3,
  },
  selectedNavItem: {
    flex: 1,
    alignItems: 'center',
    opacity: 1,
    borderBottomWidth: 1,
    borderColor: 'black', // Customize the color for the selected bar
  },
  navigationItemIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
});

export default DriverMainPage;
