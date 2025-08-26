import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Customeheaderback = ({navigation}:any) => {
  return (
    <View>
      <MaterialIcons
                      name="chevron-left"
                      size={32}
                      color="white"
                      onPress={() => {
                        // Handle home navigation logic here
                        // Handle exit logic here
                        navigation.goBack();
                      }}
                    />
    </View>
  )
}

export default Customeheaderback

const styles = StyleSheet.create({})