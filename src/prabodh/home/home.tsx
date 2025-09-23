import { Button, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { lazy, useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Card from '../../components/Card';
import axios from 'axios';
import Modal from 'react-native-modal';

import { LogBox } from 'react-native';

import { RouteProp, useNavigation } from '@react-navigation/native';

LogBox.ignoreAllLogs(); 
// Home prabodh start here 


interface ServerData {
  LangWiseWords: string | null;
  

}



const Alphabet = lazy(() => import('../Alphabet/Alphabet'));


const home : React.FC = (props:any) => {
  
   
    

  // Extract the picker values from props
  const Package = props.route.params.Package;
  const Medium = props.route.params.Medium;
  const { ApiResponse } =  props.route.params;
  
  
   
  
  // State to store the data fetched from the server
  
  const [langWiseWordsToRender, setLangWiseWordsToRender] = useState<string[]>([]);

  useEffect(() => {
    if (ApiResponse && ApiResponse.length > 0) {
      const indicesToPrint = [119, 57, 158, 24];

      const wordsToRender = indicesToPrint
        .filter(index => index >= 0 && index < ApiResponse.length)
        .map(index => ApiResponse[index]?.LangWiseWords);

      setLangWiseWordsToRender(wordsToRender);

    }
  }, [ApiResponse]);

  
  // Static images
  const staticImages = [
    require('../../../assets/img/alphabate.png'),
    require('../../../assets/img/lessonn.png'),
    require('../../../assets/img/vocabulari.png'),
    require('../../../assets/img/wdictionary.png'),

    // Add more images as needed
  ];
   
  //handing header button navigation 

  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()
  
  const handleHomePress = () => {
    props.navigation.navigate('Homechnagescreen');
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const handleBackPress =()=>{



  // }


  



  // const handleHomePress =(props:any)=>{
  //  props.navigation.navigate('Homechnagescreen');
    
  // }
   

  // Render item for FlatList
  const renderItem = ({ item, index }:any) => {
    // Display static image above LangWiseWords
    const imageSource = staticImages[index % staticImages.length];

    return (
      <TouchableOpacity onPress={() => handleItemPress(item, index)}>
      <View style={styles.itemContainer}>
        
        <Image source={imageSource} style={styles.imageforcard} />
        <Text key={index} style={styles.name}>{item}</Text>
      
      </View>
      </TouchableOpacity>
    );
  };


  





  const handleItemPress = (item: any, index: number) => {
    // Use the index to determine the corresponding component and sending data also
    switch (index) {
      case 0:
        props.navigation.navigate('Alphabet',{ ApiResponse,Package,Medium,});
        break;
      case 1:
        props.navigation.navigate('Lesson',{ ApiResponse,Package,Medium,});
        break;
      case 2:
        props.navigation.navigate('Vocablary',{ ApiResponse,Package,Medium,});
        break;
      case 3:
        props.navigation.navigate('Dictionarytitles',{ ApiResponse,Package,Medium,});
        break;
      default:
       
    }
  };

  
  return (
<View style={{flex:1}}>
    {/* header statrs */}

    <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>
    <View style={styles.header}>
                {/* Left side - Back icon */}
                {/* <TouchableOpacity  onPress={handleBackPress}>
                  <MaterialIcons style={styles.headerIcon} name="close" size={32} color="white" />
                </TouchableOpacity> */}


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
                
                <Text style={styles.headerTitle}>प्रबोध</Text>
                
                {/* Right side - Home icon */}
                <TouchableOpacity onPress={handleHomePress}>
                  <MaterialIcons   style={styles.headerIcon} name="settings" size={32} color="white" />
                </TouchableOpacity>
      </View>
      {/* header ends... */}
      </SafeAreaView>



    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}>
      
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

              <FlatList
                 data={langWiseWordsToRender}
                 renderItem={renderItem}
                 keyExtractor={(item, index) => index.toString()}
                 numColumns={2}
            />
            
       </View>

       

    
 
   {/* twomarrow start from here.......... */}
 
     
     </View>
     </ImageBackground>
</View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // ensures it expands
   },
   headerCenter: {
    flex: 1,
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
 
 
 
cardcontainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
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
columnWrapper: {
  marginHorizontal: 10, // Adjust the spacing between columns
},

//modle styling 
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
export default home
