import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Excersicetemplatepraveen = () => {
  return (
    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
  >
    <View>
      <Text>Excersice handle here </Text>
    </View>
    </ImageBackground>
  )
}

export default Excersicetemplatepraveen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
})