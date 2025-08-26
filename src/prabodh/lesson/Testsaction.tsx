import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
//this is text fill in the blanks
import Modal from 'react-native-modal';
const RadioButtonIcon = ({ checked }:any) => (
  <MaterialIcons
    name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
    size={20}
    color="#2F363F" // Set the color to match your design
  />
);
interface InstructionDataType {
  // Define the properties of your instruction data type
  SectionName: string;
  LangWiseWords: string;
  // Add other properties as needed
}

const Testsaction = (props:any) => {

  const {  ApiResponse,
    Package,
    Medium,
    selectedLessonIndex,
    title,
    instructionData,
    exercisesTablesData} = props.route.params;

    // Filter items that end with "TestFill"
  const filteredExercisesTablesData = exercisesTablesData.filter((item: string) => item.endsWith('TestFill'));
  const [fillBlanksData, setFillBlanksData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [hasUserSelected, setHasUserSelected] = useState<boolean>(false);//for answer selection
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);//for answer 
  const [fillBlanksDataLength, setFillBlanksDataLength] = useState<number>(0);
  const [correctAnswersRatio, setCorrectAnswersRatio] = useState<number>(0);
  const [timer, setTimer] = useState<number>(240);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  



  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);//for fetching data
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
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getTestFillBlanks/',
          {
            LangSelected: Medium,
            lessonnumber: selectedLessonIndex,
            tablename: filteredExercisesTablesData[0], // Assuming the first item in exercisesTablesData is used
          }
        );
  
        // Remove questions with null values and shuffle the remaining questions
        const nonNullQuestions = response.data.filter((question: { HSentence: any; HAnswer: any; }) => question && question.HSentence && question.HAnswer);
        const shuffledQuestions = shuffle(nonNullQuestions);
        const data = shuffledQuestions.slice(0, 5); // Select the first 5 items
  
        setFillBlanksData(data);
        setCurrentIndex(0); // Reset index when new data is loaded
        setSelectedChoice(null); // Reset selected choice when new data is loaded
        setHasUserSelected(false); // Reset user selection status
        setCorrectAnswersCount(0); // Reset correct answers count
        setFillBlanksDataLength(data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [Medium, selectedLessonIndex, exercisesTablesData]);
  
  // Function to shuffle an array (Fisher-Yates algorithm)
  const shuffle = (array:any) => {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  };

  const navigation = useNavigation();

  useEffect(() => {
    if (fillBlanksDataLength > 0) {
      const ratio = correctAnswersCount / fillBlanksDataLength;
      setCorrectAnswersRatio(ratio);
    }
  }, [correctAnswersCount, fillBlanksDataLength]);
  

  const handleNext = () => {
    const currentItem = fillBlanksData[currentIndex];
    if (currentIndex + 1 === 5) {
      setTimerRunning(false); // Stop the timer
    }
  
    if (fillBlanksData.length === 0 || !currentItem || !currentItem.HSentence.trim()) {

      // If fillBlanksData is empty or HSentence is empty, navigate to 'Testjumbleinstruction'
      props.navigation.navigate('Testjumbleinstruction' , {
        ApiResponse,
        Package,
        Medium,
        selectedLessonIndex,
        title,
        exercisesTablesData,
        correctAnswersCountoffillintheblacks: correctAnswersCount,
      });
    } else if (currentIndex === fillBlanksData.length - 1) {
      // If it's the last item, navigate to 'Testjumbleinstruction'
   
      props.navigation.navigate('Testjumbleinstruction' , {
        ApiResponse,
        Package,
        Medium,
        selectedLessonIndex,
        title,
        exercisesTablesData,
        correctAnswersCountoffillintheblacks: correctAnswersCount,
      });

    } else {
      // Otherwise, proceed to the next item
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedChoice(null); // Reset selected choice when navigating to the next item
      setHasUserSelected(false); // Reset user selection status
  
      // Check if the next button count is 4 and stop the timer

    }
  };


  const handlePrev = () => {
    if (currentIndex === 0) {
      // If it's the first item and user presses "Prev", navigate to 'Teststartprabodh'
      props.navigation.navigate('Teststartprabodh', {
        ApiResponse,
        Package,
        Medium,
        selectedLessonIndex,
        title,
        exercisesTablesData,
        
      });
    } else {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setSelectedChoice(null); // Reset selected choice when navigating to the previous item
      setHasUserSelected(false); // Reset user selection status
    }
  };
  
  const handleUndo = () => {
    if (hasUserSelected && selectedChoice === currentItem.HAnswer) {
      // If the selected choice was correct and user decides to undo, decrement the counter
      setCorrectAnswersCount((prevCount) => Math.max(0, prevCount - 1));
    }
  
    // Reset selected choice and filled blank when undoing
    setSelectedChoice(null);
    setHasUserSelected(false);
    setFillBlanksData((prevData) => {
      const newData = [...prevData];
      const originalSentence = currentItem.HSentence.replace(selectedChoice || '', '_____');
      newData[currentIndex] = { ...newData[currentIndex], HSentence: originalSentence };
      return newData;
    });
  };


  const handleRadioButtonPress = (choice: string) => {
    if (!hasUserSelected) {
      setSelectedChoice(choice);
      setHasUserSelected(true);
      // Replace the blank space in HSentence with the selected choice
      const updatedHSentence = currentItem.HSentence.replace(/_____/g, choice);
      setFillBlanksData((prevData) => {
        const newData = [...prevData];
        newData[currentIndex] = { ...newData[currentIndex], HSentence: updatedHSentence };
        return newData;
      });

      // Check if the selected choice is correct and update the counter
      if (choice === currentItem.HAnswer) {
        setCorrectAnswersCount((prevCount) => prevCount + 1);
      }
    }
  };
  // const handleRadioButtonPress = (choice: string) => {
  //   if (!hasUserSelected) {
  //     setSelectedChoice(choice);
  //     setHasUserSelected(true);
  //     // Replace the blank space in HSentence with the selected choice
  //     const updatedHSentence = currentItem.HSentence.replace(/_____/g, () => choice);
  //     setFillBlanksData((prevData) => {
  //       const newData = [...prevData];
  //       newData[currentIndex] = { ...newData[currentIndex], HSentence: updatedHSentence };
  //       return newData;
  //     });
  
  //     // Check if the selected choice is correct and update the counter
  //     if (choice === currentItem.HAnswer) {
  //       setCorrectAnswersCount((prevCount) => prevCount + 1);
  //     }
  //   }
  // };


