import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Objectivepraveen = () => {
  return (
    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
  >
    <View>
      <Text>Objectivepraveen</Text>
    </View>
    </ImageBackground>
  )
}

export default Objectivepraveen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
})