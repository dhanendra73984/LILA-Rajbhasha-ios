import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//logic part is done styling and validation remaining 

const Fillintheclues = (props: any) => {
  const {
    exerciseName,
    exerciseContent,
    ApiResponse,
    Package,
    Medium,
    selectedLessonIndex,
    index,
  } = props.route.params;

 
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
  const Sectiontitle=langWiseWords[46]
  const titleoflessonindex = langWiseWords[75];//headertitle
    //header navigation
    const handleBackPress = () => {
      navigation.goBack();}; 
    const navigation = useNavigation();
    
    const handleHomePress = () => {
      props.navigation.navigate('Home',{Package,Medium,ApiResponse});
    };




  const [fillCluesData, setFillCluesData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isResultModalVisible, setResultModalVisible] = useState(false);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [suggestedText, setSuggestedText] = useState('');





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getTranslation/',
          {
            LangSelected: Medium,
            tablename: exerciseContent,
          }
        );

        setFillCluesData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % fillCluesData.length);
    setIsCorrectAnswer(false); // Reset correct answer status when moving to the next question
    setUserInput('');
    setSuggestedText(' ');
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? fillCluesData.length - 1 : prevIndex - 1
    );
    setIsCorrectAnswer(false); // Reset correct answer status when moving to the previous question
    setUserInput('');
    setSuggestedText(' ');

  };



  const hideResultModal = () => {
    setResultModalVisible(false);
  };


  // Function to check if the input contains Hindi characters
  const containsHindi = (input: string) => {
    // Add logic to check if the input contains Hindi characters
    // For simplicity, let's assume it contains Hindi characters if it contains any Devanagari script character.
    const hindiRegex = /[\u0900-\u097F]/;
    return hindiRegex.test(input);
  };

  // Function to handle user input change

    // Function to clear the text input
    const handleClear = () => {
      setUserInput('');
      setLanguageModalVisible(false); // Hide language modal if it's visible
    };

    const [isAnswerEntered, setIsAnswerEntered] = useState(false);
  const [isAnswerModalVisible, setAnswerModalVisible] = useState(false);
  
    // Function to show the correct answer


    //...............


  
  
  
  //........
  


  const checkAnswer = () => {
    if (userInput.trim() === '') {
      // Show a modal indicating that the user should enter an answer first
      setAnswerModalVisible(true);
    } else {
      const correctAnswer = fillCluesData[currentIndex].HAnswer;
      const isCorrect = userInput === correctAnswer;
      setIsCorrectAnswer(isCorrect);
      setResultModalVisible(true);
    }
  };
  //..
  const handleInputChange = (text: string) => {
    setUserInput(text);

    if (text.trim() !== '' && !containsHindi(text)) {
      setLanguageModalVisible(true);
      setIsAnswerEntered(true);
    } else {
      setLanguageModalVisible(false);
      setIsAnswerEntered(false);
    }

    setSuggestedText(text);
  };
  const handleShowCorrectAnswer = () => {
    const correctAnswer = fillCluesData[currentIndex].HAnswer;
    if (userInput.trim() === '') {
      setAnswerModalVisible(true);
    } else {
      setUserInput(correctAnswer);
      setLanguageModalVisible(false);
    }
  };

  const [isSuggestionModalVisible, setSuggestionModalVisible] = useState(false);

  const hideAnswerModal = () => {
    setAnswerModalVisible(false);
  };
  const handleShowSuggestions = () => {
    if (userInput.trim() === '') {
      setAnswerModalVisible(true);
    } else {
      setSuggestionModalVisible(true);
    }
  };

  const hideSuggestionModal = () => {
    setSuggestionModalVisible(false);
  };

  return (

    <View style={{ flex: 1 }}>
      
      <View style={styles.header}>
            {/* Left side - Back icon */}
            <TouchableOpacity onPress={handleBackPress}>
              <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>

            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
       </View>

       <ImageBackground
          source={require('../../../assets/img/bg.png')} // Provide the path to your image
          style={styles.backgroundImage}>

              <Text style={styles.title}>{exerciseName}</Text>
              <View style={styles.horizontaline}></View>  

                       

      <Text style={styles.instruction}>{fillCluesData[0]?.LangWiseWords}</Text>

    <View style={styles.container}>

      <View style={styles.horizontalinefortext}></View>
   

    



     



      {fillCluesData.length > 0 && (
        <View  style={{height:200}}>
          <Text style={styles.sentence}>{currentIndex + 1}.{fillCluesData[currentIndex].LPreSentence}</Text>
          
          <TextInput
              style={styles.input}
              value={userInput}
              onChangeText={handleInputChange}
              placeholder="Type here in Hindi"
              multiline // Add this property for multiline TextInput
              textAlignVertical="top" // Set this property to move the placeholder to the top
            />

            <View style={styles.rowContainer}>

          </View>

          

          <Modal isVisible={isResultModalVisible} onBackdropPress={hideResultModal}>
            <View style={styles.modalContainer}>
              <Text style={styles.resultModalText}>
                {isCorrectAnswer ? langWiseWords[0] : langWiseWords[5]}
              </Text>
              <TouchableOpacity style={styles.modalCloseButton} onPress={hideResultModal}>
                <Text style={styles.modalCloseButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal isVisible={isLanguageModalVisible} onBackdropPress={() => setLanguageModalVisible(false)}>
            <View style={styles.modalContainer}>
              <Text style={styles.resultModalText}>Please type in Hindi only. From the Home screen, tap Apps {'>'} Settings {'>'} Input language & Input</Text>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setLanguageModalVisible(false)}>
                <Text style={styles.modalCloseButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>

      <Modal isVisible={isAnswerModalVisible} onBackdropPress={hideAnswerModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.resultModalText}>Please enter the answer first</Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={hideAnswerModal}>
            <Text style={styles.modalCloseButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isAnswerModalVisible} onBackdropPress={hideAnswerModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.resultModalText}>Please enter the answer first</Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={hideAnswerModal}>
            <Text style={styles.modalCloseButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isSuggestionModalVisible} onBackdropPress={() => setSuggestionModalVisible(false)}>
            <View style={styles.modalContainer}>
              <Text style={styles.resultModalText}>{suggestedText}{'-->'}{fillCluesData[currentIndex].HAnswer}</Text>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => { setSuggestionModalVisible(false);handleShowCorrectAnswer();}}>
                <Text style={styles.modalCloseButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>

        </View>
      )}


    <View style={styles.horizontalinefortext}></View>

    <View style={styles.rowContainer}>

    
    <TouchableOpacity onPress={handleShowSuggestions}>
      <Text style={styles.navigationButton}>suggestion</Text>
    </TouchableOpacity>
        
        <TouchableOpacity onPress={checkAnswer}>
          <Text style={styles.navigationButton}>{langWiseWords[92]}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShowCorrectAnswer}>
              <Text style={styles.navigationButton} >{langWiseWords[93]}</Text>
        </TouchableOpacity>

    </View>
 



      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={handlePrev}>
          <Text style={styles.navigationButton1}>{langWiseWords[90]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.navigationButton1}>{langWiseWords[19]}</Text>
        </TouchableOpacity>
      </View>
    </View>

    </ImageBackground>

    </View>
  );
};



