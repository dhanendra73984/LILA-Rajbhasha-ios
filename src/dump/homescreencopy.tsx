//copy
import { Alert, Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { Picker } from '@react-native-picker/picker';

import Modal from 'react-native-modal';

const HomeScreen = (props:any) => {

     const [Package, setPackage] = useState('Select');
     const [Medium, setMedium] = useState('Select');
     const [isExitModalVisible, setExitModalVisible] = useState(false);
     const [exitConfirmed, setExitConfirmed] = useState(false);

    //  popup handling for exit confermation
    const toggleExitModal = () => {
      setExitModalVisible(!isExitModalVisible);
    };
    
    const exitApp = () => {
      toggleExitModal();
    };
    
    // const handleExitConfirmation = (confirmed: boolean) => {
    //   if (confirmed) {
    //     RNExitApp.exitApp(); // Exit the app
    //   } else {
    //     toggleExitModal(); // Dismiss the modal
    //   }
    // };




     const goToDetails = () => {
      //  sending navigation according to packages
        // props.navigation.navigate('Home', {
        //   Package: Package,
        //   Medium: Medium,
        // //   Package: picker1Value,
        // //   Medium: picker2Value,
        // });
        
        if (Package === 'Prabodh') {
          // Navigate to the 'Home' component
          props.navigation.navigate('Home', {
            Package: Package,
            Medium: Medium,
          });
        } else if (Package === 'Praveen') {
          // Navigate to the 'Homepraveen' component
          props.navigation.navigate('Homepraveen', {
            Package: Package,
            Medium: Medium,
          });
        } else if (Package === 'Pragya') {
          // Navigate to the 'Homepragya' component
          props.navigation.navigate('Homepragya', {
            Package: Package,
            Medium: Medium,
          });
        }
        // else if (Package === 'Package') {
        //   // Navigate to the 'Home prabodh' component
        //   props.navigation.navigate('Home', {
        //     Package: Package,
        //     Medium: Medium,
        //   });
        // }
        else if (Package === 'Package') {
          // Show an alert for "Package"
           Alert.alert('Please Select Package and Medium Of Instructions.', ' ', [
            { text: 'OK', style: 'cancel' },
               ]);
       
        }


      };
     
     
  return (
    <ImageBackground
    source={require('../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
           {/* setting up home scrren images and dropdown */}
             
        

        {/* Three Images in a Column */}
        <View style={styles.rowContainer}>
          <Image
            source={require('../assets/img/logotext.png')}
            style={styles.image1}
          />
          <Image
            source={require('../assets/img/lionimg.png')}
            style={styles.image}
          />
          <Image
            source={require('../assets/img/cdac.png')}
            style={styles.image1}
          />
        </View>
             {/*  Images in a Column of logo  */}
        <View style={styles.columnContainer}>
          <Image
            source={require('../assets/img/logologin.png')}
            style={styles.image3}
          /> 
                  
        </View>

        <View style={{ alignItems: 'flex-start',marginTop:30,marginBottom:10,marginLeft:10}}>
            <Text style={{fontWeight: 'bold',color:'black',fontSize:18}}>Select From Below:</Text>
        </View>
            
        

         {/* Two Pickers with Sample Data */}
         <View style={styles.pickerAndButtonContainer}>
            

         <View style={styles.pickerBackground}>
          <Picker
            selectedValue={Package}
            onValueChange={(itemValue) => setPackage(itemValue)}
          >
            <Picker.Item label="Package" value="Package" />
            <Picker.Item label="Prabodh" value="Prabodh" />
            <Picker.Item label="Praveen" value="Praveen" />
            <Picker.Item label="Pragya" value="Pragya" />
          </Picker>
        </View>
        
        <View style={styles.pickerBackground}>
          <Picker
            selectedValue={Medium}
            onValueChange={(itemValue) => setMedium(itemValue)}
          >
            <Picker.Item label="Medium Of Instructions"  value="Medium" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Assamese" value="Assamese" />
            <Picker.Item label="Bangla" value="Bangla" />
            <Picker.Item label="Bodo" value="Bodo" />
            <Picker.Item label="Gujarati" value="Gujarati" />
            <Picker.Item label="Kannada" value="Kannada" />
            <Picker.Item label="Kashmiri" value="Kashmiri" />
            <Picker.Item label="Malayalam" value="Malayalam" />
            <Picker.Item label="Manipuri" value="Manipuri" />
            <Picker.Item label="Marathi" value="Marathi" />
            <Picker.Item label="Nepalese" value="Nepalese" />
            <Picker.Item label="Oriya" value="Oriya" />
            <Picker.Item label="Punjabi" value="Punjabi" />
            <Picker.Item label="Tamil" value="Tamil" />
            <Picker.Item label="Telugu" value="Telugu" />


          </Picker>
        </View>

          <View style={styles.buttonContainer}>
            <Button title="                  Enter                  " onPress={goToDetails} color="#0D6EFD"/>

            <Button title="                  Exit                    " onPress={exitApp} color="#0D6EFD" />
          </View>

        {/* showing popuicon here for exiting lila */}

        {/* <Modal isVisible={isExitModalVisible}>
              <View style={styles.modalContainer}>
              <Text  style={{color:'black',fontSize:14}}>Do you want to close LILA App?</Text>
              <View style={styles.buttonContainer1}>
              <Button title="     Yes     " color="#0D6EFD" onPress={() => handleExitConfirmation(true)} />
             <Button title="     No     "  color="#0D6EFD" onPress={() => handleExitConfirmation(false)} />
             </View>
      </View>
    </Modal> */}

        </View>

        






            
            {/* <Text style={{ fontSize: 20 }}>Main Home Screen after navigation of main home scrren next screen contains exit and categorychange button</Text> */}
            <Button
                title="home screen of prabodh"
                onPress={() => {
                    props.navigation.navigate('Home');
                }
                }
            />
            <Button
                title="home screen of praveen"
                onPress={() => {
                    props.navigation.navigate('Homepraveen');
                }
                }
            />
            <Button
                title="home Screen of pragya"
                onPress={() => {
                    props.navigation.navigate('Homepragya');
                }
                }
            />
            <Button
                title=" go to Homechnagescreen"
                onPress={() => {
                    props.navigation.navigate('Homechnagescreen');
                }
                }
            />
     </View>
     </ImageBackground>
     
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
      },
      rowContainer: {
        flexDirection: 'row', // Display images in a row
        justifyContent: 'space-between', // Distribute space evenly between row images
        marginBottom: 20, // Add space between rows and columns
      },
      columnContainer: {
        flexDirection: 'column', // Display images in a column
        alignItems: 'center', // Center images in the column
      },
      image: {
        width: 110, // Set the desired width for the images
        height: 110, // Set the desired height for the images
        marginHorizontal: 10,
        marginTop:10 ,// Adjust the horizontal spacing between images
        borderRadius:10
      },
      image1: {
        width: 80, // Set the desired width for the images
        height: 80, // Set the desired height for the images
        marginHorizontal: 10,
        marginTop:20 ,// Adjust the horizontal spacing between images
        borderRadius:10
      },
      image3: {
         width:380, // Set the desired width for the images
        height: 110, // Set the desired height for the images
        borderRadius:4,
       
      },
     
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },

      pickerAndButtonContainer: {
        alignItems: 'center',
        padding:10
      },
      pickerBackground: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
        width: '95%',
        elevation:4
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding:10,
        elevation:4
      },
      buttonContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        padding:10,
        elevation:4,
        
      },
      modalContainer: {
       
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      }
})
export default HomeScreen