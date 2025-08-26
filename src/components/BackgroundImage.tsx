// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const BackgroundImage = () => {
  return (
    <ImageBackground
    source={require('../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
  >
    
  </ImageBackground>
  );
};

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
});

export default BackgroundImage;
