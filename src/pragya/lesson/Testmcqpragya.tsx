import { ImageBackground, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const shuffleArray = (array: any[]) => {
  const nonNullArray = array.filter(item => item !== null);
  for (let i = nonNullArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nonNullArray[i], nonNullArray[j]] = [nonNullArray[j], nonNullArray[i]];
  }
  return nonNullArray;
};


const Testmcqpragya = (props: any) => {
  const {
    ApiResponse,
    Package,
    Medium,
    selectedLessonIndex, 
    title,
    modifiedArray,
    originalExercisesTables,
    fillInTheBlanksData,
    trueFalseCounter1,
    fillInBlanksCounter1,
    testChoiceCounter1,
  } = props.route.params;

  // Get the data at the 1th index of modifiedArray and originalExercisesTables
  const modifiedArrayData = modifiedArray[1];
  const originalExercisesTablesData = originalExercisesTables[1];

  const [testChoiceData, setTestChoiceData] = useState<any[]>([]);
  
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);
  const [fillInBlanksCounter, setFillInBlanksCounter] = useState(0);
  const [testChoiceCounter, setTestChoiceCounter] = useState(0);
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);
  const Sectiontitle = langWiseWords[13];
  const titleoflessonindex = langWiseWords[75];//lesson

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = '';
        let requestData = {
          "LangSelected": Medium,
          "lessonnumber": selectedLessonIndex,
          "tablename": ""
        };
  
        if (modifiedArray[1] === 'TestChoice') {
          endpoint = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getPraveenTestChoice/';
        } else if (modifiedArray[1] === 'TestChoiceClue') {
          endpoint = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getPraveenTestFill/';
        } else if (modifiedArray[1] === 'TrueFalse') {
          endpoint = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getTestTrueorFalse';
        }
  
        // Update tablename based on the 0th index value of originalExercisesTables
        requestData.tablename = originalExercisesTables[1];
  
        const response = await axios.post(endpoint, requestData,{ timeout: 500000 });
        // Process the response as needed
  
        // Shuffle the response array to randomize the order
        const shuffledData = shuffleArray(response.data);
  
        // Select the first 5 non-null items from the shuffled array
        const selectedData = shuffledData.filter(item => item !== null).slice(0, 5);
  
        setTestChoiceData(selectedData);
        setIsLastQuestion(currentIndex === testChoiceData.length - 1);
        console.log(modifiedArray)
        console.log(originalExercisesTables)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [modifiedArray]);


  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const navigation = useNavigation();
// for fill  in the blanks 
  const handleNext = () => {
    if (currentIndex + 1 === 5) {
      setTimerRunning(false); // Stop the timer
    }
    // Check if the selected choice is correct
    const correctAnswer = testChoiceData[currentIndex]?.HAnswer;
  
    // Ensure selectedChoice is not null
    if (selectedChoice !== null) {
      const isCorrect = selectedChoice === correctAnswer;
      
      console.log('LOG Is Correct:', isCorrect);
  
      // Update the counter only for TestFill questions
      if (modifiedArrayData === 'TestChoiceClue' && isCorrect) {
        setFillInBlanksCounter((prevCounter) => prevCounter + 1);
      }
    }
  
    // Move to the next question
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testChoiceData.length);
    setSelectedChoice(null); // Reset selected choice
  
    // Check if it's the last question
    if (currentIndex === testChoiceData.length - 1) {
      // Navigate to the next component after the last question
      props.navigation.navigate('Testtruefalseinstruntionpragya', {
        fillInBlanksCounter2:fillInBlanksCounter,
        testChoiceCounter2:testChoiceCounter,
        trueFalseCounter2: trueFalseCounter,
        ApiResponse,
        Package,
        Medium,
        selectedLessonIndex, 
        title,
        modifiedArray,
        originalExercisesTables,
        trueFalseCounter1,
        fillInBlanksCounter1,
        testChoiceCounter1,
       
      });
    }
  };

  const handleNextformcq = () => {
    if (currentIndex + 1 === 5) {
      setTimerRunning(false); // Stop the timer
    }
    // Check if the selected choice is correct
    const correctAnswer = testChoiceData[currentIndex]?.EnglishAnswer;
  
    // Ensure selectedChoice is not null
    if (selectedChoice !== null) {
      const isCorrect = selectedChoice === correctAnswer;
      
      console.log('LOG Is Correct:', isCorrect);
  
      // Update the counter only for TestChoice questions
      if (modifiedArrayData === 'TestChoice' && isCorrect) {
        setTestChoiceCounter((prevCounter) => prevCounter + 1);
      }
    }
  
    // Move to the next question
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testChoiceData.length);
    setSelectedChoice(null); // Reset selected choice
  
    // Check if it's the last question
    if (currentIndex === testChoiceData.length - 1) {
      // Navigate to the next component after the last question
      props.navigation.navigate('Testtruefalseinstruntionpragya', {       
        fillInBlanksCounter2:fillInBlanksCounter,
        testChoiceCounter2:testChoiceCounter,
        trueFalseCounter2: trueFalseCounter,
        ApiResponse,
        Package,
        Medium,
        selectedLessonIndex,
        title,
        modifiedArray,
        originalExercisesTables,
        trueFalseCounter1,
        fillInBlanksCounter1,
        testChoiceCounter1,
      });
    }
};