//..............
// Filter instructionData based on SectionName
// Use a Set to store unique LangWiseWords
// Use a Set to store unique LangWiseWords
const uniqueLangWiseWordsSet = new Set<string>();

// Filter instructionData based on SectionName and extract unique LangWiseWords
const fillInTheBlanksInstructionsData = instructionData
  .filter((item: InstructionDataType) => item.SectionName === "FillInTheBlanks")
  .forEach((item: InstructionDataType) => {
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
  props.navigation.navigate('Testprabodh', {
    ApiResponse,
    Package,
    Medium,
    selectedLessonIndex,
    title,
    exercisesTablesData,
    correctAnswersCountoffillintheblacks: correctAnswersCount,
  });
};

// Function to handle Stop button press
const handleStopTimer = () => {
  setTimerRunning(false); // Stop the timer
  // You can add additional logic here if needed
};

  




  


  if (fillBlanksData.length === 0) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

     //header navigation
     const handleBackPress = () => {
      navigation.goBack();}; 
    
    
    const handleHomePress = () => {
      props.navigation.navigate('Home',{Package,Medium,ApiResponse});
    };

  const currentItem = fillBlanksData[currentIndex];
  const choices = currentItem.HChoices.split('|');

  if (!currentItem) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

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
                <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </View>
                <Text style={{fontSize:16,color:'#FF6900',marginLeft:5}}>{langWiseWords[287]}</Text>
              </View>
              {/* fill in the blankc  #ff9819 #FF8C00 #ff8f4a*/}
              <Text style={styles.title1}>{langWiseWords[106]}</Text>
              <Text  style={styles.title1}>{fillBlanksData[0]?.LangWiseWords}</Text>
             
              <View style={styles.horizontalinefortext}></View>





      {/* <Text>Testsaction</Text>
      <Text>Time Remaining: {timer} seconds</Text>
      <TouchableOpacity onPress={handleStopTimer}>
        <Text>Stop Timer</Text>
      </TouchableOpacity> */}


      <View  style={{height:120}}>

      {/* <Text  style={styles.sentence}>{currentIndex + 1}.{currentItem.HSentence}</Text> */}
        {/* <Text style={styles.sentence}>
          {currentIndex + 1}.{currentItem.HSentence.split(/(_____)/).map((part: string, index: number) => (
            <Text key={index} style={index % 2 === 0 ? {} : { color: 'red' }}>
              {part}
            </Text>
          ))}
          
        </Text> */}
        <Text style={styles.sentence}>
        {currentIndex + 1}.{currentItem.HSentence.split(/(_____)/).map((part: string, index: number) => (
          <Text key={index} style={index % 2 === 0 ? {} : { color: part.includes('_____') ? '#D63031' : 'black' }}>
            {index % 2 === 0 ? part : selectedChoice !== null ? selectedChoice : '_____'}
          </Text>
        ))}
       </Text>


        {/* Display choices with MaterialIcons for radio buttons in front of them   {currentItem+1} */}
        <View style={styles.choicesContainer}>
          {choices.map((choice: string, index:number) => (
            <TouchableOpacity
              key={index}
              style={styles.choiceRow}
              onPress={() => handleRadioButtonPress(choice)}
            >
              <RadioButtonIcon  checked={selectedChoice === choice} />
              
              
              <Text  style={styles.choice} >{choice}</Text>
            </TouchableOpacity>
          ))}
        </View>
       </View>


    <View style={styles.horizontalinefortext}></View>
    {/* <Text>HAnswer: {currentItem.HAnswer}</Text> */}
    <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={handleHelpPress} style={styles.blueButton}>
        <Text style={styles.buttonText}>{langWiseWords[38]}</Text>
    </TouchableOpacity>
    {/* <TouchableOpacity onPress={handlePrev} style={styles.blueButton}>
      <Text style={styles.buttonText}>Prev</Text>
    </TouchableOpacity> */}
    <TouchableOpacity onPress={handleUndo} disabled={!hasUserSelected} style={styles.blueButton}>
      <Text style={styles.buttonText}>{langWiseWords[79]}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleNext} style={styles.blueButton}>
      <Text style={styles.buttonText}>{langWiseWords[19]}</Text>
    </TouchableOpacity>

    </View>
    {/* <Text>Correct Answers: {correctAnswersCount}</Text> */}

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



export default Testsaction

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


  buttonText: {
    color: 'white',
    marginHorizontal:5
  },
  choicesContainer: {
    flexDirection: 'column',
    marginBottom: 30,
  },
  choiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft:'4%'
  },
  choice: {
    fontSize: 16,
    marginRight: 12,
    color:'blue',
    fontWeight:'bold',
    
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
  sentence: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'left',
    color:'blue',
    fontWeight:'bold',
    marginLeft:'3%'
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black', // Set the border color for both checked and unchecked states
  },
  blueButton: {
    backgroundColor: '#0D6EFD',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 10,
    
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
})