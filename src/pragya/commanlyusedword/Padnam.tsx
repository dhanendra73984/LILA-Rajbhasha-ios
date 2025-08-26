import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Padnam = () => {
  return (
    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
  >
    <View>
      <Text>Padnam :input is taken by pop box and after handle padnam here with translation</Text>
    </View>
    </ImageBackground>
  )
}

export default Padnam

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
})