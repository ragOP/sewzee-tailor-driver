import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImageView from 'react-native-image-viewing';
import { Card, IconButton, TouchableRipple } from 'react-native-paper';


import { useNavigation } from '@react-navigation/native';

const PartricularOrderDetails = ({ route,navigate }) => {
  const { orderData } = route.params;
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigation = useNavigation();

  const images = [
    { url: 'https://cdn.dribbble.com/userupload/6098918/file/original-cc6255a903f6706ab69a59e85c61cb01.jpg?compress=1&resize=400x300&vertical=center' },
    { url: 'https://cdn.dribbble.com/users/422288/avatars/normal/696cc6b760669895cfc6a840627440f8.png?1525235724' },
    { url: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT4i2ky1jgpSXyZM9UzXZA_mX_AmtjaR8Fklt9-BoD4tf5gHjnsYwv7wZPxDkRrlFZvdal7xPgyJe-ez-XqwniX9a0qttgbniCEdDqAaYs_ycBrN0c1zZkleP9jG9zfmoMOBfc&usqp=CAc' },
    { url: 'https://cdn.dribbble.com/users/422288/avatars/normal/696cc6b760669895cfc6a840627440f8.png?1525235724' },
    { url: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT4i2ky1jgpSXyZM9UzXZA_mX_AmtjaR8Fklt9-BoD4tf5gHjnsYwv7wZPxDkRrlFZvdal7xPgyJe-ez-XqwniX9a0qttgbniCEdDqAaYs_ycBrN0c1zZkleP9jG9zfmoMOBfc&usqp=CAc' },
    { url: 'https://cdn.dribbble.com/users/422288/avatars/normal/696cc6b760669895cfc6a840627440f8.png?1525235724' },

    // Add more image URLs as needed

  ];

  const renderThumbnail = (image, index) => (
    <TouchableOpacity key={index} onPress={() => handleThumbnailPress(index)}>
      <Image source={{ uri: image.url }} style={styles.thumbnailImage} />
    </TouchableOpacity>
  );

  const handleThumbnailPress = (index) => {
    setCurrentImageIndex(index);
    setIsImageViewerVisible(true);
  };
  const handleAccept = () => {
    // Perform necessary actions for accepting the order, such as navigating to Google Maps and the address
    // Example navigation code:
    navigation.navigate('GoogleMaps', { address: orderData.address });
  };

  const handleReject = () => {
    // Perform necessary actions for rejecting the order, such as navigating back to the homepage
    // Example navigation code:
    navigation.navigate('TailorHomePage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      {/* Render thumbnails */}
      <View style={styles.thumbnailContainer}>
        {images.slice(0, 4).map((image, index) => renderThumbnail(image, index))}
      </View>

      {/* Image Viewer */}
      <ImageView
        images={images.map((image) => ({ uri: image.url }))}
        imageIndex={currentImageIndex}
        visible={isImageViewerVisible}
        onRequestClose={() => setIsImageViewerVisible(false)}
      />

      {/* Render order details */}
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeLabel}>Attribute 1:</Text>
        <Text style={styles.attributeValue}>{orderData.attribute1}</Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeLabel}>Attribute 2:</Text>
        <Text style={styles.attributeValue}>{orderData.attribute2}</Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeLabel}>Attribute 2:</Text>
        <Text style={styles.attributeValue}>{orderData.attribute2}</Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeLabel}>Attribute 2:</Text>
        <Text style={styles.attributeValue}>{orderData.attribute2}</Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeLabel}>Attribute 99:</Text>
        <Text style={styles.attributeValue}>{orderData.attribute2}</Text>
      </View>
      {/* Accept and Reject buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  attributeContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  attributeLabel: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  attributeValue: {
    flex: 1,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
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
  },
  rejectButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PartricularOrderDetails;
