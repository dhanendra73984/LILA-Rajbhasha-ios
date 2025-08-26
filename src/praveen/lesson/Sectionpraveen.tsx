import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Sectionpraveen = (props:any) => {
  return (
    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
  >
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 20 }}>index of praveen lesson are here </Text>
    <Button
        title="go to  Objectivepraveen"
        onPress={() => {
            props.navigation.navigate('Objectivepraveen');
        }
        }
    />
    <Button
        title="go to  Structurepraveen"
        onPress={() => {
            props.navigation.navigate('Structurepraveen');
        }
        }
    />
     <Button
        title="go to  Narrativepraveen"
        onPress={() => {
            props.navigation.navigate('Narrativepraveen');
        }
        }
    />
     <Button
        title="go to  Newwordpraveen"
        onPress={() => {
            props.navigation.navigate('Newwordpraveen');
        }
        }
    />
       <Button
        title="go to  Wordfamilypraveen"
        onPress={() => {
            props.navigation.navigate('Wordfamilypraveen');
        }
        }
    />
    <Button
        title="go to  Grammerpraveen"
        onPress={() => {
            props.navigation.navigate('Grammerpraveen');
        }
        }
    />
   <Button
        title="go to  Practicepraveen"
        onPress={() => {
            props.navigation.navigate('Practicepraveen');
        }
        }
    />
    <Button
        title="go to  Excercisepraveen"
        onPress={() => {
            props.navigation.navigate('Excercisepraveen');
        }
        }
    />
     <Button
        title="go to  Testproceedpraveen"
        onPress={() => {
            props.navigation.navigate('Testproceedpraveen');
        }
        }
    />
</View>
</ImageBackground>
  )
}

export default Sectionpraveen

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      }
})