import { Button, Image, ImageBackground, LogBox, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreAllLogs();

const Vocablary = (props:any) => {

    const navigation = useNavigation();
    const {ApiResponse,Package,Medium} = props.route.params;
    const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
    const titleofvocablary = langWiseWords[158];



    const handleBackPress = () => {
        navigation.goBack();
      };
      // Function to handle the home button press 
      const handleHomePress = () => {
        // Navigate to the home screen or the desired screen
       props.navigation.navigate('Home',{Package,Medium,ApiResponse});
      };
      const handlePressGenralvocabulary = () => {
        props.navigation.navigate('Genralvbprabodhindex', { Package, Medium, ApiResponse });
      };
      
      const handlePressNameoffice = () => {
        props.navigation.navigate('Officerprabodh', { Package, Medium, ApiResponse });
      };
      
      const handlePressNamedesignation = () => {
        props.navigation.navigate('Designationprabodh', { Package, Medium, ApiResponse });
      };
      
      const handlePressNameministries = () => {
        props.navigation.navigate('Ministryprabodh', { Package, Medium, ApiResponse });
      };
      


  return (

    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>   
        <View style={styles.header}>
        {/* Left side - Back icon */}
        <TouchableOpacity  onPress={handleBackPress}>
          <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{titleofvocablary}</Text>

        {/*page dosnt have right side heder button Right side - Home icon */}
        <TouchableOpacity onPress={handleHomePress}>
          {/* <MaterialIcons  style={styles.headerIcon} name="home" size={32} color="white" /> */}
        </TouchableOpacity>
      </View>
      </SafeAreaView>


            <ImageBackground

            source={require('../../../assets/img/bg.png')} // Provide the path to your image
            style={styles.backgroundImage}>

             <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.item} onPress={() => handlePressGenralvocabulary()}>
                            <Image source={require('../../../assets/img/vocabulari.png')} style={styles.image} />
                            <Text style={styles.text}>{langWiseWords[14]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => handlePressNameoffice()}>
                            <Image source={require('../../../assets/img/namesofoffices.png')} style={styles.image} />
                            <Text style={styles.text}>{langWiseWords[42]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.item} onPress={() => handlePressNamedesignation()}>
                            <Image source={require('../../../assets/img/namesofdesignations.png')} style={styles.image} />
                            <Text style={styles.text}>{langWiseWords[17]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => handlePressNameministries()}>
                            <Image source={require('../../../assets/img/namesofministries.png')} style={styles.image} />
                            <Text style={styles.text}>{langWiseWords[43]}</Text>
                        </TouchableOpacity>
                    </View>
             </View>









                  {/* it is just for navigation purpose  */}
            {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Vocabllery section of prabodh here.. </Text>
            <Button 
                title="go to sections of designation "
                onPress={() => {
                    props.navigation.navigate('Designationprabodh');
                }
                }
            />
            <View style={{ width: 10 }} ></View>

            <Button 
                title="go to sections of Ministryprabodh "
                onPress={() => {
                    props.navigation.navigate('Ministryprabodh');
                }
                }
            />
            <Button 
                title="go to sections of Officerprabodh "
                onPress={() => {
                    props.navigation.navigate('Officerprabodh');
                }
                }
            />
            <Button 
                title="go to sections of Genralvbprabodhindex "
                onPress={() => {
                    props.navigation.navigate('Genralvbprabodhindex');
                }
                }
            />
        
             </View> */}
            </ImageBackground>

    </View>
  )
}

export default Vocablary

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },
            header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        backgroundColor: '#0D6EFD',
        paddingVertical: 12,  }
      ,
       headerIcon: {
         width: 30,
         alignItems: 'center',
       },
       headerTitle: {
         color: 'white',
         fontSize: 20, // Adjust the font size as needed
       },
       container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
      },
      item: {
        flex: 1,
        alignItems: 'center',
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'cover',
      },
      text: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        color:'black'
      },
})