import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'

const Newwordpraveen = () => {
  return (
    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
  >
    <View>
      <Text>Newwordpraveen and pop handling needed here on lists</Text>
    </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
})
export default Newwordpraveen