import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

const CustomHeader = () => {
  return (
    

        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={home}
            options={{
              header: () => (
                <View style={styles.header}>
                  <View style={styles.headerIcon}>
                    <MaterialIcons
                      name="exit-to-app"
                      size={24}
                      color="white"
                      onPress={() => {
                        // Handle exit logic here
                      }}
                    />
                  </View>
                  <Text style={styles.headerTitle}>Home Screen</Text>
                  <View style={styles.headerIcon}>
                    <MaterialIcons
                      name="home"
                      size={24}
                      color="white"
                      onPress={() => {
                        // Handle home navigation logic here
                      }}
                    />
                  </View>
                </View>
              ),
            }}
          />
         </Stack.Navigator>
          </NavigationContainer>

    
  )
}

export default CustomHeader







const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      height: 60,
      backgroundColor: '#0D6EFD',
    },
    headerTitle: {
      color: 'white',
      fontSize: 20,
    },
    headerIcon: {
      width: 30,
      alignItems: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    
       
  })