import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';

const TailorProfileScreen = ({navigation}) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleValue = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    8;
    setIsPressed(true);
    Animated.spring(scaleValue, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const buttonScale = {
    transform: [{scale: scaleValue}],
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => navigation.navigate('Complete')}>
        <Text style={styles.buttonText}>My Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => navigation.navigate('LeaderBoard')}>
        <Text style={styles.buttonText}>Leader Board</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => navigation.navigate('Stich')}>
        <Text style={styles.buttonText}>Stich Prefences</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => navigation.navigate('Support')}>
        <Text style={styles.buttonText}>Support & FAQ’s</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => navigation.navigate('About')}>
        <Text style={styles.buttonText}>About </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate('Welcome')}
        style={[styles.buttons, isPressed && buttonScale]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TailorProfileScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  button: {
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 12,
    width: '95%',
    height: 80,
    justifyContent: 'center',
    borderRightWidth: 10,
    borderRightColor: '#7D5FFE',
  },
  button2: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 12,
    width: '48%',
    height: 50,
    alignItems: 'center',
    borderWidth: 0.5,
    marginRight: 180,
  },

  buttonText: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  image: {
    padding: 10,
    width: 20,
    height: 25,
    marginLeft: 10,
  },
  buttons: {
    padding: 10,
    width: '48%',
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    backgroundColor: 'white',
    borderColor: '#7D5FFE',
    marginRight: 180,
  },

  buttonText: {
    color: 'Black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
