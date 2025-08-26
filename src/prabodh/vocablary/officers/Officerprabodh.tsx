import { FlatList, ImageBackground, LogBox, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Modal from 'react-native-modal';
import SoundPlayer from 'react-native-sound-player';

LogBox.ignoreAllLogs();
// Define the type or interface for your API response
interface VocabularyItem {
  Recid: number | null;
  HWord: string;
  LangWiseWords:string;
  WordSound:string;
 

}

const Officerprabodh = (props:any) => {

  const navigation = useNavigation();
  const {ApiResponse,Package,Medium} = props.route.params;//coming from parent component 
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);//for mapping index
  const titleofoffice = langWiseWords[42];
  
  const [vocabularyData, setVocabularyData] = useState([]);
  const [langWiseInstruction, setLangWiseInstruction] = useState<string | null>(null);


  //for maintaing pop up model 
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<VocabularyItem | null>(null);
  //making axios request for Names of  office 
  useEffect(() => {
    const fetchVocabularyData = async () => {
      try {
        const response = await axios.post('https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getVocabularyData/', {
          LangSelected: Medium,
          PackSelected: Package,
          GenCategory: 'Offices',
          SectionName: 'Offices',
        },{timeout:500000});

        setVocabularyData(response.data);
        setLangWiseInstruction(response.data[0]?.LangWiseInstruction || null);
      } catch (error) {
        console.error('Axios Error:', error);
      }
    };

    fetchVocabularyData();
  }, [Package, Medium]);


   

  




 //header onpress
  const handleBackPress = () => {
    navigation.goBack();
  };
  // Function to handle the home button press 
  const handleHomePress = () => {
    // Navigate to the home screen or the desired screen
   props.navigation.navigate('Home',{Package,Medium,ApiResponse});
  };
  //pop up handling 
  const handleItemPress = (item:VocabularyItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  //for rendering flatlist items
   // Exclude the first item from rendering because its comming empty 
   const dataToRender = vocabularyData.slice(1);
  
   const renderItem = ({ item }: { item: VocabularyItem }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View>
        <Text style={styles.FlatListvalues}>{item.HWord}</Text>
      </View>
    </TouchableOpacity>
  );

  //after rendering sound play event is happening here .......
      const soundplayonlistitems = async (selectedWord:any) => {
        try {
          // Replace ".wav" with ".mp3" in the selected word
          const soundNameWithExtension = selectedWord.replace('.wav', '.mp3');
      
          // Make the Axios GET request
          const response = await axios.get(`https://lilaonmobile.rb-aai.in/LILAMobileData/VocabSoundFiles/${soundNameWithExtension}`, {
            responseType: 'arraybuffer', // Ensure the response is treated as an array buffer
          });
      
          // Check if response.config.url is defined before using it
          if (response.config.url) {
            // Use the response data as needed
            console.log('Axios Response:', response);
      
            // Play the sound using react-native-sound-player
            SoundPlayer.playUrl(response.config.url);
          } else {
            console.error('Axios Error: Response URL is undefined.');
          }
        } catch (error) {
          // Handle errors
          console.error('Axios Error:', error);
        }
      };


  return (
    <View style={{flex:1}}>
<SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>   
       <View style={styles.header}>
        {/* Left side - Back icon */}
        <TouchableOpacity  onPress={handleBackPress}>
          <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{titleofoffice}</Text>

        {/* Right side - Home icon this page dosnt have this  */}
        <TouchableOpacity onPress={handleHomePress}>
          {/* <MaterialIcons  style={styles.headerIcon} name="home" size={32} color="white" /> */}
        </TouchableOpacity>
      </View>
      </SafeAreaView>
  



    <ImageBackground
    source={require('../../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}>


       {/* for instruction section */}
       {langWiseInstruction && <Text style={styles.instruction}>{langWiseInstruction}</Text>}
       <View style={styles.separator} />

       {/* list showing after resoponse comming  */}
       <FlatList
        data={dataToRender}
        renderItem={renderItem}
        keyExtractor={(item) => (item.Recid ? item.Recid.toString() : item.HWord)}
        
      />
          {/* for popup handling  */}
          <Modal isVisible={isModalVisible} style={styles.modal}>
            <View style={styles.modalContent}>
                <View style={styles.textPair}>
                          <Text style={styles.modalTitle}>{langWiseWords[284]}:</Text>
                          <Text style={{color:'black'}}>{selectedItem?.HWord}</Text>
                </View>
              <View style={styles.textPair}>
                        <Text style={styles.modalTitle1}>{langWiseWords[320]}:</Text>
                        <Text style={{color:'black',width:200}}>{selectedItem?.LangWiseWords}</Text>
              </View>
              {/* Button container */}
              <View style={styles.buttonContainer}>
                {/* Play sound button */}
                <TouchableOpacity style={styles.playButton} onPress={() => soundplayonlistitems(selectedItem?.WordSound)}>
                  <Text style={styles.buttonText}>{langWiseWords[15]}</Text>
                </TouchableOpacity>

                {/* Close button */}
                <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                  <Text style={styles.buttonText}>{langWiseWords[45]}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


    
        <View>            
        {/* <Text>Officerprabodh are handele here with pop up handling ... </Text> */}
        </View>

    </ImageBackground>

    </View>
  )
}

export default Officerprabodh

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
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  flex: 1, // ensures it expands
},
   instruction: {
    // Styling for the instruction text
    marginBottom: 10, // Adjust as needed
    color:'black',
    marginTop:10,
    margin:5,
    textAlign: 'justify',
    lineHeight: 20,
    
  },
  separator: {
    backgroundColor: '#0D6EFD',
    height: 4, // Adjust the height of the line
    marginVertical: 10, // Adjust as needed
  },
  //flatlist styling 
  FlatListvalues:{
    height: 50,
    width: '100%', // You can adjust the width as needed
     // Elevation for Android shadow
    borderColor: '#ccc',
    borderWidth: 0.5,
   
    marginBottom:1,
    padding:10,
    paddingLeft:8,
    borderRadius:1,
    fontSize:16,
    color:'black'
   
  },
  //model styling start from here 
  modal: {
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start', // Align items to the left
    width: '100%', // Adjust the width as needed
    height: 'auto', // Adjust the height as needed
  },
  modalTitle1: {
    fontSize: 14,
    fontWeight: 'bold',
    marginEnd:20,
    color: 'black',
    textAlign: 'justify',  
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginEnd:55,
    color: 'black',
    textAlign: 'justify',  
  },
  

  textPair: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Center children vertically
     // Adjust spacing between pairs
     
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop:10,
    
  },
  playButton: {
    backgroundColor: '#0D6EFD',
    padding: 10,
    borderRadius: 5,
    width: '40%', // Set the desired width
    marginEnd:'18%'

  },
  closeButton: {
    backgroundColor: '#0D6EFD',
    padding: 10,
    borderRadius: 5,
    width: '40%', // Set the desired width
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
})