import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Testsaction = () => {
  return (
    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
  >
    <View>
      <Text>Testsaction test happend here...</Text>
    </View>
    </ImageBackground>
  )
}

export default Testsaction

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
})