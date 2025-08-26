import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import axios from 'axios';
import SoundPlayer from 'react-native-sound-player';

import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Sound from 'react-native-sound';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); 

const Dictionarylistpraveen = (props:any) => {

  const navigation = useNavigation();

  const {
    ApiResponseofAlphabet,
    ApiResponse,
    Package,
    Medium,
    Index,//index of alphabet comming from Dictionarytitles Screen  
  } = props.route.params;


  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);

  // Fetch data at specific indexes
   const titleofdictionary = langWiseWords[24];
  const instructionofdictionary = langWiseWords[157];


  // for popup modle implementation
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ HindiWord: string } | null>(null);
  const [meaningData, setMeaningData] = useState<any>(null);

          const toggleModal = () => {
            setModalVisible(!isModalVisible);
          };

          const handleBackPress = () => {
            navigation.goBack();
          };

          // Function to handle the home button press
          const handleHomePress = () => {
            // Navigate to the home screen or the desired screen
            // props.navigation.goBack();
            props.navigation.navigate('Homepraveen',{ ApiResponse, Package, Medium })
          };



          // making axios request for meaning 
          const fetchMeaningData = async (word:any) => {
            try {
              const response = await axios.post('https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getAlphabetMeaning/', {
                LangSelected: Medium,
                PackSelected: Package,
                HindiWord: word,
              },{ timeout: 500000 });

              setMeaningData(response.data[0]); // Assuming the response is an array with a single item
              toggleModal();
            } catch (error) {
              console.error('Axios Error:', error);
            }
          };
          //for selecting the words of list
          const renderItem = ({ item }: any) => (
            <TouchableOpacity onPress={() => {
              fetchMeaningData(item.HindiWord); // Call the fetchMeaningData function with the HindiWord
              setSelectedItem(item);
              toggleModal();
            }}>
              <Text style={styles.FlatListvalues}>{item.HindiWord}</Text>
              
              </TouchableOpacity>
              
          );
          







          //for searching and filtering 
          // State for search input
          const [searchInput, setSearchInput] = useState('');

          // Filtered list based on the search input
          const filteredList = ApiResponseofAlphabet.filter((item:any) =>
            item.HindiWord.includes(searchInput)
          );

          //making sound object for playing after button press...
          // Initialize the Sound object
          const [isRecording, setIsRecording] = useState(false);
          const [isPlaying, setIsPlaying] = useState(false);
          const [sound, setSound] = useState<Sound | null>(null);
          useEffect(() => {
            return () => {
              // Cleanup when the component is unmounted
              audioRecorderPlayer.stopPlayer();
              audioRecorderPlayer.removeRecordBackListener();
              if (sound) {
                sound.stop();
                sound.release();
              }
            };
          }, [sound]);
          
          const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());



          

          const alphabetplaysound = async () => {
            const sound = meaningData?.sound ?? '';
            const soundWithoutExtension = sound.split('.').slice(0, -1).join('.');
            // Adding ".mp3" extension
            const soundnameWithExtension = `${soundWithoutExtension}.mp3`;
          
            try {
              // Make the Axios GET request
              const response = await axios.get(`https://lilaonmobile.rb-aai.in/LILAMobileData/DictSound/${soundnameWithExtension}`, {
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
          
        

        
          const getDocumentDirectoryPath = async () => {
            const documentDirectoryPath = RNFS.DocumentDirectoryPath;
            return documentDirectoryPath;
          };
            

          const startRecording = async () => {
            const documentDirectoryPath = await getDocumentDirectoryPath();
            const path = `${documentDirectoryPath}/localRecording.aac`;
        
            try {
              await audioRecorderPlayer.startRecorder(path);
              setIsRecording(true);
              setIsPlaying(false); // Stop playing if recording starts
              console.log(path)
            } catch (error) {
              toggleModal();
            }
          };
        
          const stopRecording = async () => {
            try {
              await audioRecorderPlayer.stopRecorder();

              setIsRecording(false);
              console.log("recording stopss")
            } catch (error) {
              toggleModal();
            }
          };
        
          const startPlaying = async () => {
            const documentDirectoryPath = await getDocumentDirectoryPath();
            const path = `${documentDirectoryPath}/localRecording.aac`;
        
            try {
              const playbackSound = new Sound(path, '', (error) => {
                if (error) {
                  console.error('Error loading sound', error);
                } else {
                  playbackSound.play(() => {
                    setIsPlaying(false);
                    playbackSound.release();
                    console.log("sound played")
                  });
                }
              });
        
              setSound(playbackSound);
              setIsPlaying(true);
              setIsRecording(false); // Stop recording if playback starts
            } catch (error) {
              toggleModal();
            }
          };
          



 
  return (
    <View style={{ flex: 1 }}>
    {/* header statrs */}
    <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>   
                  <View style={styles.header}>
                          {/* Left side - Back icon */}
                          <TouchableOpacity  onPress={handleBackPress}>
                            <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
                          </TouchableOpacity>

                          <Text style={styles.headerTitle}>{titleofdictionary}</Text>

                          {/* Right side - Home icon */}
                          <TouchableOpacity onPress={handleHomePress}>
                            <MaterialIcons  style={styles.headerIcon} name="home" size={32} color="white" />
                          </TouchableOpacity>
                </View>
                </SafeAreaView>
                {/* header ends... */}




    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
    >

            {/* for searchbar menu */}
                    {filteredList.length === 0 ? (<Text></Text>) : (
                    <Text style={styles.SearchbarTitle}>{ApiResponse[257].LangWiseWords} :</Text>
                    )}

                  {filteredList.length === 0 ? (<Text></Text>) : (
                      <TextInput
                      style={styles.Searchtitle}
                      placeholder="Type here in Hindi"
                      value={searchInput}
                      onChangeText={(text) => setSearchInput(text)}
                    />
                    )}
                    


              {/* rendering alphabet in list view */}
              {/* <FlatList
              
                data={filteredList}
                renderItem={renderItem}
                keyExtractor={(item) => item.RecId.toString()}
              /> */}

                      {filteredList.length === 0 ? (<Text style={{fontSize:20,color:'blue'}}>{ApiResponse[23].LangWiseWords}</Text>) : ( 
                        <FlatList
                          data={filteredList}
                          renderItem={renderItem} // Make sure to define your renderItem function
                          keyExtractor={(item) => item.RecId.toString()}
                        />
                      )}


                          <Modal isVisible={isModalVisible} style={styles.modal} backdropOpacity={0.5}>
                            <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedItem?.HindiWord || 'Loading...'}</Text>

                                    {/* Content for equivalent and grammar caption */}
                                    {meaningData && (
                                  <View style={styles.rowContainer}>
                                    <Text style={styles.modalText}>{langWiseWords[320]}:</Text>
                                    <Text style={styles.modalTextValue}>{meaningData?.LangWiseWords}</Text>
                                  </View>
                                      )}


                                    {/* Grammar */}
                                    
                                    {meaningData && (
                                      <View style={styles.rowContainer}>
                                        <Text style={styles.modalText}>{langWiseWords[20]}:</Text>
                                        <Text style={styles.modalTextValue}>{meaningData?.gramm_class}</Text>
                                      </View>
                                    )}

                              {/* iocons ................speaker ,volume ,pouse and play.....*/}

                              
                              <View style={styles.modalButtons}>
                              <View style={styles.iconButtonsContainer}>
                                  <TouchableOpacity style={styles.iconButton} onPress={alphabetplaysound}>
                                    <MaterialIcons name="volume-up" size={24} color="black" />
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.iconButton} onPress={startRecording} disabled={isRecording || isPlaying}>
                                    <MaterialIcons name="mic" size={24} color="black" />
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.iconButton} onPress={isRecording ? stopRecording : () => { sound && sound.stop(); setIsPlaying(false); }} disabled={!isRecording && !isPlaying}>
                                    <MaterialIcons name="stop" size={24} color="black" />
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.iconButton} onPress={startPlaying} disabled={isRecording || isPlaying}>
                                    <MaterialIcons name="play-arrow" size={24} color="black" />
                                  </TouchableOpacity>
                                  
                                  <TouchableOpacity style={styles.iconButton} onPress={toggleModal}>
                                    <MaterialIcons name="close" size={24} color="black" />
                                  </TouchableOpacity>
                              </View>
                              </View>



                            </View>
                          </Modal>


















                            <View>
                            {/* <Text>Dictionarylist are here and please handle the pop list and search bar also here </Text>
                            <Text>Package: {Package}</Text>
                            <Text>Medium: {Medium}</Text>
                            <Text>Index: {Index}</Text> */}
                          </View>
    </ImageBackground>

 </View>
  )
}


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
  containerofimage:{
    flex:1

  },
  SearchbarTitle:{
    color: 'black',
    fontSize: 20,
    fontWeight:'bold',
    margin:5,
    marginBottom:0,
    marginLeft:8,
    textAlign:'center'
  },
  Searchtitle:{
    height: 40,
    width: '100%', // You can adjust the width as needed
    elevation: 5, // Elevation for Android shadow
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 2,
    marginBottom: 10,
    paddingLeft: 8, // Add padding for better appearance
    borderRadius:5,
    backgroundColor:'white'
  },
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
  //modle styling is here............
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
    width: '90%',
    marginHorizontal: '5%',
    // marginRight: 0, // Remove this line if you want full width
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start', // Align text to the left
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft:'40%',
    color: 'black',
    textAlign: 'justify', // Align text to the left
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  okButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  iconButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  iconButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor:'#0D6EFD',
    borderRadius:4
  },
  // modalText: {
  //   color: 'black',
  //   fontWeight: 'bold',
  //   marginLeft: 10, // Adjust the left margin as needed
  //   marginBottom: 2, // Add margin bottom for spacing
  //   fontSize:14,
  //   textAlign: 'left',
   
  // },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // Adjust as needed
  },
  modalText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalTextValue: {
    color: 'black',
    fontSize: 14,
    marginLeft: 5, // Adjust as needed for spacing
  },

})

export default Dictionarylistpraveen

