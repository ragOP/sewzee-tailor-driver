import React ,{useState}from 'react';
import {TouchableOpacity ,StyleSheet,View,Text,ScrollView,Image} from 'react-native';
import PaperAppBar from '../Ui/PaperAppBar'
import MaterialIconsItem from '../Ui/MaterialIconsItem'
import { Appbar } from "react-native-paper";
const Pickup = ({navigation}) => {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { id: 0, title: 'Ongoing', buttons: [
          { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },
          { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') },
          { label: 'Order No.- 71 | Kurta & Salwar', image: require('../Tailor/assets/Order.png') }
        ],},
    ]
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
    <Appbar.Content titleStyle={styles.header} title="Pickup Selector" />
  </PaperAppBar>
  <View style={styles.tabContainer}>
  {tabs.map((tab, index) => (
    <View
      key={tab.id}
      style={[styles.tabButton, activeTab === index && styles.activeTab]}
    >
      <Text style={styles.tabButtonText}>{tab.title}</Text>
    </View>
  ))}
</View>
<ScrollView>
<View style={styles.buttonContainer}>
  {tabs[activeTab].buttons.map((button, index) => (
    <TouchableOpacity key={index} style={styles.button}>
      <Image source={button.image} style={styles.image} />
      <Text style={styles.buttonText}>{button.label}</Text>
      <View style={styles.view}></View>
      <View style={styles.view2}></View>
      <Text style={styles.name}>Name-King Rag</Text>
      <Text style={styles.address}>Address- Road No. 5 Delhi</Text>
    </TouchableOpacity>
  ))}
</View>
<View style={styles.containerButton}>
      
      <TouchableOpacity style={styles.button2}>
        <Text style={{color:'white'}}>Confirm</Text>
      </TouchableOpacity>
    </View>

</ScrollView>
</>
  )
}

export default Pickup

const styles = StyleSheet.create({
    backButton: {
        padding: 5,
      },
      header: {
      fontFamily: "Poppins-SemiBold",
        fontSize: 18,
      },
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
      tabContainer: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        
      },
      tabButton: {
        width:'36%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
         elevation: 20 ,
         borderWidth:0.2,
         borderColor: '#7d5ffe',
         marginLeft:8
        
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
        paddingLeft:15,
        

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
        
      },
      containerButton:{
        borderColor:'black',
        borderWidth:0.4,
        width:'96%',
        height:70,
        marginTop:40,
        borderRadius:12,
        marginLeft:8,
        shadowOffset: { width: 0, height: 10 },
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowRadius: 30,
        backgroundColor: 'white',
        elevation: 8,
        zIndex: 99,
        

      },
      button2: {
        width:'36%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
         elevation: 20 ,
         backgroundColor: '#7d5ffe',
         marginLeft:230,
         marginTop:10,
         

      }
     
})