import {StyleSheet, TouchableOpacity, ScrollView, View,Text} from 'react-native';
import React from 'react';
import PaperAppBar from '../Ui/PaperAppBar';
import MaterialIconsItem from '../Ui/MaterialIconsItem';
import PaperText from '../Ui/PaperText';
import {Appbar} from 'react-native-paper';
const TailorNotification = ({navigation}) => {
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
        <Appbar.Content titleStyle={styles.header} title="Notification" />
      </PaperAppBar>
      <ScrollView contentContainerStyle={styles.container}>  
      {[...new Array(3)].map(item => {
      return(
      
        <TouchableOpacity style={styles.view}>
       <View styling={styles.headingContainer}>
        <PaperText
          variant="titleMedium"
          text="Tailor"
          fontStyling={styles.heading}
        />
      </View>
      <View styling={styles.subHeadingContainer}>
        <PaperText
          variant="titleSmall"
          text="Your Order with Order Id-0012312 is Out for Delivery and will be Delivered Today"
          fontStyling={styles.subHeading}
        />
      </View>
      <View styling={styles.descContainer}>
        <PaperText
          variant="titleSmall"
          text="Your Order with Order Id-0012312 is Out for Delivery and will be Delivered Today"
          fontStyling={styles.subHeading}
        />
      </View>
        </TouchableOpacity>
      
            
      )
      })} 
      </ScrollView>   
    </>
    
  );
};

export default TailorNotification;

const styles = StyleSheet.create({
 
  header: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  backButton: {
    padding: 12,
  },
  
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 5

  },
  
  view:{
  
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
        height:120,
        paddingBottom:25,
        marginLeft:8,
        borderColor: "#7D5FFE",
        borderLeftWidth: 8,
        borderWidth:0.2
    },
    headingContainer: {
        paddingHorizontal: 12,
        marginTop: 10,
      },
      heading: {
        fontSize: 19,
        fontFamily: 'Poppins-SemiBold',
        color: '#000',
        marginRight:280
      },
      subHeadingContainer: {
        paddingHorizontal: 12,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderColor: 'grey',
      },
      subHeading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#333',
      },
      descContainer: {
        paddingHorizontal: 12,
        paddingTop: 15,
        
      },
});
