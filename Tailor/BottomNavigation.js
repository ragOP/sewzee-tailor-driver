import { Image, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react'
import TailorHomepage from "./TailorHomepage";
import PaperText from '../Ui/PaperText'
import TailorProfileScreen from "./TailorProfileScreen";
const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
    }}
    initialRouteName="TailorHomePage"
  >
    <Tab.Screen
      name="TailorHomePage"
      component={TailorHomepage}
      options={{
        tabBarIcon: ({ focused, color, size }) =>
          focused ? (
            <View style={styles.tabItemContainerActive}>
              <Image
                style={styles.icon}
                source={require('../Tailor/assets/home.png')}
              />
              <PaperText
                text="Home"
                variant="titleSmall"
                fontStyling={styles.tabText}
              />
            </View>
          ) : (
            <View style={styles.tabItemContainer}>
              <Image
                style={styles.icon}
                source={require('../Tailor/assets/home_outlined.png')}
              />
              <PaperText
                text="Home"
                variant="titleSmall"
                fontStyling={styles.tabText2}
              />
            </View>
          ),
      }}
    />
    <Tab.Screen
      name="TailorProfileScreen"
      component={TailorProfileScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) =>
          focused ? (
            <View style={styles.tabItemContainerActive}>
              <Image
                style={styles.icon}
                source={require("../Tailor/assets/User.png")}
              />
              <PaperText
                text="Profile"
                variant="titleSmall"
                fontStyling={styles.tabText}
              />
            </View>
          ) : (
            <View style={styles.tabItemContainer}>
              <Image
                style={styles.icon}
                source={require("../Tailor/assets/profile_outline.png")}
              />
              <PaperText
                text="Profile"
                variant="titleSmall"
                fontStyling={styles.tabText2}
              />
            </View>
          ),
      }}
    />
  </Tab.Navigator>
  )
}

export default BottomNavigation

const styles = StyleSheet.create({
    icon: {
        width: 22,
        height: 22,
      },
      tabItemContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 2,
        borderColor: "white"
      },
      tabItemContainerActive: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 2,
        borderColor:"#7D5FFE"
      },
      tabText: {
        color: '#7D5FFE',
        marginTop: 2
      },
      tabText2: {
        color: '#C4B7FE',
        marginTop: 2
      }
})