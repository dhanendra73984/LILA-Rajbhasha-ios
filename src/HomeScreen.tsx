//copy
import { ActivityIndicator, Alert, Button, I18nManager, Image, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundImage from './components/BackgroundImage';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import  Modal  from 'react-native-modal';
import axios from 'axios';
import { LogBox } from 'react-native';

import { useNavigation } from '@react-navigation/native';

LogBox.ignoreAllLogs(); 

// this is main home screen which loaded first
const HomeScreen = (props:any) => {

     const [Package, setPackage] = useState('');
     const [Medium, setMedium] = useState('');
     const [isExitModalVisible, setExitModalVisible] = useState(false);//fro exit popup modle
     const [exitConfirmed, setExitConfirmed] = useState(false);

     const [errorModalVisible, setErrorModalVisible] = useState(false);//for validation msg popup modle...... 
     const [errorMessage, setErrorMessage] = useState('');
     

     const [isLoading, setIsLoading] = useState(false);



     const [packageOpen, setPackageOpen] = useState(false);
     const [mediumOpen, setMediumOpen] = useState(false);
   
     const [packageItems, setPackageItems] = useState([
       { label: 'Prabodh', value: 'Prabodh' },
       { label: 'Praveen', value: 'Praveen' },
       { label: 'Pragya', value: 'Pragya' },
     ]);
   
     const [mediumItems, setMediumItems] = useState([
       { label: 'English', value: 'English' },
       { label: 'Assamese', value: 'Assamese' },
       { label: 'Bangla', value: 'Bangla' },
       { label: 'Bodo', value: 'Bodo' },
       { label: 'Gujarati', value: 'Gujarati' },
       { label: 'Kannada', value: 'Kannada' },
       { label: 'Kashmiri', value: 'Kashmiri' },
       { label: 'Malayalam', value: 'Malayalam' },
       { label: 'Manipuri', value: 'Manipuri' },
       { label: 'Marathi', value: 'Marathi' },
       { label: 'Nepalese', value: 'Nepalese' },
       { label: 'Oriya', value: 'Oriya' },
       { label: 'Punjabi', value: 'Punjabi' },
       { label: 'Tamil', value: 'Tamil' },
       { label: 'Telugu', value: 'Telugu' },
     ]);



    //  popup handling for exit confermation
    const toggleExitModal = () => {
      setExitModalVisible(!isExitModalVisible);
    };
    
  //  popup handling for validation
    const toggleErrorModal = () => {
      setErrorModalVisible(!errorModalVisible);
    };

    const exitApp = () => {
      toggleExitModal();
    };
    
 




     const goToDetails = () => {

      // props.navigation.navigate('hello');        
      // validation code start here
      if (!Package && !Medium) {
        setErrorMessage('Please Select Package And Medium Of Instructions.');
        toggleErrorModal();
        return;
      }
    

      if (!Package) {
        setErrorMessage('Please Select Package.');
        toggleErrorModal();
        return;
      }
  
      if (!Medium) {
        setErrorMessage('Please Select Medium Of Instructions.');
        toggleErrorModal();
        return;
      }
        
        

      
        

        setIsLoading(true);

        const apiUrl = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getCaption/';

        const requestData = {
          LangSelected: Medium, // Assuming 'Medium' is the language selection
          // Add other data as needed
        };
    
        axios.post(apiUrl, requestData,{timeout:500000})
          .then((response) => {
            // Handle the response here
            //console.log('API Response:', response.data);
            // setErrorMessage("Inside response "+response)
            if (Package === 'Prabodh' && Medium !== 'Medium') {
              // Navigate to the 'Home' component and pass data as params
              props.navigation.navigate('Home', {
                Package: Package,
                Medium: Medium,
                ApiResponse: response.data, // Pass the response data as a parameter
              });
            }
            else if (Package === 'Praveen' && Medium !== 'Medium') {
              // Navigate to the 'Homepraveen' component
              props.navigation.navigate('Homepraveen', {
                Package: Package,
                Medium: Medium,
                ApiResponse: response.data,
              });
            }
            else if (Package === 'Pragya'  && Medium !== 'Medium') {
              // Navigate to the 'Homepragya' component
              props.navigation.navigate('Homepragya', {
                Package: Package,
                Medium: Medium,
                ApiResponse: response.data,
              });
            }
            setIsLoading(false);

          })
          .catch((error) => {
            // Handle errors here
            console.error('API Error:', error);
            setIsLoading(false);
            
           

            
          


          });




          
          
    

      



       


      };
              
      useEffect(() => {
        // Assuming you have a condition to determine if the package is Kashmiri
        const isKashmiriPackage = Package === 'Kashmiri';;
    
        // Set text direction to RTL if the package is Kashmiri
        if (isKashmiriPackage) {
          I18nManager.forceRTL(true);
        } else {
          // Reset text direction to default if the package is not Kashmiri
          I18nManager.forceRTL(false);
        }
      }, []);
     
     
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
            

         <View>
          {/* <Picker
            selectedValue={Package}
            onValueChange={(itemValue) => setPackage(itemValue)}
          >
            <Picker.Item label="Package" value="" />
            <Picker.Item label="Prabodh" value="Prabodh" />
            <Picker.Item label="Praveen" value="Praveen" />
            <Picker.Item label="Pragya" value="Pragya" />
          </Picker> */}
            <DropDownPicker
            open={packageOpen}
            value={Package}
            items={packageItems}
            setOpen={setPackageOpen}
            setValue={setPackage}
            setItems={setPackageItems}
            placeholder="Select Package"
            containerStyle={{ marginBottom: 20 }}
            style={{ backgroundColor: '#fafafa' }}
            zIndex={3000}
            zIndexInverse={1000}
          />

            
        </View>
        
        <View >
        <DropDownPicker
              open={mediumOpen}
              value={Medium}
              items={mediumItems}
              setOpen={setMediumOpen}
              setValue={setMedium}
              setItems={setMediumItems}
              placeholder="Select Medium of Instruction"
              containerStyle={{ marginBottom: 20 }}
              style={{ backgroundColor: '#fafafa' }}
              zIndex={2000}
              zIndexInverse={2000}
            />
          {/* <Picker
            selectedValue={Medium}
            onValueChange={(itemValue) => setMedium(itemValue)}
          >
            <Picker.Item label="Medium Of Instructions"  value="" />
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


          </Picker> */}
        </View>

          {/* <View style={styles.buttonContainer}>
            <Button title="Enter" onPress={goToDetails} color="#0D6EFD"/>

            <Button title="Exit" onPress={exitApp} color="#0D6EFD" />
          </View> */}

             <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={goToDetails} style={styles.button}>
                  <Text style={styles.buttonText}>Enter</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={exitApp} style={styles.button}>
                  <Text style={styles.buttonText}>Exit</Text>
                </TouchableOpacity> */}
              </View>

        {/* showing popuicon here for exiting lila */}
   


  
        

        </View>

        






            
            {/* <Text style={{ fontSize: 20 }}>Main Home Screen after navigation of main home scrren next screen contains exit and categorychange button</Text> */}
              {/* for showing validation message............ */}
              <Modal isVisible={errorModalVisible} onBackdropPress={toggleErrorModal}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
                  <Text style={{ color:'black',fontSize:14 ,marginBottom:10}}>{errorMessage}</Text>
                  <TouchableHighlight
                    style={{ backgroundColor: '#0D6EFD', padding: 10, borderRadius: 5 }}
                    onPress={toggleErrorModal}
                  >
                    <Text style={{ color: 'white',marginLeft:130,fontSize:14 }}>Close</Text>
                  </TouchableHighlight>
                </View>
              </Modal>

              {isLoading && (
                <View style={styles.spinnerContainer}>
                  <ActivityIndicator size="large" color="#0D6EFD" />
                  <View style={styles.backdrop} />
                </View>
              )}



           
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
        padding:10
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
        width:'100%', // Set the desired width for the images
        height: 100, // Set the desired height for the images
        borderRadius:10,
      },
     
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },

      pickerAndButtonContainer: {
        alignItems: 'center',
        padding:5
      },
      pickerBackground: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
        width: '95%',
        height: 50, // ← Add this
        justifyContent: 'center', // ← Center Picker vertically
        elevation: 4,
        overflow: 'hidden', // ← Clip content (optional, helps for border)
      },


      modalContainer: {
       
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      },
      spinnerContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
      },
      backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the backdrop color and opacity as needed
      },

      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
      },
      button: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D6EFD',
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize:16
      },
})
export default HomeScreen