import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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


const Testfillintheblankspraveen = (props: any) => {
  const {
    ApiResponse,
    Package,
    Medium,
    selectedLessonIndex,
    title,
    modifiedArray,
    originalExercisesTables,
    fillInTheBlanksData,
  } = props.route.params;

  // Get the data at the 0th index of modifiedArray and originalExercisesTables
  const modifiedArrayData = modifiedArray[0];
  const originalExercisesTablesData = originalExercisesTables[0];

  const [testChoiceData, setTestChoiceData] = useState<any[]>([]);
  
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);
  const [fillInBlanksCounter, setFillInBlanksCounter] = useState(0);
  const [testChoiceCounter, setTestChoiceCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = '';
        let requestData = {
          "LangSelected": "English",
          "lessonnumber": selectedLessonIndex,
          "tablename": ""
        };
  
        if (modifiedArray[0] === 'TestChoice') {
          endpoint = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getPraveenTestChoice/';
        } else if (modifiedArray[0] === 'TestFill') {
          endpoint = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getPraveenTestFill/';
        } else if (modifiedArray[0] === 'TrueFalse') {
          endpoint = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getTestTrueorFalse';
        }
  
        // Update tablename based on the 0th index value of originalExercisesTables
        requestData.tablename = originalExercisesTables[0];
  
        const response = await axios.post(endpoint, requestData);
        // Process the response as needed
  
        // Shuffle the response array to randomize the order
        const shuffledData = shuffleArray(response.data);
  
        // Select the first 5 non-null items from the shuffled array
        const selectedData = shuffledData.filter(item => item !== null).slice(0, 5);
  
        setTestChoiceData(selectedData);
        setIsLastQuestion(currentIndex === testChoiceData.length - 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [modifiedArray]);


  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const navigation = useNavigation();

  const handleNext = () => {
    // Check if the selected choice is correct
    const correctAnswer = testChoiceData[currentIndex]?.HAnswer;
  
    // Ensure selectedChoice is not null
    if (selectedChoice !== null) {
      const isCorrect = selectedChoice.trim().toLowerCase() === correctAnswer?.trim().toLowerCase();
      
      console.log('LOG Is Correct:', isCorrect);
  
      // Update the counter only for TestFill questions
      if (modifiedArrayData === 'TestFill' && isCorrect) {
        setFillInBlanksCounter((prevCounter) => prevCounter + 1);
      }
    }
  
    // Move to the next question
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testChoiceData.length);
    setSelectedChoice(null); // Reset selected choice
  
    // Check if it's the last question
    if (currentIndex === testChoiceData.length - 1) {
      // Navigate to the next component after the last question
      props.navigation.navigate('Testmcqinstructionpraveen', {
        fillInBlanksCounter,
        testChoiceCounter,
      });
    }
  };

  const handleNextformcq = () => {
    // Check if the selected choice is correct
    const correctAnswer = testChoiceData[currentIndex]?.LHAnswer;
  
    // Ensure selectedChoice is not null
    if (selectedChoice !== null) {
      const isCorrect = selectedChoice.trim().toLowerCase() === correctAnswer?.trim().toLowerCase();
      
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
      props.navigation.navigate('Testmcqinstructionpraveen', {       
        testChoiceCounter,
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


  return (
    <View>

      {fillInTheBlanksData && (
        <View>
          {/* Display information from fillInTheBlanksData */}
          

          {/* Conditionally render content based on the value of modifiedArray at the 0th index */}
          {modifiedArrayData === 'TestChoice' && (
             <>
             {testChoiceData && testChoiceData.length > 0 && (
               <View>
                 {/* Display information from testChoiceData */}
                 <View style={styles.questionContainer}>
                   {/* Display information from the currently selected item */}
                   <View style={styles.questionItem}>
                     <Text style={styles.questionText}>{testChoiceData[currentIndex]?.LHSentence}</Text>
           
                     {/* Separate LHChoices using pipe and display them in a column */}
                     {testChoiceData[currentIndex]?.LHChoices.split('|').map((choice: string, choiceIndex: number) => (
                          <TouchableOpacity
                            key={choiceIndex}
                            style={styles.choiceRow}
                            onPress={() => handleRadioButtonPress(choice)}
                          >
                            <MaterialIcons
                              name={selectedChoice === choice ? 'radio-button-checked' : 'radio-button-unchecked'}
                              size={20}
                              color="#3498db"
                            />
                            <Text style={styles.choiceText}>{choice}</Text>
                          </TouchableOpacity>
                        ))}
           
                     <Text style={styles.answerText}>Answer: {testChoiceData[currentIndex]?.LHAnswer}</Text>
                     <Text style={styles.answerText}>Counter: {testChoiceCounter}</Text>
                   </View>
           
                   {/* Next and Previous buttons */}
                   <View style={styles.buttonContainer}>
                     <TouchableOpacity onPress={handlePrev} style={styles.blueButton}>
                       <Text style={styles.buttonText}>Prev</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={handleUndo} disabled={!selectedChoice} style={styles.blueButton}>
                    <Text style={styles.buttonText}>Undo</Text>
                  </TouchableOpacity>
                     <TouchableOpacity onPress={handleNextformcq} style={[styles.blueButton, { opacity: isLastQuestion ? 0.5 : 1 }]} disabled={isLastQuestion}>
                       <Text style={styles.buttonText}>Next</Text>
                     </TouchableOpacity>
                   </View>
                 </View>
               </View>
             )}
           </>
          )}






            {modifiedArrayData === 'TrueFalse' && (
              <View style={styles.questionContainer}>
                {/* Display information from the currently selected item */}
                <View style={styles.questionItem}>
                  <Text style={styles.questionText}>{testChoiceData[currentIndex]?.HSentence}</Text>
                </View>

                {/* Next and Previous buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={handlePrev} style={styles.blueButton}>
                    <Text style={styles.buttonText}>Prev</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleNext} style={[styles.blueButton, { opacity: isLastQuestion ? 0.5 : 1 }]} disabled={isLastQuestion}>
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}





          {modifiedArrayData === 'TestFill' && (
            <>
              <Text>This is Fill in the Blanks</Text>
            

              {testChoiceData && testChoiceData.length > 0 && (
                <View style={styles.questionContainer}>
                  {/* Display information from the currently selected item */}
                  <View style={styles.questionItem}>
                    <Text style={styles.questionText}>{testChoiceData[currentIndex]?.HSentence}</Text>

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
                          color="#3498db"
                        />
                        <Text style={styles.choiceText}>{choice}</Text>
                      </TouchableOpacity>
                    ))}

                    <Text style={styles.answerText}>{testChoiceData[currentIndex]?.HAnswer}</Text>
                  </View>

                  {/* Next, Prev, Undo, and Counter buttons */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handlePrev} style={styles.blueButton}>
                      <Text style={styles.buttonText}>Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleUndo} disabled={!selectedChoice} style={styles.blueButton}>
                      <Text style={styles.buttonText}>Undo</Text>
                    </TouchableOpacity>
                  
                    <TouchableOpacity onPress={handleNext} style={[styles.blueButton, { opacity: isLastQuestion ? 0.5 : 1 }]} disabled={isLastQuestion}>
                      <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.answerText}>Counter: {fillInBlanksCounter}</Text>
                </View>
              )}
            </>
          )}


          {/* Display data at the 0th index of modifiedArray and originalExercisesTables */}
          <Text>Modified Array Data: {JSON.stringify(modifiedArrayData)}</Text>
          <Text>Original Exercises Tables Data: {JSON.stringify(originalExercisesTablesData)}</Text>

          {/* You can use other properties of fillInTheBlanksData as needed */}
        </View>
      )}
    </View>
  );
};

export default Testfillintheblankspraveen;

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
    paddingHorizontal: 20,
  },

  questionItem: {
    marginBottom: 20,
  },

  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  choiceText: {
    fontSize: 14,
    marginBottom: 5,
  },

  answerText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  blueButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  choiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },


});
