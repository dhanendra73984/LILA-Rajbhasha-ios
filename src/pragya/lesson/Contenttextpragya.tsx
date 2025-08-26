import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity, Modal, Button, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';

interface ContentDataItem {
  SentId: number;
  LHSentence: null;
  HSentence: string;
  SentenceSound: string;
  LHInstruction: null;
  Recid: number;
  EHSentence: null;
  LangSelected: null;
  PackageSelected: null;
  LangWiseWords: string; // This is the property we want to access
  tableNumber: number;
  Hindi: null;
  English: null;
  Assamese: null;
  Bodo: null;
  Bangla: null;
  Gujarati: null;
  Kannada: null;
  Kashmiri: null;
  Malayalam: null;
  Manipuri: null;
  Marathi: null;
  Nepalese: null;
  Oriya: null;
  Punjabi: null;
  Tamil: null;
  Telugu: null;
  
}
const Contenttextpragya = (props: any) => {
  const [contentData, setContentData] = useState<ContentDataItem[]>([]);
  const [selectedSentence, setSelectedSentence] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLangWiseWords, setSelectedLangWiseWords] = useState('');
  const [selectedSentenceSound, setSelectedSentenceSound] = useState('');

  const { ApiResponse, Package, Medium, title, selectedLessonIndex } = props.route.params;
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);
  const Sectiontitle = langWiseWords[278];
  const titleoflessonindex = langWiseWords[75];

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHomePress = () => {
    props.navigation.navigate('Homepragya', { Package, Medium, ApiResponse });
  };

  const handleSentencePress = (sentence: string) => {
    setSelectedSentence(sentence);
  
    // Find the corresponding item in contentData
    const selectedItem = contentData.find(
      (item: any) => item.HSentence.replace(/\|/g, ' ') === sentence
    );
  
    if (selectedItem) {
      // Extract LangWiseWords and SentenceSound from the selected item
      setSelectedLangWiseWords(selectedItem.LangWiseWords);
  
      // Replace .asf with .mp3 in SentenceSound
      const sentenceSoundWithMP3 = selectedItem.SentenceSound.replace(/\.asf$/, '.mp3');
      setSelectedSentenceSound(sentenceSoundWithMP3);
  
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/GetContentText/';

      const requestData = {
        LangSelected: Medium,
        tableNumber: selectedLessonIndex,
      };

      try {
        const response = await axios.post(url, requestData);
        const responseData = response.data;
        setContentData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  //.....................

  // Create a Sound instance
// Create a Sound instance
const sound = new Sound(
  `https://lilaonmobile.rb-aai.in/LILAMobileData/ContentText/${selectedSentenceSound}`,
  undefined,
  (error) => {
    if (error) {
      console.error('Error loading sound:', error);
    }
  }
);
// Function to play the sound
const playSound = () => {
  sound.play((success) => {
    if (success) {
      console.log('Sound played successfully');
    } else {
      console.error('Error playing sound');
    }
  });
};

// Function to stop the sound
const stopSound = () => {
  sound.stop(() => {
    console.log('Sound stopped');
  });
};



//model........
const [isTranslationModalVisible, setIsTranslationModalVisible] = useState(false);
const [allSentences, setAllSentences] = useState<ContentDataItem[]>([]);

// ...

const handleTranslationPress = () => {
  // Set all sentences and words in the state
  setAllSentences(contentData);

  // Show the translation modal
  setIsTranslationModalVisible(true);
};




  

  const sentences = contentData.map((item: any) => item.HSentence.replace(/\|/g, ' '));

  const renderSentenceItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleSentencePress(item)}>
      <View style={styles.listItem}>
        <Text style={styles.word}>{item}</Text>
      </View>
    </TouchableOpacity>
  );



  return (
    <View style={{ flex: 1 }}>
      {/* Your header */}
      {/* ... (previous header code) */}
      <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>   
      <View style={styles.header}>
            {/* Left side - Back icon */}
            <TouchableOpacity onPress={handleBackPress}>
              <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
            </TouchableOpacity>

            {/* <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text> */}

              <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>


            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
          </View>
          </SafeAreaView>



      <ImageBackground source={require('../../../assets/img/bg.png')} style={styles.backgroundImage}>
        <Text style={styles.title}>{Sectiontitle}</Text>
        <View style={styles.horizontaline} />

        <View style={styles.translationContainer}>
        <TouchableOpacity onPress={handleTranslationPress}>
          <Text style={styles.translationText}>Translation</Text>
        </TouchableOpacity>
      </View>

        <View style={styles.container}>
          <FlatList
            style={styles.flatList}
            data={sentences}
            renderItem={renderSentenceItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{selectedLangWiseWords.replace(/@/g, '')}</Text>
              {/* <Text style={styles.modalText}>Sentence Sound: {selectedSentenceSound}</Text> */}
              <View style={styles.iconRow}>
                {/* Icon for speaker */}
               <MaterialIcons name="volume-up" size={24} color="white" style={styles.icon} onPress={playSound} />
        {/* Icon for close */}
        <MaterialIcons name="close" size={24} color="white" onPress={() => { stopSound(); closeModal(); }} style={styles.icon} />
 
              </View>
            </View>
          </View>
        </Modal>



        {/* Translation Modal */}

        <Modal visible={isTranslationModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.modalContentContainer]}>
            
            <ScrollView>
              {allSentences.map((item) => (
                <View key={item.SentId}>
                <Text style={styles.modalText}>{item.HSentence.replace(/\|/g, ' ').replace(/@/g, '')}</Text>
                 <Text style={styles.modalText}>{item.LangWiseWords.replace(/\|/g, ' ').replace(/@/g, '')}</Text>
                 <View style={styles.horizontaline1} />
                </View>
                
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setIsTranslationModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>{langWiseWords[45]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </ImageBackground>
    </View>
  );
};

export default Contenttextpragya;

const styles = StyleSheet.create({
  container: {
    

  },
  flatList: {

    marginTop: 10,
    marginBottom:10
  },

  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  word: {
    fontSize: 16,
  
    color: 'black', // Text color
  },
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
   horizontaline:{
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop:1,
    marginBottom:10,
    margin:-30
   
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    textAlign:'center',
    color:'black',
    marginTop:5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // modalContent: {
  //   backgroundColor: 'white',
  //   padding: 20,
  //   borderRadius: 10,
  //   elevation: 5,
  //   width:'90%',
    
  // },
  modalText: {
    fontSize: 16,
    color: 'black',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
   marginVertical:10
  },
  icon: {
    backgroundColor: '#0D6EFD', // Add your desired background color
    padding: 6,
    borderRadius: 4,
    paddingLeft:'10%',
    paddingRight:'10%'
  },
  translationContainer: {
    marginLeft: 10,  // Adjust the margin as needed
    marginTop: 5,   // Adjust the margin as needed
    backgroundColor: '#0D6EFD',  // Add your desired background color
    padding: 2,      // Add padding to the container
    borderRadius: 5, // Add border radius for rounded corners
    width: 90, 
  },
  translationText: {
    fontSize: 14,    // Adjust the font size as needed
    
    color: 'white',
    textAlign:'center'
    
    
  },
  closeText: {
    fontSize: 16,
    color: 'white',
    backgroundColor: '#0D6EFD',
    padding: 2,
    borderRadius: 5,
    
    textAlign: 'center',
  },
  // closeButton: {
  //   marginTop: 10, // Adjust the margin as needed
  // },

  // modalContent: {
  //   backgroundColor: 'white',
  //   padding: 20,
  //   borderRadius: 10,
  //   elevation: 5,
  //   width: '90%',
    
  // },



  modalContainer1: {
    height:'80%',
    justifyContent:'center',
    alignContent:'center'
  

  },

  

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '95%',
    maxHeight: '80%',
    
   
  },

  closeButton: {
    marginTop: 10,
    backgroundColor: '#0D6EFD',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width:'95%'
  },
  modalContentContainer: {
    maxHeight: '75%',
  },

  closeButtonInsideModal: {
    marginTop: 10,
    backgroundColor: '#0D6EFD',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  horizontaline1:{
    height: 2,
    backgroundColor: '#ccc',
    marginTop:10, 
    marginBottom:10,
   
  
   
  },




});