//for true false .....
const [trueFalseCounter, setTrueFalseCounter] = useState(0);

const handleNextfortrueflase = () => {
  if (currentIndex + 1 === 5) {
    setTimerRunning(false); // Stop the timer
  }
  // Check if the selected choice is correct
  const correctAnswer = String(testChoiceData[currentIndex]?.HAnswer);

  // Ensure selectedChoice is not null
  if (selectedChoice !== null) {
    console.log('LOG selectedChoice:', selectedChoice);
    console.log('LOG correctAnswer:', correctAnswer);
    console.log('LOG Is Correct (before comparison):', selectedChoice === correctAnswer);

    const isCorrect = selectedChoice === correctAnswer;
    console.log('LOG Is Correct (after comparison):', isCorrect);

    // Update the counter only for TrueFalse questions
    if (modifiedArrayData === 'TrueFalse' && isCorrect) {
      setTrueFalseCounter((prevCounter) => prevCounter + 1);
    } else {
      console.log('LOG Not updating counter for TrueFalse');
    }
  } else {
    console.log('LOG selectedChoice is null');
  }

  // Move to the next question
  setCurrentIndex((prevIndex) => (prevIndex + 1) % testChoiceData.length);
  setSelectedChoice(null); // Reset selected choice

  // Check if it's the last question
  if (currentIndex === testChoiceData.length - 1) {
    // Navigate to the next component after the last question
    props.navigation.navigate('Testtruefalseinstruntionpragya', {
      

      ApiResponse,
      Package,
      Medium,
      selectedLessonIndex, 
      title,
      modifiedArray,
      originalExercisesTables,
      trueFalseCounter1,
      fillInBlanksCounter1,
      testChoiceCounter1,
      fillInBlanksCounter2:fillInBlanksCounter,
      testChoiceCounter2:testChoiceCounter,
      trueFalseCounter2: trueFalseCounter,
    });
  }
};



  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testChoiceData.length) % testChoiceData.length);
  };

  

//radio button logic 

const [selectedChoice, setSelectedChoice] = useState<string | null>(null);


