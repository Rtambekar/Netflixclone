// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to HomeScreen after 3 seconds
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000); // Adjust the delay as per your preference
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/splash-image.png')} style={styles.image} /> */}
      <Text style={styles.text}>Welcome to Netflixclone</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
