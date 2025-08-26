import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

interface Sentence {
  Hindi: string;
  SectionName: string;
  LangWiseWords: string;
  LangWiseWordsInst:string;
}


const shuffleArray = (array: string[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Testjumbleprabodh = (props: any) => {
  const {
    ApiResponse,
    Package,
    Medium,
    selectedLessonIndex,
    title,
    exercisesTablesData,
    correctAnswersCountoffillintheblacks,
    instructionData
    
  } = props.route.params;

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [shuffledHindiWords, setShuffledHindiWords] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const navigation = useNavigation();
  // const [remainingTime, setRemainingTime] = useState<number>(30); // 2 minutes in seconds
  const filteredExercisesTablesData = exercisesTablesData.filter((item: string) => item.endsWith('Jumble'));
  const [timer, setTimer] = useState<number>(360);
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
        const response = await axios.post<Sentence[]>(
          'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/GetJumbleSentence/',
          {
            LangSelected: Medium,
            tablename: filteredExercisesTablesData[0],
          },{timeout:500000}
        );
        
         // Remove questions with null values and shuffle the remaining questions
         const nonNullQuestions = response.data.filter((question) => question && question.Hindi );
         const shuffledQuestions = shuffle(nonNullQuestions);
         const data = shuffledQuestions.slice(0, 5); // Select the first 5 items


        // Update the sentences state with the response data
        setSentences(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  // useEffect(() => {
  //   // Set up an interval to decrement the remaining time every second
  //   const intervalId = setInterval(() => {
  //     setRemainingTime((prevTime) => {
  //       if (prevTime === 0) {
  //         // If time is up, navigate to the next screen or handle it as needed
  //         clearInterval(intervalId);
  //         // Additional logic or navigation here
  //         props.navigation.navigate('Testprabodh'); // Replace 'TimeUpScreen' with the screen you want to navigate to
  //         return prevTime;
  //       }
  //       return prevTime - 1;
  //     });
  //   }, 1000);

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [navigation]);
  



  useEffect(() => {
    // Shuffle the words when the sentence changes
    setShuffledHindiWords(getShuffledHindiWords());
  }, [sentenceIndex, sentences]);

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




 

  const getShuffledHindiWords = () => {
    const currentSentence = sentences[sentenceIndex]?.Hindi || '';
    // Split the sentence into an array of words and shuffle them
    return shuffleArray(currentSentence.split(' '));
  };


 




 



 
  //...........................
  const handleNext = () => {

    
    // Increment the sentence index
    setSentenceIndex((prevIndex) =>
      prevIndex < sentences.length - 1 ? prevIndex + 1 : prevIndex
    );
    // Clear the selected words
    setSelectedWords([]);
    // Shuffle the words for the next sentence
    setShuffledHindiWords(getShuffledHindiWords());
  };

  const handlePrev = () => {
    // Decrement the sentence index
    setSentenceIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    // Clear the selected words
    setSelectedWords([]);
    // Shuffle the words for the previous sentence
    setShuffledHindiWords(getShuffledHindiWords());
  };

  const handleWordPress = (word: string) => {
    // Update the selected words state
    setSelectedWords((prevSelectedWords) => [...prevSelectedWords, word]);
  };

  const handleUndo = () => {
    // Remove the last selected word
    setSelectedWords((prevSelectedWords) =>
      prevSelectedWords.slice(0, prevSelectedWords.length - 1)
    );
  };

  const checkArrangement = () => {
    // Get the correct order of words from the current sentence
    const correctOrder = sentences[sentenceIndex]?.Hindi.split(' ') || [];
    
    // Check if the selected words match the correct order
    const selectedWordsString = selectedWords.join(' ');
    const correctOrderString = correctOrder.join(' ');
    console.log('Selected Words:', selectedWordsString);
    console.log('Correct Order:', correctOrderString);
  
    const isCorrect = selectedWordsString === correctOrderString;
  
    // console.log('Is Correct:', isCorrect);
  
    if (isCorrect) {
      // Increment the correct count
      console.log('Incrementing Correct Count');
      setCorrectCount((prevCount) => prevCount + 1);
      // Clear the selected words for the next attempt
      setSelectedWords([]);
      // Shuffle the words for the next attempt
      setShuffledHindiWords(getShuffledHindiWords());
    }
  };

  

  const handleNextWithCheck = () => {

    if (sentenceIndex + 1 === 5) {
      setTimerRunning(false); // Stop the timer
    }
    // Check the arrangement before moving to the next sentence
    checkArrangement();

    // Check if there are more sentences available
    if (sentenceIndex < sentences.length - 1) {
      // Move to the next sentence
      handleNext();
    } else {
      // Navigate to the Testtruefalse component
      props.navigation.navigate('Testtruflaseinstruction', {
        // You can pass any parameters you need to the next component
        // For example, you might want to pass the correct count or other relevant data

        ApiResponse,
        Package,
        Medium,
        selectedLessonIndex,
        title,     
        exercisesTablesData,
        correctCountofjumble: correctCount,
        correctAnswersCountoffillintheblacks,
        // correctAnswersRatiooffillintheblanks
      });
    }
  };


  const uniqueLangWiseWordsSet = new Set<string>();

// Filter instructionData based on SectionName and extract unique LangWiseWords
const fillInTheBlanksInstructionsData = instructionData
  .filter((item: { SectionName: string; }) => item.SectionName === "JumbleSentences")
  .forEach((item: { LangWiseWords: string; }) => {
    uniqueLangWiseWordsSet.add(item.LangWiseWords);
  });

// Convert Set to an array
const fillInTheBlanksInstructions = Array.from(uniqueLangWiseWordsSet);

  const handleBackPress = () => {
    navigation.goBack();}; 
  
  
  const handleHomePress = () => {
    props.navigation.navigate('Home',{Package,Medium,ApiResponse});
  };


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
      correctCountofjumble: correctCount,
      correctAnswersCountoffillintheblacks,
    });
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
              
              <View style={{ flexDirection: 'row', marginBottom:5}}>
                <Text style={{fontSize:16,color:'black',marginLeft:5}}>{langWiseWords[145]}:</Text>
                {/* <Text style={{ backgroundColor: '#F3B431', marginLeft:5,fontSize: 16, fontWeight: 'bold' ,paddingBottom:1 ,color:'black'}}>{Math.floor(remainingTime / 60)}:{remainingTime % 60}</Text> */}
                <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
                 </View>
                <Text style={{fontSize:16,color:'#FF6900',marginLeft:5}}>{langWiseWords[287]}</Text>
              </View>
              {/* fill in the blankc  #ff9819 #FF8C00 #ff8f4a*/}
              <Text style={styles.title1}>{langWiseWords[226]}</Text>
              <Text  style={styles.title1}>{sentences[0]?.LangWiseWordsInst}</Text>
             
              <View style={styles.horizontalinefortext}></View>





       {/* <Text>Testjumbleprabodh</Text> */}
       {/* <Text>Remaining Time: {Math.floor(remainingTime / 60)}:{remainingTime % 60}</Text> */}
   
   
       {sentences.length > 0 && (
         <View>
           {/* <Text>Original Hindi: {sentences[sentenceIndex]?.Hindi}</Text> */}
                      {/* Display the shuffled Hindi words in a row */}
            <View style={styles.rowContainer}>
             {shuffledHindiWords.map((word, index) => (
               <TouchableOpacity key={index} onPress={() => handleWordPress(word)}>
                 <Text style={styles.word}>{word}</Text>
               </TouchableOpacity>
             ))}
           </View>
   
           {/* Display the selected words */}
           {/* {selectedWords.length > 0 && (
             <Text style={{ fontWeight: 'bold' }}>
               Selected Words: {selectedWords.join(' ')}
             </Text>
           )} */}
           {/* {selectedWords.length > 0 && (
            <Text style={{ fontWeight: 'bold', backgroundColor: 'white', width: '80%' }}>
              Selected Words: {selectedWords.join(' ')}
            </Text>
          )}
            */}
            <View style={styles.wordconatainer}>
            <Text style={styles.selectedWordsText}>
               {selectedWords.length > 0 ? selectedWords.join(' ') : ' '}
            </Text>
            </View>
   
           {/* Display the correct count */}
           {/* <Text style={{ fontWeight: 'bold' }}>Correct Count: {correctCount}</Text> */}
    
   
 
   


           <View style={styles.horizontalinefortext}></View>
   
           {/* Undo button */}
          
         </View>
       )}

          {/* <TouchableOpacity onPress={handleUndo}>
             <Text style={styles.undoButton}>Undo</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={handlePrev}>
             <Text>Previous</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={handleNextWithCheck}>
             <Text>Next</Text>
           </TouchableOpacity> */}

    <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.blueButton}>
            <Text style={styles.buttonText}>{langWiseWords[38]}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handlePrev} style={styles.blueButton}>
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleUndo}  style={styles.blueButton}>
          <Text style={styles.buttonText}>{langWiseWords[79]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextWithCheck} style={styles.blueButton}>
          <Text style={styles.buttonText}>{langWiseWords[19]}</Text>
        </TouchableOpacity>
    </View>


   
       {/* Display message when there are no sentences */}
       {sentences.length === 0 && <Text>No more data available</Text>}
       

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
  rowContainer: {
    flexDirection: 'row',
   
    marginTop: 10,
  },
  word: {
    fontSize: 18,
    marginBottom: 20,
    marginHorizontal: 5,
    color:'blue',
    fontWeight:'bold'
  },
  undoButton: {
    color: 'red',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  title1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Adjust the margin based on your preference
    marginLeft:5,
    color:'black',
    textAlign:'left'
   
  },
  horizontalinefortext:{
    height: 1,
    backgroundColor: '#99AAAB',
    
    marginBottom:10,
    elevation:3,  
    marginTop:30
  },
  horizontaline:{
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop:1,
    marginBottom:10,
    margin:-30
   
  },
  selectedWordsText: {
    
    backgroundColor: 'white',
    width: '98%',
    padding:3,
    fontSize:18,
    color:'black'
  },
  wordconatainer:{
    alignContent:'center',
    justifyContent:'center',
    marginLeft:5
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
  buttonText: {
    color: 'white',
    marginHorizontal:5
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
});

export default Testjumbleprabodh;
