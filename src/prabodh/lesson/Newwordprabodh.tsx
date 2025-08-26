import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, TouchableWithoutFeedback, ToastAndroid, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Modal from 'react-native-modal';
import SoundPlayer from 'react-native-sound-player';

import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Sound from 'react-native-sound';

type NewWordItem = {
  word: string;
  isFirst: boolean;
};

const Newwordprabodh = (props:any) => {

  const {ApiResponse,Package,Medium,selectedLessonIndex,title,orignalessonindex} = props.route.params;
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
  const Sectiontitle=langWiseWords[53]
  const titleoflessonindex = langWiseWords[75];//headertitle

    //header navigation
    const handleBackPress = () => {
      navigation.goBack();}; 
    const navigation = useNavigation();
    
    const handleHomePress = () => {
      const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepraveen';
      props.navigation.navigate(homeScreen,{Package,Medium,ApiResponse});
    };

    const [newWords, setNewWords] = useState<any[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const apiUrl = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getLessonWiseNewWords/';
  
          const requestData = {
            LangSelected: props.route.params.Medium,
            PackSelected: props.route.params.Package,
            LessonNo: props.route.params.selectedLessonIndex.toString(),
          };
  
          const response = await axios.post(apiUrl, requestData);
  
          // Extract HNewWords from the response and split it into an array
          const hNewWordsArray = response.data
          .flatMap((item: any) => {
            const words = item.HNewWords.split(/,| \| /).map((word: string, index: number) => {
              // Mark the first word of each category and trim spaces
              return { word: word.trim(), isFirst: index === 0 };
            });
            return words;
          });
        
        setNewWords(hNewWordsArray);
  
          // Update state with the array of HNewWords
          setNewWords(hNewWordsArray);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [props.route.params.Medium, props.route.params.Package, props.route.params.selectedLessonIndex]);
  
  //modle start here..............
  const [selectedItem, setSelectedItem] = useState<NewWordItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [meaningData, setMeaningData] = useState<any>(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleItemClick = async (item: NewWordItem) => {
    console.log('Item clicked:', item);

    try {
      const apiUrl = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getAlphabetMeaning/';

      const requestData = {
        HindiWord: item.word,
        LangSelected: Medium, // You may need to adjust this based on your requirements
        PackSelected: Package, // You may need to adjust this based on your requirements
      };

      const response = await axios.post(apiUrl, requestData);
      setMeaningData(response.data[0]); // Assuming the response is an array with a single item
      toggleModal();

      // Handle the response as needed
      console.log('Meaning response:', response.data);

      // Add your logic for handling the click event and the response here
    } catch (error) {
      console.error('Error making POST request:', error);
      // Handle the error as needed
    }

    setSelectedItem(item);
    setIsModalVisible(true);
  };



  const closeModal = () => {
    setIsModalVisible(false);
  };
  
   //for word click on listitems 
  //  const handleItemClick = (item:any) => {
  //   console.log('Item clicked:', item);
  
  //   // Show toast message
  //   ToastAndroid.showWithGravityAndOffset(
  //     `Clicked Item: ${item.word}`,
  //     ToastAndroid.LONG,
  //     ToastAndroid.BOTTOM,
  //     25,
  //     50
  //   );
  
  //   // Add your logic for handling the click event here
  // };


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

        <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>
          <View style={styles.header}>
            {/* Left side - Back icon */}
            <TouchableOpacity onPress={handleBackPress}>
              <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
            </TouchableOpacity>

            {/* <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text> */}
            {Package === 'Prabodh' ? (
              <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>
            ) : (
              orignalessonindex < 5 ? (
                <Text style={styles.headerTitle}>{titleoflessonindex}:{orignalessonindex}</Text>
              ) : (
                <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>
              )
            )}

            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
          </View>
          </SafeAreaView>



        <ImageBackground
          source={require('../../../assets/img/bg.png')} // Provide the path to your image
          style={styles.backgroundImage}>

              <Text style={styles.title}>{Sectiontitle}</Text>
              <View style={styles.horizontaline}></View>




            <View style={styles.container}>
            <FlatList
              data={newWords}
              keyExtractor={(word, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={item.isFirst ? undefined : () => handleItemClick(item)}>
                  <View style={[styles.wordContainer, item.isFirst && styles.firstItem]}>
                    <Text style={item.isFirst ? styles.firstItemText : styles.wordText}>{item.word}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />




            {/* modle start here..... */}

            {/* <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
              <View style={styles.modalContent}>
                <Text>{selectedItem ? `Clicked Item: ${selectedItem.word}` : ''}</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal> */}

            <Modal isVisible={isModalVisible} style={styles.modal} backdropOpacity={0.5}>
            
                    <View style={styles.modalContent}>
                    <View style={styles.titlecontainer}><Text style={styles.modalTitle}>{selectedItem?.word || 'Loading...'}</Text></View>
                    

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





            
            </View>

          {/* <View>
            <Text>Objectiveprabodh</Text>
          </View> */}
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
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  flex: 1, // ensures it expands
},
   container: {
    flex: 1,
   
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    textAlign:"center",
    color:'black',
    marginTop:5
  },
  horizontaline:{
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop:1,
    marginBottom:10,
    margin:-30
   
  },
  //flatlist design android/app/src/main/res/values/strings.xml
  flatListContainer: {
    padding: 1,
  },
  wordContainer: {
    padding: 10,
   
    
    borderWidth: 0.5, // Add this line for border
    borderColor: '#ccc', // Add this line for border color
  },
  wordText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
  },
  firstItem: {
    backgroundColor: '#0D6EFD',
    // height:40  //if you want to adjust that hight of specific clored item 
  },
  firstItemText: {
    fontSize: 18,
    color: 'white',  // Adjust the color for the first word
    textAlign: 'left',
    fontWeight:'bold'
  },


  //modle styling start here 
  modal: {
   
   
    height: 600,
    width: '90%',
    marginHorizontal: '5%',
    // marginRight: 0, // Remove this line if you want full width
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    
  },
  titlecontainer:{justifyContent:'center',textAlign:'center'},

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent:'center',
    color: 'black',
    textAlign: 'center', // Align text to the left
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
export default Newwordprabodh