import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

interface TestData {
  EnglishInst: string | null;
  AssameseInst: string | null;
  BodoInst: string | null;
  BanglaInst: string | null;
  // Add other properties as needed
  RecId: number;
  LHInstruction: string | null;
  HSentence: string;
  HAnswer: number;
  lessonnumber: number | null;
  packagename: string | null;
  tablename: string | null;
  LangSelected: string | null;
  LangWiseWords: string;
  hanswer: string | null;
}

const Testtruefalse = (props: any) => {
  const { ApiResponse, Package, Medium, selectedLessonIndex, title, correctAnswersCountoffillintheblacks, correctCountofjumble ,exercisesTablesData,instructionData} = props.route.params;

  const [testData, setTestData] = useState<TestData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCounter, setCorrectCounter] = useState(0);
  
  const filteredExercisesTablesData = exercisesTablesData.filter((item: string) => item.endsWith('TrueFalse'));
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);//for fetching data
  const [timer, setTimer] = useState<number>(540);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

//modle start 
const [isHelpModalVisible, setHelpModalVisible] = useState(false);

const toggleHelpModal = () => {
  setHelpModalVisible(!isHelpModalVisible);
};

const handleHelpPress = () => {
  toggleHelpModal();
};
//modle end


  useEffect(() => {
    // Make an Axios POST request to the API endpoint
    axios.post('https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getTestTrueorFalse', {
      LangSelected: Medium,
      tablename: filteredExercisesTablesData[0],
    },{timeout:500000})
    .then(response => {
      // Handle the response data
      const shuffledData = shuffleArray(response.data.filter((item: null) => item !== null));
      setTestData(shuffledData.slice(0, 5));
      // Slice the array to include only the first 5 elements
      setTestData(shuffledData.slice(0, 5));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    setCorrectCounter(0);
  }, []); // Empty dependency array ensures this effect runs once on component mount
  
  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array:any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handlePrev = () => {
    // Reset the selected answer and move to the previous question
    setSelectedAnswer(null);
    setCurrentIndex(currentIndex - 1);
  };
  const navigation = useNavigation();

  const handleNext = () => {

    const currentItem = testData[currentIndex];
    if (currentIndex + 1 === 5) {
      setTimerRunning(false); // Stop the timer
    }
    setSelectedAnswer(null);
  
    if (currentIndex === testData.length - 1) {
      // If it's the last question, update the correctCounter state and then navigate
      setCorrectCounter((prevCounter) => prevCounter + 1);
      props.navigation.navigate('Testprabodh', {ApiResponse, Package, Medium, selectedLessonIndex, title, correctAnswersCountoffillintheblacks, correctCountofjumble, correctCounteroftruflase: correctCounter + 1 });
    } else {
      // If not the last question, move to the next question
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleAnswer = () => {
    // Handle the answer based on the selected answer
    if (selectedAnswer !== null) {
      const selectedValue = selectedAnswer === 'true' ? '1' : '0';
      console.log(`Selected Answer: ${selectedValue}`);
  
      const isCorrect = selectedValue === testData[currentIndex].HAnswer.toString();
      if (isCorrect) {
        setCorrectCounter((prevCounter) => prevCounter + 1); // Increase the counter if the answer is correct
        console.log(`Correct answer! Value: ${testData[currentIndex].HAnswer}`);
      } else {
        console.log(`Incorrect answer! Value: ${testData[currentIndex].HAnswer}`);
      }
    } else {
      // No answer selected, handle accordingly
      console.log('No answer selected.');
    }
  
    // Move to the next question
    handleNext();
  };
  const handleUndo = () => {
    // Clear the selected answer without moving to the next question
    setSelectedAnswer(null);
  };

   //header navigation
   const handleBackPress = () => {
    navigation.goBack();}; 
  
  
  const handleHomePress = () => {
    const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepraveen';
    props.navigation.navigate(homeScreen,{Package,Medium,ApiResponse});
  };


  // Use a Set to store unique LangWiseWords
const uniqueLangWiseWordsSet = new Set<string>();
  const fillInTheBlanksInstructionsData = instructionData
  .filter((item: { SectionName: string; }) => item.SectionName === "TrueAndFalse")
  .forEach((item: { LangWiseWords: any; }) => {
    uniqueLangWiseWordsSet.add(item.LangWiseWords);
  });

// Convert Set to an array
const fillInTheBlanksInstructions = Array.from(uniqueLangWiseWordsSet);

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

useEffect(() => {
  if (timerRunning) {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          // Timer has reached 0, handle the end of the test
          clearInterval(timerInterval);
          handleTimeUp();
          return 0;
        }
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerInterval);
  }
}, [timerRunning]); // Run the effect when timerRunning changes

// Function to handle "Time's Up"
const handleTimeUp = () => {
  // Navigate to 'Testprabodh' when the timer reaches 0
  props.navigation.navigate('Testprabodh', {ApiResponse, Package, Medium, selectedLessonIndex, title, correctAnswersCountoffillintheblacks, correctCountofjumble, correctCounteroftruflase: correctCounter + 1 });
};

// Function to handle Stop button press
const handleStopTimer = () => {
  setTimerRunning(false); // Stop the timer
  // You can add additional logic here if needed
};

  
  

  return (
    <View style={{flex:1}}>
        <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>
        <View style={styles.header}>
            {/* Left side - Back icon */}
            <TouchableOpacity onPress={handleBackPress}>
              {/* <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" /> */}
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{langWiseWords[75]}:{selectedLessonIndex}</Text>

            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
          </View>
          </SafeAreaView>

          <ImageBackground
            source={require('../../../assets/img/bg.png')}
            style={styles.backgroundImage}>

              <Text style={styles.title}>{langWiseWords[104]}</Text>
              <View style={styles.horizontaline}></View>

              <View style={{ flexDirection: 'row', }}>
                <Text style={{fontSize:16,color:'black',marginLeft:5}}>{langWiseWords[145]}:</Text>
                {/* <Text style={{ backgroundColor: '#F3B431', marginLeft:5,fontSize: 16, fontWeight: 'bold' ,paddingBottom:1 ,color:'black'}}>{Math.floor(remainingTime / 60)}:{remainingTime % 60}</Text> */}
                <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
                 </View>
                <Text style={{fontSize:16,color:'#FF6900',marginLeft:5}}>{langWiseWords[287]}</Text>
              </View>
              {/* fill in the blankc  #ff9819 #FF8C00 #ff8f4a*/}
              <Text style={styles.title1}>{langWiseWords[148]}</Text>
              <Text  style={styles.title1}>{testData[0]?.LangWiseWords}</Text>
             
              <View style={styles.horizontalinefortext}></View>



      {/* <Text>Testtruefalse</Text> */}

      {testData.length > 0 && currentIndex < testData.length && (
        <View>
          <Text style={styles.sentence}>{currentIndex + 1}.{testData[currentIndex].HSentence}</Text>
          {/* <Text>HAnswer: {testData[currentIndex].HAnswer}</Text> */}

          {/* Icons for True and False */}
          <View style={styles.radioButtonContainer}>
            <View style={styles.radioButtonRow}>
              <MaterialIcons
                name={selectedAnswer === 'true' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={20}
                color="#2F363F" // Set the color to match your design
                onPress={() => setSelectedAnswer('true')}
              />
              <Icon
                name="check"
                size={30}
                color="black"
              />
            </View>
            <View style={styles.radioButtonRow}>
              <MaterialIcons
                name={selectedAnswer === 'false' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={20}
                color="#2F363F" // Set the color to match your design
                onPress={() => setSelectedAnswer('false')}
              />
              <Icon
                name="close"
                size={30}
                color="black"
              />
            </View>
          </View>
        </View>
      )}

      {/* <Text>Correct Answers: {correctCounter}</Text> */}

      <View style={styles.horizontalinefortext}></View>

{/* Next, Prev, and Undo text elements */}
        {/* <View style={styles.textContainer}>
          <Text style={styles.textButton} onPress={handlePrev} disabled={currentIndex === 0}>
            Prev
          </Text>
          <Text
          style={styles.textButton}
          onPress={handleAnswer}
          disabled={currentIndex === testData.length - 1 && selectedAnswer === null}
        >
          Next
        </Text>
          <Text style={[styles.textButton, { color: 'blue' }]} onPress={handleUndo} disabled={selectedAnswer === null}>
            Undo
          </Text>
        </View> */}

        <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={handleHelpPress} style={styles.button}>
        <Text style={styles.buttonText}>{langWiseWords[38]}</Text>
       </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.button}
            onPress={handlePrev}
            disabled={currentIndex === 0}
          >
            <Text style={styles.buttonText}>Prev</Text>
          </TouchableOpacity> */}

         <TouchableOpacity
            style={[styles.button, { backgroundColor: '#0D6EFD' }]}
            onPress={handleUndo}
            disabled={selectedAnswer === null}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>{langWiseWords[79]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleAnswer}
            disabled={currentIndex === testData.length - 1 && selectedAnswer === null}
          >
            <Text style={styles.buttonText}>{langWiseWords[19]}</Text>
          </TouchableOpacity>

          
        </View>

        <Modal isVisible={isHelpModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
        <View style={styles.modalContainer}>
        <Text style={styles.modalText1}>{langWiseWords[38]}</Text>
          <Text style={styles.modalText}>{fillInTheBlanksInstructions}</Text>
          <TouchableOpacity onPress={toggleHelpModal} style={styles.closeButton}>
            <Text style={styles.buttonText}>{langWiseWords[45]}</Text>
          </TouchableOpacity>
        </View>
      </Modal>


        </ImageBackground>
    </View>
  );
};

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
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
   textAlign:'center',
    color:'black',
    marginTop:5
  },
  title1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Adjust the margin based on your preference
    marginLeft:5,
    color:'black',
    textAlign:'left'
   
  },




  iconContainer: {
    flexDirection: 'column',
    
    marginTop: 10,
  },
  radioButtonContainer: {
    marginTop: 10,
    marginLeft:'4%'
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D6EFD',
  },
  horizontaline:{
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop:1,
    marginBottom:10,
    margin:-30
   
  },
  horizontalinefortext:{
    height: 1,
    backgroundColor: '#99AAAB',
    
    marginBottom:10,
    elevation:3,  
    marginTop:30
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 20,
  },
  
  button: {
    backgroundColor: '#0D6EFD',
    padding: 10,
    borderRadius: 5,
    
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },

  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
    marginHorizontal: 0,
    color:'black'
  },
  modalText1: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
    marginHorizontal: 0,
    color:'black',
    fontWeight:'bold'
  },
  closeButton: {
    backgroundColor: '#0D6EFD',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  sentence: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'left',
    color:'blue',
    fontWeight:'bold',
    marginLeft:'3%'
  },
  timerContainer: {
    backgroundColor: '#F3B63A',
    padding: 1,
    borderRadius: 5,
    paddingLeft:4,
    paddingRight:4
   
  },
  timerText: {
    color: 'black',
    fontSize: 16,
    fontWeight:'bold'
  },
});

export default Testtruefalse;