export default Fillintheclues

const styles = StyleSheet.create({
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

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    marginLeft:'41%',
    color:'black',
    marginTop:5
  },
  horizontaline:{
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop:1,
    marginBottom:1,
    margin:-30
   
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  instruction:{
    color:'black',
    fontSize: 14,
    fontWeight:'bold',
    lineHeight:20,
    margin:5,
    marginBottom:10
  },


  input: {
    fontSize:18,
    height: '35%', // Adjust height as needed
    backgroundColor: 'white', // Set background color to white
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
    width:'60%',
   
    borderRadius: 1, // Optional: Add border radius for rounded corners
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom:10,
    marginLeft:5
    
  },
  container: {
    flex: 1,
    marginLeft:0
   
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 4,
  },

  resultModalText: {
    color:'black',
    fontSize: 14,
   
    lineHeight:20,
    margin:5,
    marginBottom:20,
    textAlign:'center'
  },
  modalCloseButton: {
    backgroundColor: '#0D6EFD',
    padding: 10,
    borderRadius: 5,

  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center'
  },

  horizontalinefortext:{
    height: 1,
    backgroundColor: '#99AAAB',
    
    marginBottom:30,
    elevation:3  
  },
  sentence: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left',
    color:'blue',
    fontWeight:'bold',
    marginLeft:'3%'
  },

  navigationButton: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,   
    width:'auto',
    backgroundColor:'#0D6EFD',
    textAlign:'center',
    marginHorizontal:3,
    padding:2,
    borderRadius:4

  },
  navigationButton1: {
    fontSize: 16,
    color: 'white',
      
    width:'auto',
    backgroundColor:'#25CCF7',
    textAlign:'center',
    marginHorizontal:3,
    padding:2,
    borderRadius:4

  },

})