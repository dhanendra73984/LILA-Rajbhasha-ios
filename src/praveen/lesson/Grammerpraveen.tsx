import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Grammerpraveen = () => {
  return (
    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
  >
    <View>
      <Text>Grammerpraveen</Text>
    </View>
    </ImageBackground>
  )
}

export default Grammerpraveen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }

})