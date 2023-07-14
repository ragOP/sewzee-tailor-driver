import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image ,ScrollView} from 'react-native';
import ImageView from 'react-native-image-viewing';
import { useNavigation } from '@react-navigation/native'
import PaperAppBar from '../Ui/PaperAppBar'
import MaterialIconsItem from '../Ui/MaterialIconsItem'
import { Appbar } from "react-native-paper";


const PartricularRideDetails = ({ route }) => {
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
  const handleMeasurement = () => {
    navigation.navigate('Measurement');
  };

  const handleReject = () => {
  
    navigation.navigate('TailorHomePage');
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
    <Appbar.Content titleStyle={styles.header} title="Ride Details" />
  </PaperAppBar>
    <View style={styles.container}>
    <Image source={require('../Tailor/assets/Order.png')} style={styles.image}/>
      <Text style={styles.orderText}>Order No.- 71 Kurta & Salwar</Text>
      {/* Render thumbnails */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
      <View style={styles.thumbnailContainer}>
        {images.slice(0, 6).map((image, index) => renderThumbnail(image, index))}
      </View>
</ScrollView>
      {/* Image Viewer */}
      <ImageView
        images={images.map((image) => ({ uri: image.url }))}
        imageIndex={currentImageIndex}
        visible={isImageViewerVisible}
        onRequestClose={() => setIsImageViewerVisible(false)}
      />
 <View >
      <View style={styles.shadowContainer}>
      
      </View>
    </View>
      
      {/* Accept and Reject buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleMeasurement}>
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
    paddingTop:15,
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
    elevation: 5
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight:12,
  
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
  shadowContainer: {
    
    
  },
  backButton: {
    paddingLeft: 5,
  },
  header: {
  fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  orderText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize:20,
    paddingLeft:15,
    marginLeft:40,
    marginTop:-32,
    
  },
  image: {
    width: 40,
    height: 40,
    
  },
});

export default PartricularRideDetails;