const handleRadioButtonPress = (choice: string) => {
  setSelectedChoice(choice);
};
const handleUndo = () => {
  setSelectedChoice(null);
};
 // State to manage the visibility of the help modal
 const [helpModalVisible, setHelpModalVisible] = useState(false);

 // Function to show/hide the help modal
 const toggleHelpModal = () => {
   setHelpModalVisible(!helpModalVisible);
 };

 //header navigation
   // header navigation
   const handleBackPress = () => {
     navigation.goBack();}; 
   
   
   const handleHomePress = () => {
     const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepragya';
     props.navigation.navigate(homeScreen,{Package,Medium,ApiResponse});
   };


   const getInitialTimerValue = () => {
    if (modifiedArray.length > 0) {
      const firstModifiedArrayData = modifiedArray[1];
      switch (firstModifiedArrayData) {
        case 'TrueFalse':
          return 540; // 9 minutes for TrueFalse
        case 'TestChoice':
          return 360; // 6 minutes for TestChoice
        case 'TestChoiceClue':
          return 300; // 5 minutes for TestFill
        default:
          return 300;
      }
    }
    return 0;
  };
 ;
  const [timer, setTimer] = useState<number>(getInitialTimerValue());
  const [timerRunning, setTimerRunning] = useState<boolean>(true);


     //timer 
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
  props.navigation.navigate('Scorecardpragya', {
   
    ApiResponse,
    Package,
    Medium,
    selectedLessonIndex, 
    title,
    modifiedArray,
    originalExercisesTables,
    trueFalseCounter1,
    fillInBlanksCounter1,
    testChoiceCounter1,
    fillInBlanksCounter2:fillInBlanksCounter,
    testChoiceCounter2:testChoiceCounter,
    trueFalseCounter2: trueFalseCounter,
  });
};



  return (
    <View style={{flex:1}}>


    <ImageBackground
        source={require('../../../assets/img/bg.png')} // Provide the path to your image
        style={styles.backgroundImage}>
<SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>   
            <View style={styles.header}>
            {/* Left side - Back icon */}
            <TouchableOpacity onPress={handleBackPress}>
              {/* <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" /> */}
            </TouchableOpacity>

            {/* <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text> */}
 
                <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>
           

            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
          </View>
          </SafeAreaView>



      {fillInTheBlanksData && (
        <View>
          {/* Display information from fillInTheBlanksData */}
          

          {/* Conditionally render content based on the value of modifiedArray at the 0th index */}
          {modifiedArrayData === 'TestChoice' && (
             <>

               <Text style={styles.title}>{langWiseWords[104]}</Text>
              <View style={styles.horizontaline}></View>
              
              <View style={{ flexDirection: 'row', }}>
                <Text style={{fontSize:16,color:'black',marginLeft:5}}>{langWiseWords[145]}:</Text>
                <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </View>
                <Text style={{fontSize:16,color:'#FF6900',marginLeft:5}}>{langWiseWords[287]}</Text>
              </View>
              {/* mcq instruction  #ff9819 #FF8C00 #ff8f4a*/}
              <Text style={styles.title1}>{langWiseWords[108]}</Text>
              <Text  style={styles.title1}>{testChoiceData[0]?.LHSentence}</Text>
             
              <View style={styles.horizontalinefortext}></View>
             {testChoiceData && testChoiceData.length > 0 && (
               <View>
                 {/* Display information from testChoiceData */}
                 <View style={styles.questionContainer}>
                   {/* Display information from the currently selected item */}
                   <View style={styles.questionItem}>
                     <Text style={styles.questionText}>{currentIndex + 1}.{testChoiceData[currentIndex]?.EnglishSentence}</Text>
           
                     {/* Separate EnglishChoices using pipe and display them in a column */}
                     {testChoiceData[currentIndex]?.EnglishChoices.split('|').map((choice: string, choiceIndex: number) => (
                          <TouchableOpacity
                            key={choiceIndex}
                            style={styles.choiceRow}
                            onPress={() => handleRadioButtonPress(choice)}
                          >
                            <MaterialIcons
                              name={selectedChoice === choice ? 'radio-button-checked' : 'radio-button-unchecked'}
                              size={20}
                              color="grey"
                            />
                            <Text style={styles.choiceText}>{choice}</Text>
                          </TouchableOpacity>
                        ))}
           
                     {/* <Text style={styles.answerText}>Answer: {testChoiceData[currentIndex]?.EnglishAnswer}</Text>
                     <Text style={styles.answerText}>Counter: {testChoiceCounter}</Text> */}
                   </View>
                   <View style={styles.horizontalinefortext}></View>
           
                   {/* Next and Previous buttons */}
                   <View style={styles.buttonContainer}>
                     {/* <TouchableOpacity onPress={handlePrev} style={styles.blueButton}>
                       <Text style={styles.buttonText}>Prev</Text>
                     </TouchableOpacity> */}
                     <TouchableOpacity onPress={toggleHelpModal} style={styles.blueButton}>
                      <Text style={styles.buttonText}>{langWiseWords[38]}</Text>
                    </TouchableOpacity>
                     <TouchableOpacity onPress={handleUndo} disabled={!selectedChoice} style={styles.blueButton}>
                    <Text style={styles.buttonText}>{langWiseWords[79]}</Text>
                  </TouchableOpacity>
                     <TouchableOpacity onPress={handleNextformcq} style={[styles.blueButton, { opacity: isLastQuestion ? 0.5 : 1 }]} disabled={isLastQuestion}>
                       <Text style={styles.buttonText}>{langWiseWords[19]}</Text>
                     </TouchableOpacity>
                   </View>
                 </View>
               </View>
             )}
           </>
          )}






{modifiedArrayData === 'TrueFalse' && testChoiceData && testChoiceData.length > 0 && (
  <>

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
              <Text style={styles.title1}>{langWiseWords[148]}</Text>
              <Text  style={styles.title1}>{testChoiceData[0]?.LangWiseWords}</Text>
             
              <View style={styles.horizontalinefortext}></View>
  
              <View style={styles.questionContainer}>
                {/* Display HSentence */}
                <View style={styles.questionItem}>
                  <Text style={styles.questionText}>{currentIndex + 1}.{testChoiceData[currentIndex]?.HSentence}</Text>
                                  {/* Display radio buttons for choices 0 and 1 */}
                <View>
                  {[0, 1].map((choice, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.choiceRow}
                      onPress={() => {
                        handleRadioButtonPress(choice.toString());
                        setSelectedChoice(choice.toString());
                      }}
                    >
                      <MaterialIcons
                        name={selectedChoice === choice.toString() ? 'radio-button-checked' : 'radio-button-unchecked'}
                        size={20}
                        color="grey"
                      />
                      {choice === 0 ? (
                        <MaterialIcons name="clear" size={28} color="black" /> 
                      ) : (
                        <MaterialIcons name="check" size={28} color="black" />  
                      )}
                    </TouchableOpacity>
                  ))}
                </View>

                </View>
                <View style={styles.horizontalinefortext}></View>
            

            
                {/* Display selected choice */}
                {/* {selectedChoice !== null && (
                  <Text >Selected Choice: {selectedChoice}</Text>
                )}
            
                <Text>TrueFalse Counter: {trueFalseCounter}</Text> */}
            
                {/* Next and Previous buttons */}
                <View style={styles.buttonContainer}>
                  {/* <TouchableOpacity onPress={handlePrev} style={styles.blueButton}>
                    <Text style={styles.buttonText}>Prev</Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity onPress={toggleHelpModal} style={styles.blueButton}>
                  <Text style={styles.buttonText}>{langWiseWords[38]}</Text>
                </TouchableOpacity>
                  <TouchableOpacity onPress={handleUndo} disabled={!selectedChoice} style={styles.blueButton}>
                              <Text style={styles.buttonText}>{langWiseWords[79]}</Text>
                            </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNextfortrueflase}
                    style={[styles.blueButton, { opacity: isLastQuestion ? 0.5 : 1 }]}
                    disabled={isLastQuestion}
                  >
                    <Text style={styles.buttonText}>{langWiseWords[19]}</Text>
                  </TouchableOpacity>
                </View>
                {/* <Text style={styles.answerText}>Answer: {testChoiceData[currentIndex]?.HAnswer}</Text> */}
              </View>
    </>
  )}





          {modifiedArrayData === 'TestChoiceClue' && (
            <>
              {/* <Text>This is Fill in the Blanks</Text> */}
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
              <Text  style={styles.title1}>{testChoiceData[0]?.LangWiseWords}</Text>
             
              <View style={styles.horizontalinefortext}></View>
            

              {testChoiceData && testChoiceData.length > 0 && (
                <View style={styles.questionContainer}>
                  {/* Display information from the currently selected item */}
                  <View style={styles.questionItem}>
                    <Text style={styles.questionText}>{currentIndex + 1}.{testChoiceData[currentIndex]?.HSentence}</Text>
   

                    {/* Separate HChoices using pipe and display them in a column with radio buttons */}
                    {testChoiceData[currentIndex]?.HChoices.split('|').map((choice: string, index: number) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.choiceRow}
                        onPress={() => handleRadioButtonPress(choice)}
                      >
                        <MaterialIcons
                          name={selectedChoice === choice ? 'radio-button-checked' : 'radio-button-unchecked'}
                          size={20}
                          color="grey"
                        />
                        <Text style={styles.choiceText}>{choice}</Text>
                      </TouchableOpacity>
                    ))}

                    {/* <Text style={styles.answerText}>{testChoiceData[currentIndex]?.HAnswer}</Text> */}
                  </View>
                  <View style={styles.horizontalinefortext}></View>

                  {/* Next, Prev, Undo, and Counter buttons */}
                  <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity onPress={handlePrev} style={styles.blueButton}>
                      <Text style={styles.buttonText}>Prev</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={toggleHelpModal} style={styles.blueButton}>
                      <Text style={styles.buttonText}>{langWiseWords[38]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleUndo} disabled={!selectedChoice} style={styles.blueButton}>
                      <Text style={styles.buttonText}>{langWiseWords[79]}</Text>
                    </TouchableOpacity>
                  
                    <TouchableOpacity onPress={handleNext} style={[styles.blueButton, { opacity: isLastQuestion ? 0.5 : 1 }]} disabled={isLastQuestion}>
                      <Text style={styles.buttonText}>{langWiseWords[19]}</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <Text style={styles.answerText}>Counter: {fillInBlanksCounter}</Text> */}
                </View>
              )}
            </>
          )}


          {/* Display data at the 0th index of modifiedArray and originalExercisesTables */}
          {/* <Text>Modified Array Data: {JSON.stringify(modifiedArrayData)}</Text>
          <Text>Original Exercises Tables Data: {JSON.stringify(originalExercisesTablesData)}</Text> */}

          {/* You can use other properties of fillInTheBlanksData as needed */}
        </View>
      )}


        <Modal
                animationType="slide"
                transparent={true}
                visible={helpModalVisible}
                onRequestClose={() => {
                  setHelpModalVisible(false);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>{fillInTheBlanksData.LangWiseWords}</Text>

                    <TouchableOpacity onPress={toggleHelpModal} style={styles.blueButton}>
                      <Text style={styles.buttonText}>{langWiseWords[45]}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
    </ImageBackground>
    </View>
  );
};

