import { Button, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { LogBox } from 'react-native';

import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreAllLogs(); 


interface ServerData {
    LangWiseWords: string | null;
    // Add other properties if your server response contains them
  }
  type RootStackParamList = {
    Homechnagescreen: undefined; // No parameters
  };
  
  type HomechangeStackNavigationProp = StackNavigationProp<RootStackParamList, 'Homechnagescreen'>;

const Homepragya = (props:any) => {
    const Package = props.route.params.Package;
    const Medium = props.route.params.Medium;
    const { ApiResponse } =  props.route.params;

    const [langWiseWordsToRender, setLangWiseWordsToRender] = useState<string[]>([]);

    useEffect(() => {
      if (ApiResponse && ApiResponse.length > 0) {
        const indicesToPrint = [57, 261, 24, 259];
  
        const wordsToRender = indicesToPrint
          .filter(index => index >= 0 && index < ApiResponse.length)
          .map(index => ApiResponse[index]?.LangWiseWords);
  
        setLangWiseWordsToRender(wordsToRender);
  
      }
    }, [ApiResponse]);



  // Indices to display names from the server response


  // Static data for images
  const staticImages = [
    
     require('../../../assets/img/lessonn.png'),
      
    
    
    require('../../../assets/img/appendix.png'),
      
    
    
    require('../../../assets/img/wdictionary.png'),
      
    
  
    require('../../../assets/img/commonlyusedwords.png'),
      
    
    // Add more static data objects as needed
  ];

  //handle header onpress
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<HomechangeStackNavigationProp>();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const handleBackPress =()=>{

  //   RNExitApp.exitApp();

  // }



  const handleHomePress = () => {
    navigation.navigate('Homechnagescreen');
  };


  //  // Render item for FlatList
  //  const renderItem = ({ item, index }:any) => {
  //   // Display static image above LangWiseWords
  //   const imageSource = staticImages[index % staticImages.length];

  //   return (
  //     <TouchableOpacity onPress={() => handleItemPress(item, index)}>
  //     <View style={styles.itemContainer}>
        
  //       <Image source={imageSource} style={styles.imageforcard} />
  //       <Text key={index} style={styles.name}>{item}</Text>
      
  //     </View>
  //     </TouchableOpacity>
  //   );
  // };

  const renderItem = ({ item, index }: any) => {
    // Display static image above LangWiseWords
    const imageSource = staticImages[index % staticImages.length];
    const isFourthItem = index === 3;
  
    return (
      <TouchableOpacity onPress={() => handleItemPress(item, index)}>
        <View style={styles.itemContainer}>
          <Image source={imageSource} style={[styles.imageforcard, isFourthItem && styles.fourthItemImage]} />
          <Text key={index} style={[styles.name, isFourthItem && styles.fourthItemName]}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  

  const handleItemPress = (item: any, index: number) => {
    // Use the index to determine the corresponding component and sending data also
    switch (index) {
      case 1:
        props.navigation.navigate('Apendixpragya' ,{ ApiResponse,Package,Medium,});
        break;
      case 0:
        props.navigation.navigate('Lessonpragya' ,{ ApiResponse,Package,Medium,});
        break;
      case 2:
        props.navigation.navigate('Dictionarytitlespragya' ,{ ApiResponse,Package,Medium,});
        break;
      case 3:
        props.navigation.navigate('Commanlyusedwordpragya' ,{ ApiResponse,Package,Medium,});
        break;
      default:
        // Handle other cases if needed
    }
  };



  return (

       <View style={{flex:1}}>
          
          <View style={styles.header}>
                {/* Left side - Back icon */}
                {/* <TouchableOpacity  onPress={handleBackPress}>
                  <MaterialIcons style={styles.headerIcon} name="close" size={32} color="white" />
                </TouchableOpacity> */}



               {/* close button is showing here  */}

              {/* <MaterialIcons
                      name="close"
                      size={32}
                      color="white"
                      onPress={toggleModal}
                    /> */}

             {/* <Modal isVisible={isModalVisible} style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Do you want to close LILA App?</Text>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleBackPress} style={[styles.button, { backgroundColor: '#0D6EFD', }]}>
                        <Text style={styles.buttonText}>Yes</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={toggleModal} style={[styles.button, { backgroundColor: '#0D6EFD' }]}>
                        <Text style={styles.buttonText}>No</Text>
                      </TouchableOpacity>
                      
                    </View>
                  </View>
                </Modal> */}

                <Text style={styles.headerTitle}>प्राज्ञ</Text>

                {/* Right side - Home icon */}
                <TouchableOpacity onPress={handleHomePress}>
                  <MaterialIcons  style={styles.headerIcon} name="settings" size={32} color="white" />
                </TouchableOpacity>
          </View>



              <ImageBackground
              source={require('../../../assets/img/bg.png')} // Provide the path to your image
              style={styles.backgroundImage}
              >

                <View style={styles.container}>

                
                
                                {/* Three Images in a Column logo... */}
                                <View style={styles.rowContainer}>
                                    <Image
                                    source={require('../../../assets/img/logotext.png')}
                                    style={styles.image1}
                                    />
                                    <Image
                                    source={require('../../../assets/img/lionimg.png')}
                                    style={styles.image}
                                    />
                                    <Image
                                    source={require('../../../assets/img/cdac.png')}
                                    style={styles.image1}
                                    />
                                </View>
                                        {/*  Images in a Column of logo lila hindi prabodh praveen pragya...... */}
                                <View style={styles.columnContainer}>
                                    <Image
                                    source={require('../../../assets/img/logologin.png')}
                                    style={styles.image3}
                                    /> 
                                            
                                </View>

                                <View style={styles.cardcontainer}>
                                        {/* <FlatList
                                    numColumns={2}
                                    data={staticData}
                                    keyExtractor={(item, index) => index.toString()}
                                    
                                    //this code is for handling onclick on front screen item of prabodh
                                    renderItem={({ item ,index}) => (
                                      <TouchableOpacity onPress={() => handleItemPress(item, index)}>
                                        <View style={styles.itemContainer}>
                                          <Image source={item.imageSource} style={styles.imageforcard} />
                                          <Text style={styles.name}>{item.name}</Text>
                                        </View>
                                      </TouchableOpacity>
                                    )}
                                    columnWrapperStyle={styles.columnWrapper}
                                  /> */}
                                                <FlatList
                                        data={langWiseWordsToRender}
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        numColumns={2}
                                        columnWrapperStyle={styles.columnWrapper}
                        />
                                </View>








                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, }}>Home Screen</Text>
                <Text>Package Value: {Package}</Text>
                <Text>Medium Value: {Medium}</Text>

                
                <Button
                    title="go to Appendixpragya"
                    onPress={() => {
                        props.navigation.navigate('Apendixpragya');
                    }
                    }
                />
                <Button
                    title="go to Commanlyusedwordpragya"
                    onPress={() => {
                        props.navigation.navigate('Commanlyusedwordpragya');
                    }
                    }
                />
                <Button
                    title="go to Dictionarytitlespragya"
                    onPress={() => {
                        props.navigation.navigate('Dictionarytitlespragya');
                    }
                    }
                />
                <Button
                    title="go to Lessonpragya"
                    onPress={() => {
                        props.navigation.navigate('Lessonpragya');
                    }
                    }
                />
                </View>

                </View>

                  </ImageBackground>
      </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
    
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    content: {
      flex: 1,
      padding: 20,
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
   
   
   
  cardcontainer: {
    marginLeft:'4%'
   

  },
  itemContainer: {
    margin: 10, // Adjust the spacing as needed
    alignItems: 'center',
    marginHorizontal:40
  },
  imageforcard: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color:'black'
  },

  fourthItemImage: {
    // Styles for the 4th item image
    // Example: borderColor: 'red'
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
    marginLeft:'-20%'

  },
  fourthItemName: {
    // Styles for the 4th item name
    // Example: color: 'green'
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color:'black',
    marginLeft:-20
    

  },
  columnWrapper: {
    marginHorizontal: 10, // Adjust the spacing between columns
  },
  //header and modle
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
       closeButton: {
        color: 'white',
        fontSize: 32,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        width: 350,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
      },
      modalText: {
        marginBottom: 20,
        textAlign: 'center',
        color:'black'
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      button: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight:'bold'
      },
       
  })
export default Homepragya

