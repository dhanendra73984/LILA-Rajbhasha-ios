import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
//this is showing report card 
const Practicepraveen = (props:any) => {
  const {  ApiResponse,
    Package,
    Medium,
    selectedLessonIndex,
    title,
    instructionData,
    exercisesTablesData,orignalessonindex,correctAnswersCountoffillintheblacks,correctAnswersCountoffillintheblackssecand,correctCounteroftruflase} = props.route.params;
  return (
    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
  >
    <View>
      <Text>Practicepraveen{correctAnswersCountoffillintheblackssecand}{correctAnswersCountoffillintheblacks}{correctCounteroftruflase}</Text>
    </View>
    </ImageBackground>
  )
}

export default Practicepraveen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
})