export default Testmcqpragya;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

  questionContainer: {
    marginTop: 20,
    
  },

  questionItem: {
    marginBottom: 20,
    height:150,
    marginLeft:'3%'
  },

  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'blue'
  },

  choiceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'blue',
    marginLeft:5
  },

  answerText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   
    padding:10
  },

  blueButton: {
    backgroundColor: '#0D6EFD',
    padding: 10,
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  choiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
 
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },

  radioButton: {
    alignItems: 'center',
  },

  radioText: {
    fontSize: 14,
    color: '#3498db',
  },

  // Add a new style for the icon container
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  // Add a new style for the icon text
  iconText: {
    fontSize: 14,
    color: '#3498db',
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
   title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    textAlign:"center",
    color:'black',
    marginTop:5
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20, // Adjust the padding here
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
    color:'black',
   
  },
  modalButton: {
    backgroundColor: '#0D6EFD',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    marginTop: 20,
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
  title1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Adjust the margin based on your preference
    marginLeft:5,
    color:'black',
    textAlign:'left'
   
  },
  timerContainer: {
    backgroundColor: '#F3B63A',
    padding: 1,
    borderRadius: 5,
    paddingLeft:4,
    paddingRight:4
   
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  timerText: {
    color: 'black',
    fontSize: 16,
    fontWeight:'bold'
  },
  


});
